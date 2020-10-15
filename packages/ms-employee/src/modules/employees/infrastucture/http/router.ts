import { createEmployeeController } from '../../useCases/createEmployee';
import { getEmployeeController } from '../../useCases/getEmployee';
import { Router } from 'express';
const employeeRouter = Router();
employeeRouter.post('/employee/create', (request, response) =>
  createEmployeeController.execute(request, response),
);
employeeRouter.get('/employee/:matricula', (request, response) =>
  getEmployeeController.execute(request, response),
);
export { employeeRouter };
