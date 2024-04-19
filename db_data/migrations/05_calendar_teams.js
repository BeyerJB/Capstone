exports.up = function(knex) {
  return knex.schema.createTable('calendar_teams', table => {
    table.increments('team_id').primary();
    table.string('name');
    table.string('description');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('calendar_teams');
};