import * as Knex from 'knex';
const { onUpdateTrigger } = require('../../../config/knexfile');
export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable('supplying_products').then(function (exists) {
    if (exists) return;
    return knex.schema // **** udpate
      .createTable('supplying_products', async table => {
        table.uuid('supply_id').references('supplying.id').notNullable();
        table.uuid('product_id').references('products.id').notNullable();
        table.unique(['supply_id', 'product_id']);
        table.integer('quantity').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.timestamp('deleted_at');
      })
      .then(() => knex.raw(onUpdateTrigger('supplying_products')));
  });
}

export async function down(knex: Knex): Promise<void> {}
