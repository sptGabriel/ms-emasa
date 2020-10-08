import 'reflect-metadata';
import { BootstrapApplication } from './Bootstrap';
import { ExpressServer } from './WebServer';
import { KnexInstance } from '@infra/knex/knexConnection';
import { container } from 'tsyringe';
(async () => {
  const knex = container.resolve(KnexInstance)
  const server = new BootstrapApplication(
    new ExpressServer(),
    knex
  );
  await server.start();
})();
