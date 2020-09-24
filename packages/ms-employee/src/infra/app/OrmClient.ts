import {
  Connection,
  IDatabaseDriver,
  MikroORM,
  Options,
} from '@mikro-orm/core';
import config from 'Mikro-orm.config';
import { singleton } from 'tsyringe';

export interface ORM {
  start(): void;
  getConnection(): MikroORM<IDatabaseDriver<Connection>>;
}

@singleton()
export class MikroClient implements ORM {
  private mikroORMConnection: MikroORM<IDatabaseDriver<Connection>>;
  private options: Options;
  constructor(config: Options) {
    this.options = config;
  }
  public getConnection = () => {
    return this.mikroORMConnection;
  };
  public start = async () => {
    try {
      this.mikroORMConnection = await MikroORM.init(this.options);
      const migrator = await this.mikroORMConnection.getMigrator();
      const migrations = await migrator.getPendingMigrations();
      if (!(migrations && migrations.length > 0)) return;
      await migrator.up();
    } catch (error) {
      throw error;
    }
  };
}
