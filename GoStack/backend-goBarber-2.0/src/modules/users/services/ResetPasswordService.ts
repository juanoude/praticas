import { differenceInHours } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  private usersRepository: IUsersRepository;

  private userTokenRepository: IUserTokenRepository;

  private hashProvider: IHashProvider;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,

    @inject('UserTokenRepository')
    userTokenRepository: IUserTokenRepository,

    @inject('HashProvider')
    hashProvider: IHashProvider
  ) {
    this.usersRepository = usersRepository;
    this.userTokenRepository = userTokenRepository;
    this.hashProvider = hashProvider;
  }

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Token not found!', 401);
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User not Found!', 404);
    }

    const { created_at } = userToken;

    if (differenceInHours(Date.now(), created_at) > 2) {
      throw new AppError('Token expired');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
