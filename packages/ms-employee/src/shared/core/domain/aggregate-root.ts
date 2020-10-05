import { Entity } from './entity';
import { DomainEvents } from './events/domain-event';
import { IDomainEvent } from './events/domainEvent-contract';
import pino from 'pino';
const logger = pino({ level: 'error' });
export abstract class AggregateRoot<T> extends Entity<T> {
  _version: number = 0;
  readonly fetchVersion: number;
  private _domainEvents: IDomainEvent[] = [];
  get domainEvents(): IDomainEvent[] {
    return this._domainEvents;
  }
  get id(): string {
    return this._id;
  }
  protected when(domainEvent: IDomainEvent): void {
    // Add the domain event to this aggregate's list of domain events
    this.addEvent(domainEvent);
    // Add this aggregate instance to the domain event's list of aggregates who's
    // events it eventually needs to dispatch.
    DomainEvents.markAggregateForDispatch(this);
    // Log the domain event
    this.logDomainEventAdded(domainEvent);
  }

  public clearEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }

  private logDomainEventAdded(domainEvent: IDomainEvent): void {
    const thisClass = Reflect.getPrototypeOf(this);
    const domainEventClass = Reflect.getPrototypeOf(domainEvent);

    logger.info(
      `[Domain Event Created]:`,
      thisClass.constructor.name,
      '==>',
      domainEventClass.constructor.name,
    );
  }

  private addEvent(event: IDomainEvent): void {
    this._domainEvents.push(event);
    this._version++;
  }
}
