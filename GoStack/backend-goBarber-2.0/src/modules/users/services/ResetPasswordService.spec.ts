import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let resetPasswordService: ResetPasswordService;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokenRepository = new FakeUserTokenRepository();

    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokenRepository
    );
  });

  it('should be able to reset the password', async () => {
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

    expect(updatedUser?.password).toBe('123123');
  });
});
