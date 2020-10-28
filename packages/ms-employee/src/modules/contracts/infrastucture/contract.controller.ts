import { NextFunction, Request, Response } from 'express';
import { BaseController } from 'shared/core/infra/base-controller';
import { container } from 'tsyringe';
import { ICreateContractDTO } from '../useCases/createContract/createContract_DTO';
import { CreateContractUseCase } from '../useCases/createContract';
export class ContractController extends BaseController {
  constructor() {
    super();
    this.path = '/contracts';
    this.initRouter();
  }
  protected initRouter() {
    this.router.get(`${this.path}`, this.index);
    this.router.post(`${this.path}/create`, this.createContract);
  }
  private index = async (arg0: string, index: any) => {
    throw new Error('Method not implemented.');
  };
  private createContract = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const dto: ICreateContractDTO = request.body;
      const result = await container
        .resolve(CreateContractUseCase)
        .execute(dto);
      if (result.isLeft()) return next(result.value);
      return response.json(result.value);
    } catch (error) {
      next(error);
    }
  };
}
