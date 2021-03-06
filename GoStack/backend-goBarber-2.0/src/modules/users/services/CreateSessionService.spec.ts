import 'reflect-metadata';
import CreateSessionService from '@modules/users/services/CreateSessionService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createSessionService: CreateSessionService;

describe('CreateSessionService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createSessionService = new CreateSessionService(
      fakeUserRepository,
      fakeHashProvider
    );
  });
  it('should be able to authenticate', async () => {
    await fakeUserRepository.create({
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
    await expect(
      createSessionService.execute({
        email: 'joao@borrao.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await fakeUserRepository.create({
      name: 'João Borrão',
      email: 'joao@borrao.com',
      password: '123456'
    });

    await expect(
      createSessionService.execute({
        email: 'joao@borrao.com',
        password: '123467'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
