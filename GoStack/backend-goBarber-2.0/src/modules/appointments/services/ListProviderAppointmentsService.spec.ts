import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import FakeCacheProvider from '@modules/users/providers/CacheProvider/fakes/FakeCacheProvider';

let appointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    appointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderAppointments = new ListProviderAppointmentsService(
      appointmentsRepository,
      fakeCacheProvider
    );
  });
  it('should be able to list the day appointments for the logged provider', async () => {
    const appointment1 = await appointmentsRepository.create({
      provider_id: 'id',
      user_id: 'id_2',
      date: new Date(2020, 5, 15, 11, 0, 0)
    });

    const appointment2 = await appointmentsRepository.create({
      provider_id: 'id',
      user_id: 'id_2',
      date: new Date(2020, 5, 15, 12, 0, 0)
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'id',
      day: 15,
      month: 6,
      year: 2020
    });

    expect(appointments).toEqual(
      expect.arrayContaining([appointment1, appointment2])
    );
  });
});
