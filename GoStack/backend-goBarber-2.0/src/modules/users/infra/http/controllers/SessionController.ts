import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateSessionService from '@modules/users/services/CreateSessionService';
import { classToClass } from 'class-transformer';

class SessionController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const createSessionservice = container.resolve(CreateSessionService);

    const { user, token } = await createSessionservice.execute({
      email,
      password
    });

    delete user.password;

    return res.json({ user: classToClass(user), token });
  }
}

export default SessionController;
