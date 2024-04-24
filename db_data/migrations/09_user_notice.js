exports.up = function(knex) {
  return knex.schema.createTable('user_notice', table => {
    table.increments('user_notice_id').primary();
    table.integer('notice_status').unsigned().defaultTo(1);
    table.foreign('notice_status').references('notice_status.status_id');
    table.integer('submitter_id').unsigned();
    table.foreign('submitter_id').references('calendar_users.user_id');
    table.integer('recipient_id').unsigned();
    table.foreign('recipient_id').references('calendar_users.user_id');
    table.integer('notice_type').unsigned();
    table.foreign('notice_type').references('notice_type.notice_type_id');
    table.string('body');
    table.boolean('archived').defaultTo(0);
    table.integer('event_id').unsigned();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user_notice');
};