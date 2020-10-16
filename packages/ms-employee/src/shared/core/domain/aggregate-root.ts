import { Entity } from './entity';
import { DomainEvents } from './events/domain-event';
import { IDomainEvent } from './events/domainEvent-contract';
import pino from 'pino';
import { JSONObject } from 'tiny-types';
const logger = pino({ level: 'error' });
export abstract class AggregateRoot {}
