const Bookshelf = require('./bookshelf');
require('./users');
const Tokens = Bookshelf.Model.extend({
  tableName: 'tokens',
  user: function() {
    return this.belongsTo('Users');
  },
});
// module
module.exports = Bookshelf.model('Tokens', Tokens);
