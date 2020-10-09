import { createDepartamentController } from '@modules/departaments/useCases/createDepartament';
import { getDepartamentController } from '@modules/departaments/useCases/getDepartament/';
import { Router } from 'express';
const departamentRouter = Router();
departamentRouter.post('/departaments', (request, response) =>
  createDepartamentController.execute(request, response),
);
departamentRouter.get('/departaments/:departament_name', (request, response) =>
  getDepartamentController.execute(request, response),
);
export { departamentRouter };
