import * as Knex from 'knex';
const { onUpdateTrigger } = require('../../../config/knexfile');
export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable('supplying').then(function (exists) {
    if (exists) return;
    return knex.schema // **** udpate
      .createTable('supplying', async table => {
        table.uuid('id').notNullable().primary();
        table.uuid('supplier_id').notNullable().references('suppliers.id');
        table.boolean('arrived').defaultTo(false);
        table.timestamp('orderedAt').notNullable();
        table.timestamp('arrivesAt').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.timestamp('deleted_at');
      })
      .then(() => knex.raw(onUpdateTrigger('supplying')));
  });
}

export async function down(knex: Knex): Promise<void> {}
