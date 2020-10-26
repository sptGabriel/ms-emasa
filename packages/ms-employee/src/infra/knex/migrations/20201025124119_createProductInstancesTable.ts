import * as Knex from 'knex';
const { onUpdateTrigger } = require('../../../config/knexfile');
export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable('product_instances').then(function (exists) {
    if (exists) return;
    return knex.schema // **** udpate
      .createTable('product_instances', async table => {
        table.uuid('id').notNullable().primary();
        table.string('serial_number', 100).notNullable().unique();
        table.string('patrimony_code', 30).unique();
        table
          .uuid('product_id')
          .notNullable()
          .references('products.id')
          .onUpdate('CASCADE') // if Article primary key is changed, update this foreign key.
          .onDelete('CASCADE');
        table
          .uuid('contract_id')
          .notNullable()
          .references('contracts.id')
          .onUpdate('CASCADE') // if Article primary key is changed, update this foreign key.
          .onDelete('NO ACTION');
        table
          .uuid('employee_id')
          .notNullable()
          .references('employees.id')
          .onUpdate('CASCADE') // if Article primary key is changed, update this foreign key.
          .onDelete('NO ACTION');
        table.enu('type', ['component', 'equipament']).notNullable();
        table
          .uuid('parent')
          .references('product_instances.id')
          .onUpdate('CASCADE') // if Article primary key is changed, update this foreign key.
          .onDelete('NO ACTION');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.timestamp('deleted_at');
      })
      .then(() => knex.raw(onUpdateTrigger('product_instances')));
  });
}

export async function down(knex: Knex): Promise<void> {}
