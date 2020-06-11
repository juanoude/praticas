import { getRepository, Repository, Raw } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepositories';
import { ICreateAppointmentDTO } from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindMonthlyAppointmentsDTO from '@modules/users/dtos/IFindMonthlyAppointmentsDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const existsDateAppointment = await this.ormRepository.findOne({
      where: {
        date
      }
    });

    return existsDateAppointment;
  }

  public async create({
    provider_id,
    date
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });
    await this.ormRepository.save(appointment);
    return appointment;
  }

  public async findMonthlyAppointments({
    provider_id,
    month,
    year
  }: IFindMonthlyAppointmentsDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');

    const monthAppointments = this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(date => `to_char(${date}, MM-YYYY) = ${parsedMonth}-${year}`)
      }
    });

    return monthAppointments;
  }
}

export default AppointmentsRepository;
