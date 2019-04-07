let Bookshelf = require('./bookshelf');
require('./tokens');
var Users = Bookshelf.Model.extend(
  {
    tableName: 'users',
    hidden: ['salt', 'verification_token'],
    softDelete: true,
    tokens: function() {
      return this.hasMany('Tokens');
    },
  },
  {
    /**
     * Find a model based on it's ID
     * @param {String} email The model's email
     * @param {Object} [options] Options used of model.fetch
     * @return {Promise(bookshelf.Model)}
     */
    findByEmail: function(email, options) {
      options = Object.assign({ require: true }, options);
      return this.forge({ email: email }).fetch(options);
    },
  }
);
// module
module.exports = Bookshelf.model('Users', Users);
