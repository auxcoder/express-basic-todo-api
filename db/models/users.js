var bookshelf = require('../../bookshelf');
bookshelf.plugin('visibility');

var Users = bookshelf.Model.extend({
  tableName: 'users',
  hidden: ['password', 'salt', 'email_verified', 'verification_token'],
});

module.exports = Users;
