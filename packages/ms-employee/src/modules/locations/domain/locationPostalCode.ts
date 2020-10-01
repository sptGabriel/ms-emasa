import { Result } from '../../../shared/core/utils/result';
import { AggregateRoot } from 'shared/core/domain/aggregate-root';
import { UniqueEntityID } from '../../../shared/core/domain/unique-id';
import { Guard } from 'shared/core/utils/guard';
import { LocationCreatedEvent } from './events/locationCreated-Event';

export interface ICepCodeProps {
  value: string;
}
export class CepCode extends AggregateRoot<ICepCodeProps> {
  get value(): string {
    return this.props.value;
  }
  private constructor(props: ICepCodeProps) {
    super(props);
  }
  private static CEP_MAX_SIZE = 6;
  private static isValidCep = (str: string) => {
    str.replace('-', '').trim().toLowerCase();
    if (str.length !== CepCode.CEP_MAX_SIZE) return false;
    return true;
  };
  public static create(cep: string): Result<CepCode> {
    if (!this.isValidCep(cep)) Result.fail('Invalid Cep');
    return Result.ok(new CepCode({ value: cep }));
  }
}
