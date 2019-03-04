const dbConfig = require('./knexfile.js');
const knex = require('knex')(dbConfig['development']);
const bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;
