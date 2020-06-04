import { Request, Response } from 'express';
import { hash } from 'bcryptjs';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, password, email } = req.body;

      const createUserService = container.resolve(CreateUserService);

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
  }
}

export default UserController;
