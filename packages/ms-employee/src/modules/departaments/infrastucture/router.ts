import { createDepartamentController } from '@modules/departaments/useCases/createDepartament';
import { Router } from 'express';
const departamentRouter = Router();
departamentRouter.post('/', (request, response) =>
  createDepartamentController.execute(request, response),
);
export default departamentRouter;
