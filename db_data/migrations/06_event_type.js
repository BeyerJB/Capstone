exports.up = function(knex) {
  return knex.schema.createTable('event_type', table => {
    table.increments('event_id').primary();
    table.string('name');
    table.string('description');
    table.string('color_code');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('event_type');
};