import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUserService', () => {
  it('should be able to create a new User', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider
    );

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
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider
    );

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
