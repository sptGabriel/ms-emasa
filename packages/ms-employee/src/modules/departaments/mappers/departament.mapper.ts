import { IMapper } from '../../../shared/core/infra/mapper';
import { singleton } from 'tsyringe';
import { Departament, IDepartamentProps } from '../domain/departament';
import { DomainCreator } from 'shared/core/infra/createDomainFactory';
import { uuid, isUuid } from 'uuidv4';
@singleton()
export class DepartamentMapper implements IMapper<Departament> {
  constructor(private departamentCreator: DomainCreator<Departament>) {}
  private validate = () => {};
  public toPersistence = (t: any): Departament => {
    throw new Error('Method not implemented.');
  };
  public toDomain = (raw: any): Departament => {
    if (raw instanceof Departament) return raw;
    const { departament_name, manager_id, id } = raw;
    if (isUuid(manager_id) || isUuid(id)) throw new Error(Departament);
  };
}
