import { Router } from 'express';
import multer from 'multer';
import { CreateCarController } from '@modules/cars/use-cases/create-car/CreateCarController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticate';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ListAvailableCarsController } from '@modules/cars/use-cases/list-available-cars/ListAvailableCarsController';
import { CreateCarSpecificationController } from '@modules/cars/use-cases/create-car-specification/CreateCarSpecificationController';
import { UploadCarImageController } from '@modules/cars/use-cases/upload-car-image/UploadCarImageController';
import uploadConfig from '@config/upload';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImageController();

const uploadCarImage = multer(uploadConfig);

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);

carsRoutes.get('/available', listAvailableCarsController.handle);

carsRoutes.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle,
);

carsRoutes.post(
  '/images/:id',
  ensureAuthenticated,
  ensureAdmin,
  uploadCarImage.array('images'),
  uploadCarImageController.handle,
);

export { carsRoutes };
