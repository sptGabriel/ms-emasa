import 'reflect-metadata';
import express from 'express';
import { RabbitMqConnectionFactory, RabbitMqConnection } from 'nabbitmq';
import { container } from 'tsyringe';
import { validateEnv } from './shared/utils/validateEnvs';
(async () => {
  const factory = new RabbitMqConnectionFactory();
  factory.setOptions({
    username: 'admin',
    password: 'admin',
    port: 5672,
    hostname: 'localhost',
  });
  const ConsumerConnection = await factory.newConnection();
  const PublisherConnection = await factory.newConnection();
  container.register<RabbitMqConnection>('ConsumerConnection', {
    useValue: ConsumerConnection,
  });
  container.register<RabbitMqConnection>('PublisherConnection', {
    useValue: PublisherConnection,
  });
  const instance1 = container.resolve('ConsumerConnection');
  const instance2 = container.resolve('ConsumerConnection');
  console.log(instance1 === instance2);
  const app = express();
  validateEnv();
  app.get('/', (req, res) => {
    return res.send('service A');
  });
  app.listen(3001, () => {
    console.log(`⚡️ Service A on port 3001`);
  });
})();
