import { RabbitMqConnectionFactory, RabbitMqConnection } from 'nabbitmq';
import { container } from 'tsyringe';
import { Options } from 'amqplib';

export class RabbitMQ {
  private consumerConnection: RabbitMqConnection;
  private producerConnection: RabbitMqConnection;
  constructor() {}
  private registerConnection = () => {
    container.register<RabbitMqConnection>('ConsumerConnection', {
      useValue: this.consumerConnection,
    });
    container.register<RabbitMqConnection>('PublisherConnection', {
      useValue: this.producerConnection,
    });
  };
  public start = async () => {
    try {
      const factory = new RabbitMqConnectionFactory();
      factory.setOptions({
        username: 'admin',
        password: 'admin',
        port: 5672,
        hostname: 'localhost',
      });
      this.consumerConnection = await factory.newConnection();
      this.producerConnection = await factory.newConnection();
      this.registerConnection();
    } catch (error) {
      if (error instanceof Error) Promise.reject(error);
    }
  };
}
