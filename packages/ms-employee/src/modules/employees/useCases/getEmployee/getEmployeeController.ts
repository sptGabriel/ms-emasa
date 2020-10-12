import { BaseController } from 'shared/core/infra/base-controller';
import { getDepartamentUseCase } from './getEmployee';
export class GetDepartamentController extends BaseController {
  private useCase: getDepartamentUseCase;
  constructor(useCase: getDepartamentUseCase) {
    super();
    this.useCase = useCase;
  }

  protected async executeImpl() {
    const departament_name = this.request.params.departament_name;
    try {
      const result = await this.useCase.execute(departament_name);
      if (result.isLeft()) return this.response.send(result.value);
      return this.response.json(result.value);
    } catch (err) {}
  }
}
