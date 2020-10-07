import knex from 'knex';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
interface KnexConfig {
  [key: string]: object;
}
const extension =
  process.env.NODE_ENV === 'production' ||
  process.env.NODE_CONFIG_ENV === 'staging'
    ? 'js'
    : 'ts';
const database: KnexConfig = {
  development: {
    client: 'postgresql',
    connection: {
      port: process.env.DB_PORT,
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
      directory: path.resolve(__dirname, '../infra/knex/migrations'),
      loadExtensions: [extension],
      extension: extension,
    },
    seeds: {
      loadExtensions: ['.ts'],
    },
    timezone: 'UTC',
    useNullAsDefault: true,
    onUpdateTrigger: (table: string) => `
    CREATE TRIGGER ${table}_updated_at
    BEFORE UPDATE ON ${table}
    FOR EACH ROW
    EXECUTE PROCEDURE on_update_timestamp();
    `,
  },
};

const knexConfig = database['development'] as knex.Config;
module.exports = knexConfig;
