import { Repository, EntityRepository } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  private appointments: Appointment[];

  public async findByDate(date: Date): Promise<Appointment | null> {
    const existsDateAppointment = await this.findOne({
      where: {
        date
      }
    });

    return existsDateAppointment || null;
  }
}

export default AppointmentsRepository;
