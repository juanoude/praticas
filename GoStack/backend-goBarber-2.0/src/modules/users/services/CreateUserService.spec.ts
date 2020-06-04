import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';

describe('CreateUserService', () => {
  it('should be able to create a new User', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const createUserService = new CreateUserService(fakeUserRepository);

    const user = await createUserService.execute({
      name: 'Jonh Doe',
      password: '123456',
      email: 'jonhdoe@doe.com'
    });

    expect(user).toHaveProperty('id');
    expect(user.password).toBe('123456');
  });

  it('should not allow a new User with a already existing email', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const createUserService = new CreateUserService(fakeUserRepository);

    await createUserService.execute({
      name: 'João Borrão',
      password: '123456',
      email: 'joao@borrao.com'
    });

    expect(
      createUserService.execute({
        name: 'João Borrão',
        password: '123456',
        email: 'joao@borrao.com'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
