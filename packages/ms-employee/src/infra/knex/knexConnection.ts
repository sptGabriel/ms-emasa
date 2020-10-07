import * as knexConfig from '../../../knexfile';
import Knex from 'knex';
import { singleton } from 'tsyringe';

@singleton()
export class KnexInstance {
  private knex: Knex;
  constructor() {
    this.knex = Knex(knexConfig);
    this.assertDatabaseConnection();
  }
  public get Knex() {
    if (!this.Knex) throw new Error('[FATAL]: invalid knex connection');
    return this.knex;
  }
  private assertDatabaseConnection = () => {
    this.knex.raw('select 1+1 as result').catch(err => {
      console.log(
        '[Fatal] Failed to establish connection to database! Exiting...',
      );
      console.log(err);
      process.exit(1);
    });
  };
  public runMigrations = async () => {
    try {
      console.log('Migration started...');
      await this.knex.migrate
        .latest({ loadExtensions: ['.ts'] })
        .then(value => {
          console.log(value);
        });
      console.log('Migration finished...');
    } catch (err) {
      throw err;
      console.log(err);
    }
  };
}
