import { inject, injectable } from 'tsyringe';
import { getDate, getDaysInMonth } from 'date-fns';
import IAppointmentsRepository from '../repositories/IAppointmentsRepositories';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  availability: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    month,
    year
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findMonthlyAppointments(
      {
        provider_id,
        month,
        year
      }
    );

    const monthDaysTotal = getDaysInMonth(new Date(year, month - 1));

    const monthDaysArray = Array.from(
      { length: monthDaysTotal },
      (value, index) => index + 1
    );

    const monthAvailability = monthDaysArray.map(day => {
      const appointmentsOnDay = appointments.filter(
        appointment => getDate(appointment.date) === day
      );

      return {
        day,
        availability: appointmentsOnDay.length < 10
      };
    });

    return monthAvailability;
  }
}

export default ListProviderMonthAvailabilityService;
