import { Router } from 'express';

import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import UserController from '@modules/users/infra/http/controllers/UserController';
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';

const upload = multer(uploadConfig);
const userRouter = Router();

const userController = new UserController();
const userAvatarController = new UserAvatarController();

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required()
    })
  }),
  userController.create
);

userRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update
);

export default userRouter;
