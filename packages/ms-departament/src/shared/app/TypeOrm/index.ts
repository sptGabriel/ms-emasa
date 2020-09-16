import {
  Connection,
  ConnectionOptions,
  Migration,
  createConnection,
} from 'typeorm';
export interface TypeormContract {
  getConfig(): ConnectionOptions | undefined;
  runMigration(): Promise<void>;
  init(): Promise<void>;
}
export class TypeOrm {
  private config: ConnectionOptions;
  private connection: Connection;
  constructor(config: ConnectionOptions) {
    this.config = config;
  }
  public getConnectionName = () => {
    return this.connection ? this.connection.name : undefined;
  };
  public getConfig = () => {
    return this.config ? this.config : undefined;
  };
  public startTypeorm = async () => {
    try {
      if (!this.config) Promise.reject('Please set configurations');
      this.connection = await createConnection(this.config).then(connection => {
        return connection.runMigrations().then(() => {
          return connection;
        });
      });
    } catch (error) {
      if (error instanceof Error) Promise.reject(error);
    }
  };
}

export class TypeOrmFactory {
  private config: ConnectionOptions;
  constructor() {}
  public setConfig = (data: ConnectionOptions) => {
    if (!data) throw new Error('Connection options must be provided');
    this.config = data;
  };
  public newOrmConnection = () => {
    if (!this.config) throw new Error('Connection options must be provided');
    return new TypeOrm(this.config);
  };
}
