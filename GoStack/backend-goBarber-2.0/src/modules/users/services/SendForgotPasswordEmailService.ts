import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IMailProvider from '../providers/EmailProvider/models/IMailProvider';
import IUserTokenRepository from '../repositories/IUserTokenRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  private usersRepository: IUsersRepository;

  private mailProvider: IMailProvider;

  private userTokenRepository: IUserTokenRepository;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,

    @inject('SendMailProvider')
    mailProvider: IMailProvider,

    @inject('UserTokenRepository')
    userTokenRepository: IUserTokenRepository
  ) {
    this.usersRepository = usersRepository;
    this.mailProvider = mailProvider;
    this.userTokenRepository = userTokenRepository;
  }

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError(
        'Esse email não está cadastrado em nossa base de dados',
        401
      );
    }

    this.userTokenRepository.generate(user.id);

    await this.mailProvider.sendEmail(
      email,
      'Recuperação de senha',
      'Recupere sua senha nesse link:'
    );
  }
}

export default SendForgotPasswordEmailService;
