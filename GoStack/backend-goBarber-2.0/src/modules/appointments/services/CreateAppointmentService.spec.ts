import 'reflect-metadata';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

import AppError from '@shared/errors/AppError';

describe('CreateAppointment', () => {
  it('should be able to create a new Appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository
    );

    const createdAppointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '1y12b3'
    });

    expect(createdAppointment).toHaveProperty('id');
    expect(createdAppointment).toHaveProperty('date');
    expect(createdAppointment.provider_id).toBe('1y12b3');
  });

  it('should not be able to create two Appointments at the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository
    );

    const appointmentDate = new Date();

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '1y12b3'
    });

    expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: '1y12b2'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
