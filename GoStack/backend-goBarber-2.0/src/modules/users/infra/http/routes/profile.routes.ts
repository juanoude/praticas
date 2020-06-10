import { Router } from 'express';

import UserProfileController from '@modules/users/infra/http/controllers/UserProfileController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const profileRouter = Router();

const userProfileController = new UserProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', userProfileController.show);

profileRouter.put('/update', userProfileController.update);

export default profileRouter;
