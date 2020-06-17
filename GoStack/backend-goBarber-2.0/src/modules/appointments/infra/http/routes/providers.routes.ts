import { Router } from 'express';
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
  monthAvailabilityController.index
);
providerRoutes.get(
  '/:provider_id/day-availability',
  dayAvailabilityController.index
);

export default providerRoutes;
