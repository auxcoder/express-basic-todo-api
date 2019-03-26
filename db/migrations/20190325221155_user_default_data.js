const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.up = function(knex, Promise) {
  return knex
    .table('users')
    .returning(['email'])
    .insert(genUsers());
};

exports.down = function(knex, Promise) {
  return knex.table('users').del();
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
  ].map((item, idx) => {
    item.salt = bcrypt.genSaltSync(2); // low rounds for tests
    item.password = bcrypt.hashSync(item.password, item.salt);
    item.verification_token = jwt.sign(
      {
        algorithm: 'HS256',
        expiresIn: 60 * 60 * 24 * 7 * 2,
        subject: item.id,
        payload: {
          role: item.role,
          name: item.username,
          email: item.email,
        },
      },
      'secret'
    );
    item.id = idx + 1;
    return item;
  });
}
