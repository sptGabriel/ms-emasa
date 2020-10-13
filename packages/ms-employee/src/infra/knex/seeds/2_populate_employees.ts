import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  await knex('employees').insert([
    {
      id: 'a9c678bb-c274-4908-add0-34a856d2458e',
      matricula: '123',
      first_name: 'test',
      last_name: 'test2',
      departament_id: '7e413f8d-2a07-4f2e-bbc9-eb8892948a03',
      deleted_at: null,
    },
    {
      id: '3dfa319d-fe4e-4deb-a534-1f05600af8ae',
      matricula: '1234',
      first_name: 'testt',
      last_name: 'test23',
      departament_id: '7e413f8d-2a07-4f2e-bbc9-eb8892948a03',
      deleted_at: null,
    },
  ]);
}
