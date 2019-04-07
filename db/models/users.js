let Bookshelf = require('./bookshelf');
require('./tokens');
var Users = Bookshelf.Model.extend({
  tableName: 'users',
  hidden: ['salt', 'verification_token'],
  softDelete: true,
  tokens: function() {
    return this.hasMany('Tokens');
  },
});
// module
module.exports = Bookshelf.model('Users', Users);
