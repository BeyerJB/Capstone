exports.up = function(knex) {
  return knex.schema.createTable('calendar_users', table => {
    table.increments('user_id').primary();
    table.string('first_name');
    table.string('last_name');
    table.string('rank');
    table.string('username');
    table.string('password');
    table.integer('user_type').unsigned();
    table.foreign('user_type').references('user_types.user_type_id');
    table.integer('team_id').unsigned();
    table.foreign('team_id').references('calendar_teams.team_id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('calendar_users');
};