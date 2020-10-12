import { Either, left, right } from '../../../shared/core/utils/result';
import { AggregateRoot } from 'shared/core/domain/aggregate-root';
import { Guard } from 'shared/core/utils/guard';
import { LocationCreatedEvent } from './events/locationCreated-Event';
import { validate } from 'uuid';
import bcrypt from 'bcryptjs';
import { ValueObject } from 'shared/core/domain/value-object';
export interface IUserPasswordProps {
  value: string;
  hashed?: boolean;
}
export class UserPassword extends ValueObject<IUserPasswordProps> {
  private constructor(props: IUserPasswordProps) {
    super(props);
  }
  public isAlreadyHashed(): boolean {
    if (!this.props.hashed) return false;
    return this.props.hashed;
  }
  public async comparePassword(plainTextPassword: string): Promise<boolean> {
    let hashed: string;
    if (this.isAlreadyHashed()) {
      hashed = this.props.value;
      return bcrypt.compare(plainTextPassword, hashed);
    }
    return this.props.value === plainTextPassword;
  }
  public async getHashedValue(): Promise<string> {
    if (this.isAlreadyHashed()) {
      return this.props.value;
    }
    return bcrypt.hash(this.props.value, 8);
  }
  public static create({
    value,
    hashed,
  }: IUserPasswordProps): Promise<Either<Error, UserPassword>> {
    return new Promise<Either<Error, UserPassword>>((resolve, reject) => {
      const propsResult = Guard.againstNullOrUndefined(value, 'password');
      if (!propsResult.succeeded) {
        return left(new Error(propsResult.message));
      }
      const userPassword = new UserPassword({
        value,
        hashed,
      });
      return right(userPassword);
    });
  }
}
