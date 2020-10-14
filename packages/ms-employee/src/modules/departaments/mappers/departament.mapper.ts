import { IMapper } from '../../../shared/core/infra/mapper';
import { singleton } from 'tsyringe';
import { Departament, IDepartamentProps } from '../domain/departament';
import { DomainCreator } from 'shared/core/infra/createDomainFactory';
import { uuid, isUuid } from 'uuidv4';

@singleton()
export class DepartamentMapper implements IMapper<Departament> {
  constructor() {}
  public toPersistence = (t: any): Departament => {
    throw new Error('Method not implemented.');
  };
  public toDomain = async (raw: any): Promise<Departament> => {};
}
