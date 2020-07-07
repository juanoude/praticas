import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import { classToClass } from 'class-transformer';

class ListProviderAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { day, month, year } = req.query;

    const provider_id = req.user.id;

    const providerAppointmentsService = container.resolve(
      ListProviderAppointmentsService
    );

    const providerAppointments = await providerAppointmentsService.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year)
    });

    return res.json(classToClass(providerAppointments));
  }
}

export default ListProviderAppointmentsController;
