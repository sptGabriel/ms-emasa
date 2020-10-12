import * as Knex from 'knex';
const { onUpdateTrigger } = require('../../../config/knexfile');
export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable('employees').then(function (exists) {
    if (exists) return;
    return knex.schema // **** udpate
      .createTable('employees', table => {
        table.uuid('id').notNullable().primary();
        table.string('matricula', 100).notNullable().unique('matricula_idx');
        table.string('first_name', 100).notNullable();
        table.string('last_name', 100).notNullable();
        table.uuid('departament_id');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.timestamp('deleted_at');
      })
      .then(() => knex.raw(onUpdateTrigger('employees')));
  });
}

export async function down(knex: Knex): Promise<void> {}
