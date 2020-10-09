import 'reflect-metadata';
import { BootstrapApplication } from './Bootstrap';
import { ExpressServer } from './WebServer';
import { knexInstance } from '@infra/knex/knexConnection';
import { container } from 'tsyringe';
import { Database } from './DataBase';
(async () => {
  const server = new BootstrapApplication(
    new ExpressServer(),
    container.resolve(Database),
  );
  await server.start();
})();
