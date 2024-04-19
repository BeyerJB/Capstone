exports.up = function(knex) {
  return knex.schema.createTable('notice_type', table => {
    table.increments('notice_type_id').primary();
    table.string('name');
    table.string('description');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('notice_type');
};