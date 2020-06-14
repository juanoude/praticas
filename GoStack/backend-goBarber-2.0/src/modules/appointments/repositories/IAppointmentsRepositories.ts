import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import { ICreateAppointmentDTO } from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindMonthlyAppointmentsDTO from '@modules/appointments/dtos/IFindMonthlyAppointmentsDTO';
import IFindDailyAppointmentsDTO from '@modules/appointments/dtos/IFindDailyAppointmentsDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findMonthlyAppointments(
    data: IFindMonthlyAppointmentsDTO
  ): Promise<Appointment[]>;
  findDailyAppointments(
    data: IFindDailyAppointmentsDTO
  ): Promise<Appointment[]>;
}
