import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import UpdateUserProfileService from '@modules/users/services/UpdateUserProfileService';

import AppError from '@shared/errors/AppError';

let hashProvider: FakeHashProvider;
let usersRepository: FakeUsersRepository;
let updateUserProfileService: UpdateUserProfileService;

describe('UpdateUserProfileService', () => {
  beforeEach(() => {
    hashProvider = new FakeHashProvider();
    usersRepository = new FakeUsersRepository();
    updateUserProfileService = new UpdateUserProfileService(
      usersRepository,
      hashProvider
    );
  });
  it('should update the user profile', async () => {
    const user = await usersRepository.create({
      name: 'Johny Walker',
      email: 'john@walker.com',
      password: '123456'
    });

    const updatedUser = await updateUserProfileService.execute({
      user_id: user.id,
      name: 'Jimmy Page',
      email: 'jimmypage@led.com'
    });

    expect(updatedUser.name).toBe('Jimmy Page');
    expect(updatedUser.email).toBe('jimmypage@led.com');
  });

  it('should not be able to update to an already used email', async () => {
    const user = await usersRepository.create({
      name: 'Johny Walker',
      email: 'john@walker.com',
      password: '123456'
    });

    await usersRepository.create({
      name: 'Jimmy Page',
      email: 'jimmypage@led.com',
      password: '123456'
    });

    await expect(
      updateUserProfileService.execute({
        user_id: user.id,
        name: 'Jimmy Page',
        email: 'jimmypage@led.com'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password passing the old one', async () => {
    const user = await usersRepository.create({
      name: 'Johny Walker',
      email: 'john@walker.com',
      password: '123456'
    });

    const updatedUser = await updateUserProfileService.execute({
      user_id: user.id,
      name: 'Jimmy Page',
      email: 'jimmypage@led.com',
      old_password: '123456',
      password: '123123'
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password whithout the old password', async () => {
    const user = await usersRepository.create({
      name: 'Johny Walker',
      email: 'john@walker.com',
      password: '123456'
    });

    await expect(
      updateUserProfileService.execute({
        user_id: user.id,
        name: 'Jimmy Page',
        email: 'jimmypage@led.com',
        password: '123123'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password whith wrong old password', async () => {
    const user = await usersRepository.create({
      name: 'Johny Walker',
      email: 'john@walker.com',
      password: '123456'
    });

    await expect(
      updateUserProfileService.execute({
        user_id: user.id,
        name: 'Jimmy Page',
        email: 'jimmypage@led.com',
        old_password: '123123',
        password: '123123'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update with a invalid user', async () => {
    await expect(
      updateUserProfileService.execute({
        user_id: 'nonexistant',
        name: 'Jimmy Page',
        email: 'jimmypage@led.com',
        password: '123123'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
