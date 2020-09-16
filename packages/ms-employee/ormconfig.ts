import { ConnectionOptions } from 'typeorm';
const rootDir = process.env.NODE_ENV === 'development' ? 'src' : 'build/src';
// rootDir + '/modules/**/infra/entities/*.{js,ts}'
const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [rootDir + '/modules/**/infra/entities/*.{js,ts}'],
  migrations: [rootDir + '/migrations/**/*.{js,ts}'],
  subscribers: [rootDir + '/subscribers/**/*.{js,ts}'],
  cli: {
    entitiesDir: `${rootDir}/entities`,
    migrationsDir: `${rootDir}/migrations`,
    subscribersDir: `${rootDir}/subscriber`,
  },
  synchronize: false,
  logging: true,
};

export = config;
