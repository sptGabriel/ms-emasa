import 'reflect-metadata';
import { BoostrapApplication } from './app';
import { CreateDepartament } from '../../departaments/controllers/CreateDepartament';
import { RabbitMQ } from './RabbitMqServer';
import { container } from 'tsyringe';
const server = new BoostrapApplication([new CreateDepartament()]);
(async () => {
  const rabbitMq = new RabbitMQ();
  server.listen();
  await rabbitMq.start();
  // const controllers = container.resolve('controller');
  // console.log(controllers);
})();
