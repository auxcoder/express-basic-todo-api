var BookshelfParanoia = require('bookshelf-paranoia');
const dbConfig = require('../../knexfile');
//fixme: make db config dynamic process.env.NODE_ENV
const knex = require('knex')(dbConfig['development']);
const Bookshelf = require('Bookshelf')(knex);
Bookshelf.plugin('registry');
Bookshelf.plugin('visibility');
Bookshelf.plugin(BookshelfParanoia, {
  sentinel: 'active',
  nullValue: '0000-00-00 00:00:00',
});

module.exports = Bookshelf;
