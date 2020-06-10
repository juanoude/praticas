import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserProfileService from '@modules/users/services/UpdateUserProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

class UserProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const userProfile = container.resolve(ShowProfileService);

    const user = await userProfile.execute(user_id);

    delete user.password;

    return res.json(user);
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

    delete user.password;

    return res.json(user);
  }
}

export default UserProfileController;
