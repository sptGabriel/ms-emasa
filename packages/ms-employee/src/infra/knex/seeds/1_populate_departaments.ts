import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  await knex('departaments').insert([
    {
      id: '7e413f8d-2a07-4f2e-bbc9-eb8892948a03',
      departament_name: 'test',
      manager_id: null,
      deleted_at: null,
    },
    {
      id: '0239228b-f9c7-443d-8df0-971604c58a13',
      departament_name: 'test2',
      manager_id: null,
      deleted_at: null,
    },
  ]);
}
