import { getRepository } from 'typeorm';
import fs from 'fs';
import path from 'path';
import User from '../models/User';
import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: {
        id: user_id
      }
    });

    if (!user) {
      throw new AppError('The authentication is not valid', 401);
    }

    if (user.avatar) {
      const filePath = path.join(uploadConfig.directory, user.avatar);
      const existsAvatar = await fs.promises.stat(filePath);
      if (existsAvatar) {
        await fs.promises.unlink(filePath);
      }
    }

    user.avatar = avatarFilename;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
