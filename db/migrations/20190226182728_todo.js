exports.up = function(knex, Promise) {
  return knex.schema.createTable('todos', function(t) {
    t.increments('id').primary();
    t.string('title');
    t.boolean('completed').defaultTo(false);
    t.timestamp('created_at', 6)
      .notNullable()
      .defaultTo(knex.fn.now());
    t.timestamp('updated_at', 6)
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('todos');
};
