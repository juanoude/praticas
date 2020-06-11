import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe('ListProvidersService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProvidersService = new ListProvidersService(fakeUsersRepository);
  });

  it('should list all the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Jon Jones',
      email: 'jonbones@example.com',
      password: '123123'
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Jon Sena',
      email: 'jonsenas@example.com',
      password: '123123'
    });

    const provider = await fakeUsersRepository.create({
      name: 'Jon Walker',
      email: 'jonwalker@example.com',
      password: '123123'
    });

    const list = await listProvidersService.execute(provider.id);

    expect(list).toEqual([user1, user2]);
  });
});
