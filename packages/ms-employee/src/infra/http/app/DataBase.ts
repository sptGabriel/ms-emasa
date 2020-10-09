import { knexInstance } from '@infra/knex/knexConnection';
import Knex from 'knex';
import { singleton } from 'tsyringe';

export interface IDatabase {
  start(): Promise<void>;
  getConnection(): any;
}
@singleton()
export class Database implements IDatabase {
  protected connection: Knex;
  constructor(connection: Knex = knexInstance) {
    this.connection = connection;
  }
  public getConnection = () => {
    return this.connection;
  };
  private assertDatabaseConnection = async () => {
    try {
      await this.connection.raw('select 1+1 as result');
    } catch (err) {
      console.log(
        '[Fatal] Failed to establish connection to database! Exiting...',
      );
      console.log(err);
      process.exit(1);
    }
  };
  private runMigrations = async () => {
    console.log('Migration started...');
    await this.connection.migrate.latest({ loadExtensions: ['.ts'] });
    console.log('Migration finished...');
  };
  public start = async () => {
    if (this.connection instanceof Knex) return;
    await this.runMigrations();
    await this.assertDatabaseConnection();
  };
}
