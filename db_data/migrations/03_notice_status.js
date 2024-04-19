exports.up = function(knex) {
  return knex.schema.createTable('notice_status', table => {
    table.increments('status_id').primary();
    table.string('name');
    table.string('description');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('notice_status');
};