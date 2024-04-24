exports.up = function(knex) {
  return knex.schema.createTable('calendar_events', table => {
    table.increments('event_id').primary();
    table.string('title');
    table.string('description');
    table.datetime('start_datetime', { useTz: false });
    table.datetime('end_datetime', { useTz: false });
    table.boolean('all_day').defaultTo(false);
    table.integer('team_id').unsigned();
    table.foreign('team_id').references('calendar_teams.team_id');
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('calendar_users.user_id');
    table.integer('event_type').unsigned();
    table.foreign('event_type').references('event_type.event_id');
    table.integer('creator_id').unsigned();
    table.foreign('creator_id').references('calendar_users.user_id');
    table.boolean('pending').defaultTo(true);
    table.boolean('approved').defaultTo(false);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('calendar_events');
};