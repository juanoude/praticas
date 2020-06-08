import { Router } from 'express';
import ForgotPasswordController from '@modules/users/infra/http/controllers/ForgotPasswordController';
import ResetPasswordController from '@modules/users/infra/http/controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPassowordController = new ResetPasswordController();

passwordRouter.post('/forgot', forgotPasswordController.create);
passwordRouter.post('/reset', resetPassowordController.create);

export default passwordRouter;
