import { DepartamentRepository } from '@modules/departaments/infrastucture/departament.repositoryImpl';
import { getDepartamentUseCase } from './getEmployee';
import { GetDepartamentController } from './getEmployeeController';

const departamentRepository = new DepartamentRepository();
const getDepartamentuseCase = new getDepartamentUseCase(departamentRepository);
const getDepartamentController = new GetDepartamentController(
  getDepartamentuseCase,
);
export { getDepartamentController, getDepartamentuseCase };
