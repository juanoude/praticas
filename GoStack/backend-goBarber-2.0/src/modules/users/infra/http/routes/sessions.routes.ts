import { Router } from 'express';
import CreateSessionService from '@modules/users/services/CreateSessionService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const usersRepository = new UsersRepository();
  const createSessionservice = new CreateSessionService(usersRepository);

  const { user, token } = await createSessionservice.execute({
    email,
    password
  });

  delete user.password;

  return res.json({ user, token });
});

export default sessionsRouter;
