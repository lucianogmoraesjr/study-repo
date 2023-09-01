import { ResetPasswordController } from '@modules/accounts/use-cases/reset-password/ResetPasswordController';
import { SendForgotPasswordMailController } from '@modules/accounts/use-cases/send-forgot-password-mail/SendForgotPasswordMailController';
import { Router } from 'express';

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordController();

passwordRoutes.post('/forgot', sendForgotPasswordMailController.handle);
passwordRoutes.post('/reset', resetPasswordController.handle);

export { passwordRoutes };
