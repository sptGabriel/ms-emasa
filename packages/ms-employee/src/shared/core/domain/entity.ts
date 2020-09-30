import { ensure } from 'tiny-types/lib/ensure';
import { isDefined, Predicate, TinyType } from 'tiny-types';
import { uuid } from 'uuidv4';
import { UniqueEntityID } from './unique-id';

export abstract class Entity<T> {
  protected readonly _id: UniqueEntityID;
  public readonly props: T;
  constructor(props: T, id?: UniqueEntityID) {
    this._id = id || new UniqueEntityID();
    this.props = props;
  }
  public equals(object: Entity<T>): boolean {
    if (object == null) {
      return false;
    }
    if (this === object) {
      return true;
    }
    if (!isEntity(object)) {
      return false;
    }

    return this._id.equals(object._id);
  }
}
function isEntity(v?: object): boolean {
  return v instanceof Entity;
}
export function isNotEmpty(): Predicate<string | ReadonlyArray<string>> {
  return Predicate.to(
    `be not empty`,
    (value: string | ReadonlyArray<string>): boolean =>
      !(value == null || value.length === 0),
  );
}
