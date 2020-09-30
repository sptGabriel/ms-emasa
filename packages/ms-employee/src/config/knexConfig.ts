import knex from 'knex';
import path from 'path';

const rootDir =
  process.env.NODE_ENV === 'development' ? 'development' : 'development';

interface KnexConfig {
  [key: string]: object;
}

const config: KnexConfig = {
  developement: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.resolve(__dirname, 'src', 'infra', 'Knex', 'migrations'),
    },
    timezone: 'UTC',
  },
};

const KnexInstance = knex(config[rootDir] as knex.Config);

export const KnexConfig = () => KnexInstance;
