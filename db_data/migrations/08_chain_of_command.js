exports.up = function(knex) {
  return knex.schema.createTable('chain_of_command', table => {
    table.increments('coc_id').primary();
    table.integer('supervisor_id').unsigned();
    table.foreign('supervisor_id').references('calendar_users.user_id');
    table.integer('subordinate_id').unsigned();
    table.foreign('subordinate_id').references('calendar_users.user_id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('chain_of_command');
};