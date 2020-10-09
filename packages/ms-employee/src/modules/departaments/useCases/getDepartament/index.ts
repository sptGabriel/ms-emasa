import { DepartamentRepository } from '@modules/departaments/infrastucture/departament.repositoryImpl';
import { getDepartamentUseCase } from './getDepartament';
import { GetDepartamentController } from './getDepartamentController';

const departamentRepository = new DepartamentRepository();
const getDepartamentuseCase = new getDepartamentUseCase(departamentRepository);
const getDepartamentController = new GetDepartamentController(
  getDepartamentuseCase,
);
export { getDepartamentController, getDepartamentuseCase };
