import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import AppError from '@shared/errors/AppError';
import FakeMailProvider from '../providers/EmailProvider/fakes/FakeMailProvider';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokenRepository: FakeUserTokenRepository;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmailService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokenRepository = new FakeUserTokenRepository();

    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokenRepository
    );
  });

  it('should be able to recover the password with a email', async () => {
    const sendEmail = jest.spyOn(fakeMailProvider, 'sendEmail');

    fakeUsersRepository.create({
      name: 'Joao da Silva',
      email: 'joao@silva.com',
      password: '123456'
    });

    await sendForgotPasswordEmailService.execute({
      email: 'joao@silva.com'
    });

    expect(sendEmail).toHaveBeenCalled();
  });

  it('should not be able to recover if the user does not exist', async () => {
    await expect(
      sendForgotPasswordEmailService.execute({ email: 'joao@silva.com' })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a token refering to the forgotten password', async () => {
    const generate = jest.spyOn(fakeUserTokenRepository, 'generate');

    fakeUsersRepository.create({
      name: 'Joao da Silva',
      email: 'joao@silva.com',
      password: '123456'
    });

    await sendForgotPasswordEmailService.execute({
      email: 'joao@silva.com'
    });

    expect(generate).toHaveBeenCalled();
  });
});
