import { createEmployeeDTO } from './createEmployee_DTO';
import { BaseController } from 'shared/core/infra/base-controller';
import { CreateEmployeeUseCase } from './createEmployee';
export class CreateEmployeeController extends BaseController {
  private useCase: CreateEmployeeUseCase;
  constructor(useCase: CreateEmployeeUseCase) {
    super();
    this.useCase = useCase;
  }
  protected async executeImpl() {
    const dto = this.request.body as createEmployeeDTO;
    try {
      const result = await this.useCase.execute(dto);
      if (result.isLeft()) return result.value;
      return result.value;
    } catch (err) {}
  }
}
