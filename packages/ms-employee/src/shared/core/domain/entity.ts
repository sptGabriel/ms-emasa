import { ensure } from 'tiny-types/lib/ensure';
import { isDefined, Predicate, TinyType } from 'tiny-types';
import { uuid } from 'uuidv4';
export interface EntityProperties<TId = Identifier> {
  id: TId;
}
export abstract class Identifier extends TinyType {
  constructor(readonly value: string) {
    super();
    this.value = value || uuid();
    ensure(this.constructor.name, value, isNotEmpty());
  }

  toString(): string {
    return this.value;
  }
}
export abstract class Entity<TId = Identifier>
  extends TinyType
  implements EntityProperties<TId> {
  constructor(readonly id: TId) {
    super();
    ensure(this.constructor.name, id, isDefined());
  }
  equals(object: Entity<TId>): boolean {
    if (object == null) {
      return false;
    }
    if (this === object) {
      return true;
    }
    if (!isEntity(object)) {
      return false;
    }

    return this.id.equals(object.id);
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
