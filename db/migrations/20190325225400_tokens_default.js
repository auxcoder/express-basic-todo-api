const jwt = require('jsonwebtoken');

exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('tokens', function(t) {
      t.text('id').primary();
      t.integer('ttl');
      t.integer('user_id');
      t.timestamp('created_at', 6)
        .notNullable()
        .defaultTo(knex.fn.now());
    })
    .then(() => {
      return knex.select('id', 'username', 'email').from('users');
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
  return users.map(user => {
    return {
      id: jwt.sign(
        {
          algorithm: 'HS256',
          expiresIn: 60 * 60 * 24 * 7 * 2,
          subject: user.id,
          payload: {
            username: user.username,
            email: user.email,
          },
        },
        'secret'
      ),
      ttl: 60 * 60 * 24 * 7 * 2,
      user_id: user.id,
    };
  });
}
