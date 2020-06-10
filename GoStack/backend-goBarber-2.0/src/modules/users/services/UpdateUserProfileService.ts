import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IUserData {
  user_id: string;
  name: string;
  old_password?: string;
  password?: string;
  email: string;
}

@injectable()
class UpdateUserProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    user_id,
    email,
    name,
    old_password,
    password
  }: IUserData): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found!');
    }

    const isEmailUsed = await this.usersRepository.findByEmail(email);

    if (isEmailUsed && isEmailUsed.id !== user_id) {
      throw new AppError('This email is already beeing used by another user');
    }

    if (password && !old_password) {
      throw new AppError('Old password confirmation is necessary');
    }

    if (password && old_password) {
      const isMatch = await this.hashProvider.compareHash(
        old_password,
        user.password
      );

      if (!isMatch) {
        throw new AppError('Old password is incorrect!');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    user.name = name;
    user.email = email;

    return this.usersRepository.save(user);
  }
}

export default UpdateUserProfileService;
