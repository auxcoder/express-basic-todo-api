var bookshelf = require('../bookshelf');
var Todos = bookshelf.Model.extend({
  tableName: 'todos'
});
module.exports = Todos;
