import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  const hasDepartament = await knex.schema.hasTable('departaments');
  if (!hasDepartament) return;
  return knex.schema.alterTable('departaments', table => {
    table
      .uuid('manager_id')
      .references('employees.id')
      .onUpdate('CASCADE') // if Article primary key is changed, update this foreign key.
      .onDelete('NO ACTION')
      .alter(); // if referenced Article is deleted, delete this Comment.
  });
}

export async function down(knex: Knex): Promise<void> {}
