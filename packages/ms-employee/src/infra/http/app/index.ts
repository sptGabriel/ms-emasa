import 'reflect-metadata';
import { BootstrapApplication } from './Bootstrap';
import { ExpressServer } from './WebServer';
import { KnexInstance } from '@infra/knex/knexConnection';
import { container } from 'tsyringe';
(async () => {
  const server = new BootstrapApplication(
    new ExpressServer(),
    container.resolve(KnexInstance),
  );
  await server.start();
})();
