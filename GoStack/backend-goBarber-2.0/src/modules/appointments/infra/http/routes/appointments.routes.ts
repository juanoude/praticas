import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentController from '@modules/appointments/infra/http/controllers/AppointmentController';
import ProviderAppointmentsController from '@modules/appointments/infra/http/controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentController = new AppointmentController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (req, res) => {
//   const appointments = await appointmentsRepository.find();
//   res.json(appointments);
// });

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      provider_id: Joi.string().uuid().required(),
      date: Joi.date().required()
    })
  }),
  appointmentController.create
);

appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;
