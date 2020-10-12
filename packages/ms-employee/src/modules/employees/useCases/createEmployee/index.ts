import { DepartamentRepository } from '@modules/departaments/infrastucture/departament.repositoryImpl';
import { CreateDepartamentUseCase } from './createEmployee';
import { CreateDepartamentController } from './createEmployeeController';

const departamentRepository = new DepartamentRepository();
const createDepartamentuseCase = new CreateDepartamentUseCase(
  departamentRepository,
);
const createDepartamentController = new CreateDepartamentController(
  createDepartamentuseCase,
);
export { createDepartamentController, createDepartamentuseCase };
