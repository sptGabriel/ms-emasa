import * as Knex from 'knex';
const { onUpdateTrigger } = require('../../../config/knexfile');
export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable('suppliers').then(function (exists) {
    if (exists) return;
    return knex.schema // **** udpate
      .createTable('suppliers', async table => {
        table.uuid('id').notNullable().primary();
        table.string('cnpj', 100).unique().notNullable();
        table.string('supplier_name', 100);
        table.string('supplier_email', 100);
        table.string('supplier_phone', 100);
        table.string('description', 100);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.timestamp('deleted_at');
      })
      .then(() => knex.raw(onUpdateTrigger('suppliers')));
  });
}

export async function down(knex: Knex): Promise<void> {}
