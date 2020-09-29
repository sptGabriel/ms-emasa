import { AggregateRootProperties } from '@node-ts/ddd-types';
import { Model } from './model';
import { Property } from '@mikro-orm/core';

export class WriteModel extends Model implements AggregateRootProperties {
  @Property()
  version: number;
}
