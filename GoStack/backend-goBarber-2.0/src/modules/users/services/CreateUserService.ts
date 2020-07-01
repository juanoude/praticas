import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import ICacheProvider from '../providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  name: string;
  password: string;
  email: string;
}

@injectable()
class CreateUserService {
  private usersRepository: IUsersRepository;

  private hashProvider: IHashProvider;

  private cacheProvider: ICacheProvider;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,

    @inject('HashProvider')
    hashProvider: IHashProvider,

    @inject('CacheProvider')
    cacheProvider: ICacheProvider
  ) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
    this.cacheProvider = cacheProvider;
  }

  public async execute({ name, password, email }: IRequest): Promise<User> {
    const validEmail = await this.usersRepository.findByEmail(email);

    if (validEmail) {
      throw new AppError('This Email is already being used!', 409);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      password: hashedPassword,
      email
    });

    await this.cacheProvider.invalidatePrefix(`provider-list`);

    return user;
  }
}

export default CreateUserService;
