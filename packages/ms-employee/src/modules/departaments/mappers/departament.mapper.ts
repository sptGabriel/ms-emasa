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
  public toDomain = async (raw: any): Promise<Departament> => {
    if (raw instanceof Departament) return raw;
    const { departament_name, id } = raw;
    const manager = raw.manager ? raw.manager : null;
    const departament = await Departament.create(
      { departament_name, manager },
      id ? id : uuid(),
    );
    if (departament.isLeft()) throw departament.value;
    return departament.value;
  };
}
