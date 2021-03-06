const bcrypt = require('bcryptjs');
const jwtSign = require('../../utils/jwtSign');
const constants = require('../../config/constants');
// modules
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('users', function(t) {
      t.increments('id').primary();
      t.string('username');
      t.string('password').notNullable();
      t.string('email').notNullable();
      t.boolean('verified').defaultTo(false);
      t.text('salt');
      t.integer('itr');
      t.text('veroken'); // use a jwt to verify account
      t.boolean('active').defaultTo(false);
      t.integer('role');
      t.timestamp('created_at', 6)
        .notNullable()
        .defaultTo(knex.fn.now());
      t.timestamp('updated_at', 6)
        .notNullable()
        .defaultTo(knex.fn.now());
      t.timestamp('deleted_at', 6)
        .nullable()
        .defaultTo('0000-00-00 00:00:00');
    })
    .then(() => {
      return knex
        .table('users')
        .returning(['email'])
        .insert(genUsers());
    })
    .catch(error => {
      console.error('migration "users" failed: ', error);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};

function genUsers() {
  return [
    {
      email: 'kiubmen@gmail.com',
      username: 'kiubmen',
      password: 'password',
      verified: true,
    },
    {
      email: 'testera@auxcoder.com',
      username: 'testera',
      password: 'password',
      verified: false,
    },
  ].map(item => {
    const itr = 2;
    const salt = bcrypt.genSaltSync(itr); // low rounds for tests
    return Object.assign(item, {
      role: 1,
      salt: salt,
      itr: itr,
      password: bcrypt.hashSync(item.password, salt),
      veroken: jwtSign(item, 'verification', constants.ttlVerify),
      active: true,
    });
  });
}
