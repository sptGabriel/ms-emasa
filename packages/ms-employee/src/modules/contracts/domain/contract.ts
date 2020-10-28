import { Either, left, right } from '../../../shared/core/utils/result';
import { validate, v4 } from 'uuid';
import { Supplying } from '@modules/supply/domain/supplying';
export interface IContract {
  id?: string;
  name: string;
  signature: string;
  supply_id: string;
  supply?: Supplying;
}
export class Contract implements IContract {
  readonly id: string;
  readonly name: string;
  readonly supply_id: string;
  readonly supply?: Supplying;
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
