
exports.up = (knex) => {
  return knex.schema
    .createTable('transfers', (table) => {
      table.increments('id').primary();
      table.string('description').notNull();
      table.date('date').notNull();
      table.decimal('ammount', 15, 2).notNull();
      table.integer('acc_ori_id')
        .references('id')
        .inTable('accounts')
        .notNull();
      table.integer('acc_dest_id')
        .references('id')
        .inTable('accounts')
        .notNull();
      table.integer('user_id')
        .references('id')
        .inTable('users')
        .notNull();
    })
    .table('transactions', (table) => {
      table.integer('transfer_id')
        .references('id')
        .inTable('transfers');
    })
};

exports.down = (knex) => {
  return Promise.all([
    knex.schema.table('transactions', (table) => {
      table.dropColumn('transfer_id');
    }),
    knex.schema.dropTable('transfers'),
  ]);
};