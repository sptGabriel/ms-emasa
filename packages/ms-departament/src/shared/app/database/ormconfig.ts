import { ConnectionOptions } from 'typeorm';
const rootDir = process.env.NODE_ENV === 'development' ? 'src' : 'dist';
// rootDir + '/modules/**/infra/entities/*.{js,ts}'
const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'emasa',
  password: 'emasa03210',
  database: 'emasa_ti',
  entities: [rootDir + '/departaments/models/*.{js,ts}'],
  migrations: [rootDir + '/shared/app/typeorm/migrations/**/*.{js,ts}'],
  subscribers: [rootDir + '/subscribers/**/*.{js,ts}'],
  cli: {
    entitiesDir: `${rootDir}/entities`,
    migrationsDir: `${rootDir}/shared/app/typeorm/migrations`,
    subscribersDir: `${rootDir}/subscriber`,
  },
  synchronize: false,
  logging: true,
};

export default config;
