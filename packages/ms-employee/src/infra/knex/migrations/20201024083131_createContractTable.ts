import * as Knex from 'knex';
const { onUpdateTrigger } = require('../../../config/knexfile');
export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable('contracts').then(function (exists) {
    if (exists) return;
    return knex.schema // **** udpate
      .createTable('contracts', async table => {
        table.uuid('id').notNullable().primary();
        table.string('name', 100);
        table.string('signature', 100);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.timestamp('deleted_at');
      })
      .then(() => knex.raw(onUpdateTrigger('contracts')));
  });
}

export async function down(knex: Knex): Promise<void> {}
