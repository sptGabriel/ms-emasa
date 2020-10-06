import { IMapper } from '../../../shared/core/infra/mapper';
import { singleton } from 'tsyringe';
import { Departament, IDepartamentProps } from '../domain/departament';
import { DomainCreator } from 'shared/core/infra/createDomainFactory';
import { uuid, isUuid } from 'uuidv4';
import { Either, right } from 'shared/core/utils/result';
@singleton()
export class DepartamentMapper implements IMapper<Departament> {
  constructor(private departamentCreator: DomainCreator<Departament>) {}
  public toPersistence = (t: any): Departament => {
    throw new Error('Method not implemented.');
  };
  public toDomain = async (raw: any): Promise<Departament> => {
    if (raw instanceof Departament) return raw;
    const { departament_name, manager_id, id } = raw;
    const departament = await Departament.create(
      { departament_name, manager_id },
      id ? id : uuid(),
    );
    if (departament.isLeft()) throw departament.value;
    return departament.value;
  };
}
