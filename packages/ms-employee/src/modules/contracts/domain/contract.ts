import { Either, left, right } from '../../../shared/core/utils/result';
import { validate, v4 } from 'uuid';
export interface IContract {
  id?: string;
  name: string;
  signature: string;
}
export class Contract implements IContract {
  readonly id: string;
  readonly name: string;
  readonly signature: string;
  private constructor(props: IContract) {
    Object.assign(this, props);
    if (!props.id) this.id = v4();
  }
  public static create = (props: IContract): Either<Error, Contract> => {
    const isUUID = props.id ? validate(props.id) : undefined;
    if (isUUID === false) return left(new Error(`Id not is a valid UUID`));
    const contract = new Contract(props);
    return right(contract);
  };
  public static toDomain = (props: IContract) => {
    const contract = Contract.create(props);
    if (contract.isLeft()) throw contract.value;
    return contract.value;
  };
}
