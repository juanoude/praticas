import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

class MonthAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { month, year } = req.query;

    const { provider_id } = req.params;

    const listProviderAvailabilityService = container.resolve(
      ListProviderMonthAvailabilityService
    );

    const availabilityList = await listProviderAvailabilityService.execute({
      provider_id,
      month: Number(month),
      year: Number(year)
    });

    return res.json(availabilityList);
  }
}

export default MonthAvailabilityController;
