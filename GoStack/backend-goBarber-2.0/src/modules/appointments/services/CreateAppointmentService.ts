import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepositories';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

interface IRequest {
  provider_id: string;
  date: Date;
  user_id: string;
}

@injectable()
class CreateAppointmentService {
  private appointmentsRepository: IAppointmentsRepository;

  private notificationsRepository: INotificationsRepository;

  constructor(
    @inject('AppointmentsRepository')
    appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    notificationsRepository: INotificationsRepository
  ) {
    this.appointmentsRepository = appointmentsRepository;
    this.notificationsRepository = notificationsRepository;
  }

  public async execute({
    provider_id,
    date,
    user_id
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("Can't create a past Date appointment");
    }

    if (provider_id === user_id) {
      throw new AppError('User and provider can not be the same!');
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError("Can't create a appointment before 8am and 5pm");
    }

    const appointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate
    );

    if (appointmentInSameDate) {
      throw new AppError('This appointment is already booked', 406);
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
      user_id
    });

    const formattedDate = format(
      appointmentDate,
      "dd/MM/yyyy 'às' HH:mm 'horas'"
    );

    const notification = await this.notificationsRepository.create({
      receiver_id: provider_id,
      content: `Novo agendamento para o dia ${formattedDate}`
    });

    return appointment;
  }
}

export default CreateAppointmentService;
