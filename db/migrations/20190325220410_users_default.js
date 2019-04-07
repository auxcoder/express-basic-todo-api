const bcrypt = require('bcryptjs');
const jwtSign = require('../../utils/jwtSign');
const hashPassword = require('../../utils/hashPass');

exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('users', function(t) {
      t.increments('id').primary();
      t.string('username');
      t.string('password').notNullable();
      t.string('email').notNullable();
      t.boolean('email_verified').defaultTo(false);
      t.text('salt');
      t.integer('itr');
      t.text('verification_token'); // use a jwt to verify account
      t.boolean('active');
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
      email_verified: true,
    },
    {
      email: 'testera@auxcoder.com',
      username: 'testera',
      password: 'password',
      email_verified: false,
    },
  ].map(item => {
    const itr = 2;
    const salt = bcrypt.genSaltSync(itr); // low rounds for tests
    return Object.assign(item, {
      role: 1,
      salt: salt,
      itr: itr,
      password: bcrypt.hashSync(item.password, salt),
      verification_token: jwtSign(item, 'verification', 60 * 60 * 24 * 7 * 2),
      active: true,
    });
  });
}
