import Knex from 'knex';

export const up = async (knex: Knex) => {
  return knex.schema.createTable('locations', table => {
    table.uuid('id').notNullable().primary();
    table.string('street_address', 100).notNullable();
    table.integer('postal_code', 10).notNullable();
  });
};
export const down = async (knex: Knex) => {
  return knex.schema.dropTable('locations');
};
