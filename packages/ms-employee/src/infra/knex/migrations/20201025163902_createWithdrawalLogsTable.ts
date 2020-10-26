import * as Knex from 'knex';
const { onUpdateTrigger } = require('../../../config/knexfile');
export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable('withdrawal').then(function (exists) {
    if (exists) return;
    return knex.schema // **** udpate
      .createTable('withdrawal', async table => {
        table.uuid('id').notNullable().primary();
        table.uuid('by_employee').notNullable().references('employees.id');
        table.uuid('to_employee').notNullable().references('employees.id');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.timestamp('deleted_at');
      })
      .then(() => knex.raw(onUpdateTrigger('withdrawal')));
  });
}

export async function down(knex: Knex): Promise<void> {}
