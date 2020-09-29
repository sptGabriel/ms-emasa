import Knex from 'knex';

export const up = async (knex: Knex) => {
  return knex.schema.createTable('departaments', table => {
    table.uuid('id').notNullable().primary();
    table.string('departament_name', 100).notNullable();
    table.uuid('manager_id');
  });
};
export const down = async (knex: Knex) => {
  return knex.schema.dropTable('departaments');
};
