import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  private usersRepository: IUsersRepository;

  private userTokenRepository: IUserTokenRepository;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,

    @inject('UserTokenRepository')
    userTokenRepository: IUserTokenRepository
  ) {
    this.usersRepository = usersRepository;
    this.userTokenRepository = userTokenRepository;
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

    user.password = password;

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
