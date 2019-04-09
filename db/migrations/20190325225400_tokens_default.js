const jwtSign = require('../../utils/jwtSign');

exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('tokens', function(t) {
      t.text('id').primary();
      t.integer('user_id')
        .unsigned()
        .notNullable();
      t.timestamp('created_at', 6)
        .notNullable()
        .defaultTo(knex.fn.now());
      t.foreign('user_id')
        .references('id')
        .inTable('users');
    })
    .then(() => {
      return knex.select('id', 'username', 'email', 'role', 'email_verified').from('users');
    })
    .then(users => {
      return knex
        .table('tokens')
        .returning(['user_id'])
        .insert(genToken(users));
    })
    .catch(error => {
      console.error('migration "tokens" failed: ', error);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tokens');
};

function genToken(users) {
  const _ttl = 60 * 60 * 24 * 7 * 2;
  return users.map(user => {
    return {
      id: jwtSign(user, 'auth', _ttl),
      user_id: user.id,
    };
  });
}
