import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateUserProfileService from '@modules/users/services/UpdateUserProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

class UserProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const userProfile = container.resolve(ShowProfileService);

    const user = await userProfile.execute(user_id);

    return res.json(classToClass(user));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { email, name, old_password, password } = req.body;

    const updateUser = container.resolve(UpdateUserProfileService);

    const user = await updateUser.execute({
      user_id,
      email,
      name,
      old_password,
      password
    });

    return res.json(classToClass(user));
  }
}

export default UserProfileController;
