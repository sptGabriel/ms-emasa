import { Entity } from './entity';
import { DomainEvents } from './events/domain-event';
import { IDomainEvent } from './events/domainEvent-contract';
import pino from 'pino';
import { JSONObject } from 'tiny-types';
import { UniqueEntityID } from './uniqueEntityID';
const logger = pino({ level: 'error' });
export abstract class AggregateRoot<T = any> extends Entity<T> {
  get id(): UniqueEntityID {
    return this._id;
  }
}
