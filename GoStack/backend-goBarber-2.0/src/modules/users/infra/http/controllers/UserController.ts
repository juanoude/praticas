import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';

class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, password, email } = req.body;

      const createUserService = container.resolve(CreateUserService);

      const user = await createUserService.execute({
        name,
        password,
        email
      });

      return res.json(classToClass(user));
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default UserController;
