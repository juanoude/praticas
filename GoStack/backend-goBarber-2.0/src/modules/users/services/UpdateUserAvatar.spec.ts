import 'reflect-metadata';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';

let fakeStorageProvider: FakeStorageProvider;
let fakeUsersRepository: FakeUsersRepository;
let updateUserAvatarService: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeStorageProvider = new FakeStorageProvider();
    fakeUsersRepository = new FakeUsersRepository();
    updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    );
  });
  it('should update the users avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Joao junior',
      email: 'joao@junior.com',
      password: '123456'
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'arquivo.jpg'
    });

    expect(user.avatar).toBe('arquivo.jpg');
  });

  it('should not update the users avatar if the user id is invalid', async () => {
    expect(
      updateUserAvatarService.execute({
        user_id: '123',
        avatarFilename: 'arquivo.jpg'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete an old avatar when updating to a new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'Joao junior',
      email: 'joao@junior.com',
      password: '123456'
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'arquivo.jpg'
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'arquivo2.jpg'
    });

    expect(deleteFile).toHaveBeenCalledWith('arquivo.jpg');
    expect(user.avatar).toBe('arquivo2.jpg');
  });
});
