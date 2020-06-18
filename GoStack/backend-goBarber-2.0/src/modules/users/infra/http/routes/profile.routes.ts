import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import UserProfileController from '@modules/users/infra/http/controllers/UserProfileController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const profileRouter = Router();

const userProfileController = new UserProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', userProfileController.show);

profileRouter.put(
  '/update',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string().min(6),
      password: Joi.string().min(6),
      password_confirmation: Joi.string().valid(Joi.ref('password'))
    })
  }),
  userProfileController.update
);

export default profileRouter;
