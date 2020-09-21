import 'reflect-metadata';
import { BootstrapApplication } from './Bootstrap';
(async () => {
  const server = new BootstrapApplication();
  await server.start();
  console.log('server ready');
})();
