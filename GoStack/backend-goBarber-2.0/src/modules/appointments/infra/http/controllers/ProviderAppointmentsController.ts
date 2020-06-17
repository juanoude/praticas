import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

class ListProviderAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { day, month, year } = req.body;

    const provider_id = req.user.id;

    const providerAppointmentsService = container.resolve(
      ListProviderAppointmentsService
    );

    const providerAppointments = await providerAppointmentsService.execute({
      provider_id,
      day,
      month,
      year
    });

    return res.json(providerAppointments);
  }
}

export default ListProviderAppointmentsController;
