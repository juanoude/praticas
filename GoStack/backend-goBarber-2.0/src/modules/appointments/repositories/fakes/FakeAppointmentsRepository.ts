import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear } from 'date-fns';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepositories';
import { ICreateAppointmentDTO } from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindMonthlyAppointmentsDTO from '@modules/users/dtos/IFindMonthlyAppointmentsDTO';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const existsDate = this.appointments.find(appointment =>
      isEqual(appointment.date, date)
    );

    return existsDate;
  }

  public async create({
    provider_id,
    date
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id });
    // appointment.id = uuid();
    // appointment.date = date;
    // appointment.provider_id = provider_id;

    this.appointments.push(appointment);
    return appointment;
  }

  public async findMonthlyAppointments({
    provider_id,
    month,
    year
  }: IFindMonthlyAppointmentsDTO): Promise<Appointment[]> {
    const monthAppointments = this.appointments.filter(appointment => {
      return (
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
      );
    });

    return monthAppointments;
  }
}

export default FakeAppointmentsRepository;
