import { container } from 'tsyringe';
import { Connection, createConnection } from 'typeorm';
import config from './TypeOrm/ormconfig';

export interface DataBase {
  start(): void;
  close(): void;
}

export class Typeorm implements DataBase {
  private connection: Connection;
  private runMigrations = async () => {
    if (!this.connection) return;
    await this.connection.runMigrations();
  };
  private connect = async () => {
    try {
      if (!config) Promise.reject('Please set configurations');
      this.connection = await createConnection(config);
    } catch (error) {
      if (error instanceof Error) Promise.reject(error);
    }
  };
  public start = async () => {
    try {
      await this.connect();
      await this.runMigrations();
      container.register(Connection, { useValue: this.connection });
    } catch (error) {
      if (error instanceof Error) Promise.reject(error);
    }
  };
  public close() {
    if (!this.connection) throw new Error('Dont exists connection');
    this.connection.close();
  }
}
