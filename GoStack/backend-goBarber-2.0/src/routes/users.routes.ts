import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const userRouter = Router();

userRouter.post('/', async (req, res) => {
  try {
    const { name, password, email } = req.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ name, password, email });

    return res.json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default userRouter;
