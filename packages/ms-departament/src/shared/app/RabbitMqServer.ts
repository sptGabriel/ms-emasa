import 'reflect-metadata';
import express from 'express';
import {
  RabbitMqConnectionFactory,
  RabbitMqConnection,
  ConsumerFactory,
} from 'nabbitmq';
import { container } from 'tsyringe';
import { Options } from 'amqplib';

export class RabbitMQ {
  private consumerConnection: RabbitMqConnection;
  private producerConnection: RabbitMqConnection;
  private factoryConnection: RabbitMqConnectionFactory;
  constructor() {
    this.createFactory();
  }
  private createFactory = () => {
    this.factoryConnection = new RabbitMqConnectionFactory();
    this.factoryConnection.setOptions({
      username: 'admin',
      password: 'admin',
      port: 5672,
      hostname: 'localhost',
    });
  };
  private startConsumerConnection = async () => {
    this.consumerConnection = await this.factoryConnection.newConnection();
  };
  // private startProducerConnection = async () => {
  //   this.producerConnection = await this.factoryConnection.newConnection();
  // };
  private registerConnection = () => {
    container.register<RabbitMqConnection>('ConsumerConnection', {
      useValue: this.consumerConnection,
    });
    container.register<RabbitMqConnection>('PublisherConnection', {
      useValue: this.producerConnection,
    });
  };
  public start = async () => {
    await this.startConsumerConnection();
    this.registerConnection();
  };
}
