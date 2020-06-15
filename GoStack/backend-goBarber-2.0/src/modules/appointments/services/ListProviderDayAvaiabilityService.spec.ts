import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvaiabilityService from '@modules/appointments/services/ListProviderDayAvaiabilityService';

let appointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvaiabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    appointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvaiabilityService(
      appointmentsRepository
    );
  });
  it('should be able to list the day availability for the provider', async () => {
    await appointmentsRepository.create({
      provider_id: 'id',
      user_id: 'id_2',
      date: new Date(2020, 5, 15, 11, 0, 0)
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const date = new Date(2020, 5, 15, 9, 45, 0);

      return date.getTime();
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'id',
      day: 15,
      month: 6,
      year: 2020
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 10, availability: true },
        { hour: 11, availability: false }
      ])
    );
  });

  it('should not be able to a past hour be available', async () => {
    await appointmentsRepository.create({
      provider_id: 'id',
      user_id: 'id_2',
      date: new Date(2020, 5, 15, 12, 0, 0)
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const date = new Date(2020, 5, 15, 10, 45, 0);

      return date.getTime();
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'id',
      day: 15,
      month: 6,
      year: 2020
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, availability: false },
        { hour: 9, availability: false },
        { hour: 10, availability: false },
        { hour: 11, availability: true },
        { hour: 12, availability: false },
        { hour: 13, availability: true },
        { hour: 14, availability: true }
      ])
    );
  });
});
