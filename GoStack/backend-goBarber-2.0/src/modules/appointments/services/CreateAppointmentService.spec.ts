import 'reflect-metadata';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';

import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;
let fakeNotificationsRepository: FakeNotificationsRepository;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository
    );
  });
  it('should be able to create a new Appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 15, 13).getTime();
    });

    const createdAppointment = await createAppointmentService.execute({
      date: new Date(2020, 5, 15, 14),
      provider_id: 'prestador',
      user_id: 'cliente'
    });

    expect(createdAppointment).toHaveProperty('id');
    expect(createdAppointment).toHaveProperty('date');
    expect(createdAppointment.provider_id).toBe('prestador');
  });

  it('should not be able to create two Appointments at the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 5, 15, 13).getTime();
    });

    const appointmentDate = new Date(2020, 5, 15, 14);

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: 'prestador',
      user_id: 'cliente'
    });

    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: 'prestador',
        user_id: 'cliente'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a past date appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 15, 13).getTime();
    });

    const appointmentDate = new Date(2020, 5, 15, 10);

    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: 'prestador',
        user_id: 'cliente'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a appointment with user and provider being the same', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 15, 13).getTime();
    });

    const appointmentDate = new Date(2020, 5, 15, 14);

    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: 'same_person',
        user_id: 'same_person'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a appointment before 8am and 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 15, 13).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 5, 16, 7),
        provider_id: 'provider',
        user_id: 'client'
      })
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 5, 16, 18),
        provider_id: 'provider',
        user_id: 'client'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
