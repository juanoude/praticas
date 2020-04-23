import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';

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
      throw new Error('This email/password combination is invalid!');
    }

    const validPassword = await compare(password, user.password);

    if (!validPassword) {
      throw new Error('This email/password combination is invalid!');
    }

    const token = sign({}, 'secretInMd5', {
      expiresIn: '1d',
      subject: user.id
    });

    return {
      user,
      token
    };
  }
}

export default CreateSessionService;
