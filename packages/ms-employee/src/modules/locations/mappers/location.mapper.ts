import { UniqueEntityID } from '../../../shared/core/domain/unique-id';
import IMapper from '../../../shared/core/infra/mapper';
import { Result } from '../../../shared/core/utils/result';
import { singleton } from 'tsyringe';
import { LocationSeats } from '../domain/location';
import { CepCode } from '../domain/locationPostalCode';

@singleton()
export class LocationMapper<LocationSeats> implements IMapper<LocationSeats> {
  constructor() {}
  public toPersistence(t: any): Result<LocationSeats> {
    throw new Error('Method not implemented.');
  }
  private validate() {}
  public toDomain(raw: any): Result<LocationSeats> {
    const cepCodeorError = CepCode.create(raw.cep_code);
    const locationOrError = LocationSeats.create(
      {
        cep_code: cepCodeorError.getValue(),
        stret_address: raw.street_address,
      },
      new UniqueEntityID(raw.id),
    );
    return locationOrError;
  }
}
