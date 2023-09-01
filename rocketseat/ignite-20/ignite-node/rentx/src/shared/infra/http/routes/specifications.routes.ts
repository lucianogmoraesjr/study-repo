import { Router } from 'express';
import { CreateSpecificationController } from '@modules/cars/use-cases/create-specification/CreateSpecificationController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticate';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle,
);

export { specificationsRoutes };
