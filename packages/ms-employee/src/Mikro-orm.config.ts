import { Options } from '@mikro-orm/core';

const options: Options = {
  migrations: {
    path: './src/migrations',
    tableName: 'migrations',
    transactional: true,
  },
  port: 5433,
  tsNode: true,
  entities: ['dist/**/*.entity.ts'],
  entitiesTs: ['src/**/*.entity.ts'],
  dbName: 'emasa_ti',
  user: 'emasa',
  password: 'emasa03210',
  debug: true,
  type: 'postgresql',
};

export default options;
