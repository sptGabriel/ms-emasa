import { DepartamentRepository } from '@modules/departaments/infrastucture/departament.repositoryImpl';
import { CreateDepartamentUseCase } from './createDepartament';
import { CreateDepartamentController } from './createDepartamentController';

const departamentRepository = new DepartamentRepository();
const createDepartamentuseCase = new CreateDepartamentUseCase(
  departamentRepository,
);
const createDepartamentController = new CreateDepartamentController(
  createDepartamentuseCase
);
export { createDepartamentController, createDepartamentuseCase };
