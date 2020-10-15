import Knex from 'knex';
const { onUpdateTrigger } = require('../../../config/knexfile');
export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable('employee').then(function (exists) {
    if (exists) return;
    return knex.schema // **** udpate
      .createTable('departaments', table => {
        table.uuid('id').notNullable().primary();
        table.string('departament_name', 100).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.timestamp('deleted_at');
      })
      .then(() => knex.raw(onUpdateTrigger('departaments')));
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('departaments');
}
