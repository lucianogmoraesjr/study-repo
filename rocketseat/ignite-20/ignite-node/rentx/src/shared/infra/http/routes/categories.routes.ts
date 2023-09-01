import { Router } from 'express';
import multer from 'multer';
import { CreateCategoryController } from '@modules/cars/use-cases/create-category/CreateCategoryController';
import { ImportCategoriesController } from '@modules/cars/use-cases/import-categories/ImportCategoriesController';
import { ListCategoriesController } from '@modules/cars/use-cases/list-categories/ListCategoriesController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticate';
import { ensureAdmin } from '../middlewares/ensureAdmin';

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
const importCategoriesController = new ImportCategoriesController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle,
);

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  ensureAuthenticated,
  ensureAdmin,
  importCategoriesController.handle,
);

export { categoriesRoutes };
