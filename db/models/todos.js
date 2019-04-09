const Bookshelf = require('../bookshelf');
require('./users');
const Todos = Bookshelf.Model.extend({
  tableName: 'todos',
  user: function() {
    return this.belongsTo('Users');
  },
});
// module
module.exports = Bookshelf.model('Todos', Todos);
