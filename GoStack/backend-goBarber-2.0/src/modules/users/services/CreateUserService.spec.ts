import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider
    );
  });
  it('should be able to create a new User', async () => {
    const user = await createUserService.execute({
      name: 'Jonh Doe',
      password: '123456',
      email: 'jonhdoe@doe.com'
    });

    expect(user).toHaveProperty('id');
    expect(user.password).toBe('123456');
  });

  it('should not allow a new User with a already existing email', async () => {
    await createUserService.execute({
      name: 'João Borrão',
      password: '123456',
      email: 'joao@borrao.com'
    });

    await expect(
      createUserService.execute({
        name: 'João Borrão',
        password: '123456',
        email: 'joao@borrao.com'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
