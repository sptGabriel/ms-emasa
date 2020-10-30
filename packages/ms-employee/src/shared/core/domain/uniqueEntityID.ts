import { v4, validate } from 'uuid';

export class UniqueEntityID {
  private value: string;

  constructor(id?: string) {
    const valid = id ? validate(id) : undefined;
    if (valid === false) throw new Error('invalid ID, expect UUID Version 4');
    this.value = id || v4();
  }

  equals(id?: UniqueEntityID): boolean {
    if (id === null || id === undefined) {
      return false;
    }

    if (!(id instanceof UniqueEntityID)) {
      return false;
    }

    return id.toValue() === this.value;
  }

  toString(): string {
    return String(this.value);
  }

  toValue(): string {
    return this.value;
  }
}
