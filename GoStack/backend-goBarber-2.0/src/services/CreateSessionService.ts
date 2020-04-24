import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: {
        email
      }
    });

    if (!user) {
      throw new AppError('This email/password combination is invalid!', 401);
    }

    const validPassword = await compare(password, user.password);

    if (!validPassword) {
      throw new AppError('This email/password combination is invalid!', 401);
    }

    const { expiresIn, secret } = authConfig.jwt;

    const token = sign({}, secret, {
      expiresIn,
      subject: user.id
    });

    return {
      user,
      token
    };
  }
}

export default CreateSessionService;
