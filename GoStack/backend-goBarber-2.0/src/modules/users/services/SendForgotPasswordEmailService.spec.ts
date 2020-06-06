import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import FakeMailProvider from '../providers/EmailProvider/fakes/FakeMailProvider';

describe('SendForgotPasswordEmailService', () => {
  it('should be able to recover the password with a email', () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendEmail = jest.spyOn(fakeMailProvider, 'sendEmail');

    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider
    );

    fakeUsersRepository.create({
      name: 'Joao da Silva',
      email: 'joao@silva.com',
      password: '123456'
    });

    sendForgotPasswordEmailService.execute({
      email: 'joao@silva.com'
    });

    expect(sendEmail).toHaveBeenCalled();
  });
});
