import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import SessionController from '@modules/users/infra/http/controllers/SessionController';

const sessionsRouter = Router();
const sessionController = new SessionController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required()
    })
  }),
  sessionController.create
);

export default sessionsRouter;
