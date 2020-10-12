import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  const hasEmployee = await knex.schema.hasTable('employees');
  if (!hasEmployee) return;
  return knex.schema.alterTable('employees', table => {
    table
      .uuid('departament_id')
      .notNullable()
      .references('departaments.id')
      .onUpdate('CASCADE') // if Article primary key is changed, update this foreign key.
      .onDelete('NO ACTION')
      .alter();
  });
}

export async function down(knex: Knex): Promise<void> {}
