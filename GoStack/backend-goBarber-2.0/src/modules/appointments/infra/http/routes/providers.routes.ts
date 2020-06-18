import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';

import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import DayAvailabilityController from '@modules/appointments/infra/http/controllers/DayAvailabilityController';
import MonthAvailabilityController from '@modules/appointments/infra/http/controllers/MonthAvailabilityController';

const providerRoutes = Router();
const providersController = new ProvidersController();
const dayAvailabilityController = new DayAvailabilityController();
const monthAvailabilityController = new MonthAvailabilityController();

providerRoutes.use(ensureAuthenticated);

providerRoutes.get('/', providersController.index);

providerRoutes.get(
  '/:provider_id/month-availability',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      provider_id: Joi.string().uuid().required()
    })
  }),
  monthAvailabilityController.index
);
providerRoutes.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      provider_id: Joi.string().uuid().required()
    })
  }),
  dayAvailabilityController.index
);

export default providerRoutes;
