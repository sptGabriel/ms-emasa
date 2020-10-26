import * as Knex from 'knex';
const { onUpdateTrigger } = require('../../../config/knexfile');
export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable('products').then(function (exists) {
    if (exists) return;
    return knex.schema // **** udpate
      .createTable('products', async table => {
        table.uuid('id').notNullable().primary();
        table.string('name', 100).notNullable();
        table.string('codReference', 100).notNullable();
        table
          .uuid('category_id')
          .notNullable()
          .references('product_categories.id')
          .onUpdate('CASCADE') // if Article primary key is changed, update this foreign key.
          .onDelete('NO ACTION');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.timestamp('deleted_at');
      })
      .then(() => knex.raw(onUpdateTrigger('products')));
  });
}

export async function down(knex: Knex): Promise<void> {}
