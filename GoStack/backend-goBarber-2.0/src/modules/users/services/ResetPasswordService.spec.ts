import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokenRepository = new FakeUserTokenRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokenRepository,
      fakeHashProvider
    );
  });

  it('should be able to reset the password', async () => {
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    const user = await fakeUsersRepository.create({
      name: 'Joao da Silva',
      email: 'joao@silva.com',
      password: '123456'
    });

    const { token } = await fakeUserTokenRepository.generate(user.id);

    await resetPasswordService.execute({
      token,
      password: '123123'
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updatedUser?.password).toBe('123123');
  });

  it('should not be able to reset the password with a nonexisting token', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'nonexistent',
        password: '123777'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with a nonexistent user', async () => {
    const { token } = await fakeUserTokenRepository.generate('nonexitent');

    await expect(
      resetPasswordService.execute({ token, password: '123123' })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset a password with a token generated from more than 2 hours ago', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Joao da Silva',
      email: 'joao@silva.com',
      password: '123456'
    });

    const { token } = await fakeUserTokenRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        token,
        password: '123123'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
