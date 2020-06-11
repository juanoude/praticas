import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

let appointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    appointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      appointmentsRepository
    );
  });
  it('should be able to list the month availability for the provider', async () => {
    await appointmentsRepository.create({
      provider_id: 'id',
      date: new Date(2020, 5, 14, 8, 0, 0)
    });

    await appointmentsRepository.create({
      provider_id: 'id',
      date: new Date(2020, 5, 14, 9, 0, 0)
    });

    await appointmentsRepository.create({
      provider_id: 'id',
      date: new Date(2020, 5, 14, 10, 0, 0)
    });

    await appointmentsRepository.create({
      provider_id: 'id',
      date: new Date(2020, 5, 14, 11, 0, 0)
    });

    await appointmentsRepository.create({
      provider_id: 'id',
      date: new Date(2020, 5, 14, 12, 0, 0)
    });

    await appointmentsRepository.create({
      provider_id: 'id',
      date: new Date(2020, 5, 14, 13, 0, 0)
    });

    await appointmentsRepository.create({
      provider_id: 'id',
      date: new Date(2020, 5, 14, 14, 0, 0)
    });

    await appointmentsRepository.create({
      provider_id: 'id',
      date: new Date(2020, 5, 14, 15, 0, 0)
    });

    await appointmentsRepository.create({
      provider_id: 'id',
      date: new Date(2020, 5, 14, 16, 0, 0)
    });

    await appointmentsRepository.create({
      provider_id: 'id',
      date: new Date(2020, 5, 14, 17, 0, 0)
    });

    await appointmentsRepository.create({
      provider_id: 'id',
      date: new Date(2020, 5, 15, 17, 0, 0)
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'id',
      month: 6,
      year: 2020
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 15, availability: true },
        { day: 14, availability: false }
      ])
    );
  });
});
