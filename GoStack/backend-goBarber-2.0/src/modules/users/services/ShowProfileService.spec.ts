import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ShowProfileService from '@modules/users/services/ShowProfileService';

import AppError from '@shared/errors/AppError';

let usersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('UpdateUserProfileService', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(usersRepository);
  });
  it('should show the user profile', async () => {
    const user = await usersRepository.create({
      name: 'Johny Walker',
      email: 'john@walker.com',
      password: '123456'
    });

    const profile = await showProfileService.execute(user.id);

    expect(profile.name).toBe('Johny Walker');
    expect(profile.email).toBe('john@walker.com');
  });

  it('should not be able to show the profile of a nonexitent user', async () => {
    await expect(
      showProfileService.execute('nonexistant')
    ).rejects.toBeInstanceOf(AppError);
  });
});
