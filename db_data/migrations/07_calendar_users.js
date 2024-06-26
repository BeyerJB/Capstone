exports.up = function(knex) {
  return knex.schema.createTable('calendar_users', table => {
    table.increments('user_id').primary();
    table.string('first_name');
    table.string('last_name');
    table.integer('rank');
    table.string('username');
    table.string('password');
    table.integer('user_type').unsigned();
    table.foreign('user_type').references('user_type.user_type_id');
    table.integer('team_id').unsigned();
    table.foreign('team_id').references('calendar_teams.team_id');
    table.boolean('enabled').defaultTo(true);
    table.boolean('pending').defaultTo(true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('calendar_users');
};