var bookshelf = require('../../bookshelf');
var BookshelfParanoia = require('bookshelf-paranoia');
bookshelf.plugin('visibility');
bookshelf.plugin(BookshelfParanoia, { sentinel: 'active', nullValue: '0000-00-00 00:00:00' });

var Users = bookshelf.Model.extend({
  tableName: 'users',
  hidden: ['salt', 'verification_token'],
  softDelete: true,
});

module.exports = Users;
