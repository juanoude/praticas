import 'reflect-metadata';
import CreateSessionService from '@modules/users/services/CreateSessionService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';

describe('CreateSessionService', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createSessionService = new CreateSessionService(fakeUsersRepository);
    const createUserService = new CreateUserService(fakeUsersRepository);

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
});
