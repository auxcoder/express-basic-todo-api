var chance = require('chance').Chance();

const todos = genTodos();

exports.up = function(knex, Promise) {
  return knex
    .table('todos')
    .returning(['title'])
    .insert(todos);
};

exports.down = function(knex, Promise) {
  return knex.table('todos').del();
};

function genTodos() {
  Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
  var date = new Date();
  return [1, 2, 3, 4, 5].map(() => {
    return {
      title: chance.sentence({ words: 5 }),
      completed: chance.bool({ likelihood: 30 }),
      created_at: date.toISOString(),
      updated_at: date.addDays(5).toISOString()
    };
  });
}
