import { ConnectionOptions } from 'typeorm';
const rootDir = process.env.NODE_ENV === 'development' ? 'src' : 'dist';
// rootDir + '/modules/**/infra/entities/*.{js,ts}'
const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [rootDir + '/modules/**/infra/entities/*.{js,ts}'],
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
