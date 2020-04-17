import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointments: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointments = appointmentsRepository;
  }

  public execute({ provider, date }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    if (this.appointments.findByDate(appointmentDate)) {
      throw Error('This appointment is already booked');
    }

    const appointment = this.appointments.create({
      provider,
      date: appointmentDate
    });

    return appointment;
  }
}

export default CreateAppointmentService;
