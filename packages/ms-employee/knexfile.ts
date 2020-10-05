import knex from 'knex';
import path from 'path';
require('dotenv').config();
require('ts-node/register');
interface KnexConfig {
  [key: string]: object;
}
const extension =
  process.env.NODE_CONFIG_ENV === 'production' ||
  process.env.NODE_CONFIG_ENV === 'staging'
    ? 'js'
    : 'ts';
const database = {
  development: {
    client: 'postgresql',
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
      loadExtensions: [extension],
      extension: extension,
      directory: path.resolve(__dirname, 'src', 'infra', 'knex', 'migrations'),
    },
    seeds: {
      loadExtensions: ['.ts'],
    },
    timezone: 'UTC',
    useNullAsDefault: true,
  },
  onUpdateTrigger: table => `
  CREATE TRIGGER ${table}_updated_at
  BEFORE UPDATE ON ${table}
  FOR EACH ROW
  EXECUTE PROCEDURE on_update_timestamp();
  `,
} as knex.Config;
module.exports = database;
