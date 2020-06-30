import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@modules/users/providers/CacheProvider/models/ICacheProvider';
import IAppointmentsRepository from '../repositories/IAppointmentsRepositories';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year
  }: IRequest): Promise<Appointment[]> {
    const cacheData = await this.cacheProvider.recover(
      `providers-appointments-${provider_id}-${day}-${month}-${year}`
    );

    console.log(cacheData);

    const dayAppointments = await this.appointmentsRepository.findDailyAppointments(
      {
        provider_id,
        day,
        month,
        year
      }
    );

    if (!cacheData) {
      await this.cacheProvider.save(
        `providers-appointments-${provider_id}-${day}-${month}-${year}`,
        JSON.stringify(dayAppointments)
      );
    }

    return dayAppointments;
  }
}

export default ListProviderAppointmentsService;
