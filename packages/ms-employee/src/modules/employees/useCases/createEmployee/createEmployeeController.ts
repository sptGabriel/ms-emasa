import {
  Departament,
  IDepartamentProps,
} from '@modules/departaments/domain/departament';
import { BaseController } from 'shared/core/infra/base-controller';
import { CreateDepartamentUseCase } from './createEmployee';
export class CreateDepartamentController extends BaseController {
  private useCase: CreateDepartamentUseCase;
  constructor(useCase: CreateDepartamentUseCase) {
    super();
    this.useCase = useCase;
  }

  protected async executeImpl() {
    const dto = this.request.body as IDepartamentProps;
    try {
      const result = await this.useCase.execute(dto);
      if (result.isLeft()) return result.value;
      return result.value;
    } catch (err) {}
  }
}
