import { Router } from 'express';
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const providerRoutes = Router();
const providersController = new ProvidersController();

providerRoutes.use(ensureAuthenticated);

providerRoutes.get('/', providersController.index);

export default providerRoutes;
