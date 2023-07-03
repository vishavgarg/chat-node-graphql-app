exports.up = function (knex) {
  return knex.schema.createTable('messages', function (table) {
    table.increments('id');
    table.integer('sender_id').unsigned().references('id').inTable('users').notNullable();
    table.integer('receiver_id').unsigned().references('id').inTable('users').notNullable();
    table.text('text').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('messages');
};
