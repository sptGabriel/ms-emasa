import { DepartamentRepository } from '@modules/departaments/infrastucture/departament.repository';
import { CreateDepartamentUseCase } from './createDepartament';
import { CreateDepartamentController } from './createDepartamentController';
import { KnexInstance } from '@infra/knex/knexConnection';
import { container } from 'tsyringe';

const departamentRepository = new DepartamentRepository();
const createDepartamentuseCase = new CreateDepartamentUseCase(
  departamentRepository,
);
const createDepartamentController = new CreateDepartamentController(
  createDepartamentuseCase,
);
export { createDepartamentController, createDepartamentuseCase };
