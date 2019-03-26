exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(t) {
    t.increments('id').primary();
    t.string('username');
    t.string('password').notNullable();
    t.string('email').notNullable();
    t.boolean('email_verified').defaultTo(false);
    t.text('salt');
    t.text('verification_token');
    t.timestamp('created_at', 6)
      .notNullable()
      .defaultTo(knex.fn.now());
    t.timestamp('updated_at', 6)
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
