import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import IMailProvider from '../providers/EmailProvider/models/IMailProvider';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  private usersRepository: IUsersRepository;

  private mailProvider: IMailProvider;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,

    @inject('SendMailProvider')
    mailProvider: IMailProvider
  ) {
    this.usersRepository = usersRepository;
    this.mailProvider = mailProvider;
  }

  public async execute({ email }: IRequest): Promise<void> {
    await this.mailProvider.sendEmail(
      email,
      'Recuperação de senha',
      'Recupere sua senha nesse link:'
    );
  }
}

export default SendForgotPasswordEmailService;
