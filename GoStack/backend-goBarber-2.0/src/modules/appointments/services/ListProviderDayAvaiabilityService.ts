import { inject, injectable } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';
import IAppointmentsRepository from '../repositories/IAppointmentsRepositories';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  availability: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year
  }: IRequest): Promise<IResponse> {
    const dayAppointments = await this.appointmentsRepository.findDailyAppointments(
      {
        provider_id,
        day,
        month,
        year
      }
    );

    const presentDate = new Date(Date.now());

    console.log(presentDate);

    const hoursArray = Array.from({ length: 10 }, (v, index) => index + 8);

    const dayAvailability = hoursArray.map(hour => {
      const isNotAvaiable = dayAppointments.find(
        appointment => getHours(appointment.date) === hour
      );

      const isAfterBoolean = isAfter(
        presentDate,
        new Date(year, month - 1, day, hour)
      );

      return {
        hour,
        availability: !isNotAvaiable && !isAfterBoolean
      };
    });

    return dayAvailability;
  }
}

export default ListProviderDayAvailabilityService;
