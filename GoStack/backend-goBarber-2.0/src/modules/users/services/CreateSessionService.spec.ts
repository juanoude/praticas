import 'reflect-metadata';
import CreateSessionService from '@modules/users/services/CreateSessionService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

describe('CreateSessionService', () => {
  it('should be able to authenticate', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider
    );
    const createSessionService = new CreateSessionService(
      fakeUserRepository,
      fakeHashProvider
    );

    await createUserService.execute({
      name: 'João Borrão',
      email: 'joao@borrao.com',
      password: '123456'
    });

    const userAuth = await createSessionService.execute({
      email: 'joao@borrao.com',
      password: '123456'
    });

    expect(userAuth).toHaveProperty('user');
    expect(userAuth).toHaveProperty('token');
  });

  it('should not be able to authenticate a nonexistent user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createSessionService = new CreateSessionService(
      fakeUserRepository,
      fakeHashProvider
    );

    expect(
      createSessionService.execute({
        email: 'joao@borrao.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider
    );
    const createSessionService = new CreateSessionService(
      fakeUserRepository,
      fakeHashProvider
    );

    await createUserService.execute({
      name: 'João Borrão',
      email: 'joao@borrao.com',
      password: '123456'
    });

    expect(
      createSessionService.execute({
        email: 'joao@borrao.com',
        password: '123467'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
