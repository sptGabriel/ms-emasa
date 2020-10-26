import * as Knex from 'knex';
const { onUpdateTrigger } = require('../../../config/knexfile');
export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable('product_categories').then(function (exists) {
    if (exists) return;
    return knex.schema // **** udpate
      .createTable('product_categories', async table => {
        table.uuid('id').notNullable().primary();
        table.uuid('parent').references('product_categories.id');
        table.string('name', 100);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.timestamp('deleted_at');
      })
      .then(() => knex.raw(onUpdateTrigger('product_categories')));
  });
}

export async function down(knex: Knex): Promise<void> {}
