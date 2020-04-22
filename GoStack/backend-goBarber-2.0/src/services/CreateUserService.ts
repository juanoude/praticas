import { getRepository } from 'typeorm';
import User from '../models/User';

interface Request {
  name: string;
  password: string;
  email: string;
}

class CreateUserService {
  public async execute({ name, password, email }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const validEmail = await userRepository.findOne({
      where: {
        email
      }
    });

    if (validEmail) {
      throw new Error('This Email is already being used!');
    }

    const user = userRepository.create({
      name,
      password,
      email
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
