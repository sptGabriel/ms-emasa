import { BaseController } from 'shared/core/infra/base-controller';
import { getEmployeeUseCase } from './getEmployee';
export class GetEmployeeController extends BaseController {
  private useCase: getEmployeeUseCase;
  constructor(useCase: getEmployeeUseCase) {
    super();
    this.useCase = useCase;
  }

  protected async executeImpl() {
    const matricula = this.request.params.matricula;
    try {
      const result = await this.useCase.execute(matricula);
      if (result.isLeft()) return this.response.send(result.value);
      return this.response.json(result.value);
    } catch (err) {}
  }
}
