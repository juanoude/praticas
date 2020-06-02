import { Router } from 'express';
import { hash } from 'bcryptjs';
import multer from 'multer';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';

const upload = multer(uploadConfig);
const userRouter = Router();

userRouter.post('/', async (req, res) => {
  try {
    const usersRepository = new UsersRepository();

    const { name, password, email } = req.body;

    const createUserService = new CreateUserService(usersRepository);

    const hashedPassword = await hash(password, 8);

    const user = await createUserService.execute({
      name,
      password: hashedPassword,
      email
    });

    delete user.password;

    return res.json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

userRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    const usersRepository = new UsersRepository();

    const updateUserAvatarService = new UpdateUserAvatarService(
      usersRepository
    );

    const user = await updateUserAvatarService.execute({
      user_id: req.user.id,
      avatarFilename: req.file.filename
    });

    delete user.password;

    console.log(req.file);
    return res.json(user);
  }
);

export default userRouter;
