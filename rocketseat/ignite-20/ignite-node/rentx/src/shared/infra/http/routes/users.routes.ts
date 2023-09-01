import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { CreateUserController } from '@modules/accounts/use-cases/create-user/CreateUserController';
import { UpdateUserAvatarController } from '@modules/accounts/use-cases/update-user-avatar/UpdateUserAvatarController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticate';
import { ShowProfileController } from '@modules/accounts/use-cases/show-profile/ShowProfileController';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const showProfileController = new ShowProfileController();

usersRoutes.post('/', createUserController.handle);

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle,
);

usersRoutes.get('/profile', ensureAuthenticated, showProfileController.handle);

export { usersRoutes };
