exports.up = function(knex) {
  return knex.schema.createTable('ranks', table => {
    table.increments('rank_id').primary();
    table.string('name');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('ranks');
};