import { Either, left, right } from '../../../shared/core/utils/result';
import { AggregateRoot } from 'shared/core/domain/aggregate-root';
import { Guard } from 'shared/core/utils/guard';
import { LocationCreatedEvent } from './events/locationCreated-Event';
import { validate } from 'uuid';
import { Employee } from './employee';
export interface IUserProps {
  employee: Employee;
  login: string;
  password: string;
  accessToken?: string;
  lastLogin?: Date;
}
export class User extends AggregateRoot<IUserProps> {
  private constructor(props: IUserProps, id?: string) {
    super(props, id);
  }
  public isLoggedIn(): boolean {
    return !!this.props.accessToken;
  }
  public setAccessToken(accessToken: string): void {
    this.when(new LocationCreatedEvent(this));
    this.props.accessToken = accessToken;
    this.props.lastLogin = new Date();
  }
  public static create = (
    props: IUserProps,
    id?: string,
  ): Promise<Either<Error, User>> => {
    return new Promise<Either<Error, User>>((resolve, reject) => {
      const guardedProps = [
        { argument: props.login, argumentName: 'login' },
        { argument: props.password, argumentName: 'password' },
      ];
      const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
      if (!guardResult.succeeded) reject(left(new Error(guardResult.message)));
      if (!validate(props.employee.Identity)) {
        return reject(left(new Error(`Manager_id not is a valid UUID`)));
      }
      const user = new User(props, id);
      const idWasProvided = !!id;
      if (!idWasProvided) {
        user.when(new LocationCreatedEvent(user));
      }
      return resolve(right(user));
    }).catch((error: Error) => {
      throw error;
    });
  };
  public serialize() {
    return null;
  }
}
