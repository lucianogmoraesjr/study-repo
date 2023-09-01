import { Router } from 'express';
import { CreateRentalController } from '@modules/rentals/use-cases/create-rental/CreateRentalController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticate';
import { ReturnRentalController } from '@modules/rentals/use-cases/return-rental/ReturnRentalController';
import { ListRentalsByUserController } from '@modules/rentals/use-cases/list-rentals-by-user/ListRentalsByUserController';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const returnRentalController = new ReturnRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post('/', ensureAuthenticated, createRentalController.handle);

rentalRoutes.post(
  '/return/:id',
  ensureAuthenticated,
  returnRentalController.handle,
);

rentalRoutes.get(
  '/user',
  ensureAuthenticated,
  listRentalsByUserController.handle,
);
export { rentalRoutes };
