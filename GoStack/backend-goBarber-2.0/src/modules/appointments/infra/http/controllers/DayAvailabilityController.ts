import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderDayAvaiabilityService from '@modules/appointments/services/ListProviderDayAvaiabilityService';

class DayAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { day, month, year } = req.query;

    const { provider_id } = req.params;

    const listProviderAvailabilityService = container.resolve(
      ListProviderDayAvaiabilityService
    );

    const availabilityList = await listProviderAvailabilityService.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year)
    });

    return res.json(availabilityList);
  }
}

export default DayAvailabilityController;
