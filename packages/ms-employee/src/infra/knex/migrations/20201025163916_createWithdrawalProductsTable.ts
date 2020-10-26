import * as Knex from 'knex';
const { onUpdateTrigger } = require('../../../config/knexfile');
export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable('withdrawal_products').then(function (exists) {
    if (exists) return;
    return knex.schema // **** udpate
      .createTable('withdrawal_products', async table => {
        table
          .string('serial_number')
          .references('product_instances.serial_number')
          .notNullable();
        table.uuid('withdrawal_id').references('withdrawal.id').notNullable();
        table.primary(['serial_number', 'withdrawal_id']);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.timestamp('deleted_at');
      })
      .then(() => knex.raw(onUpdateTrigger('withdrawal_products')));
  });
}

export async function down(knex: Knex): Promise<void> {}
