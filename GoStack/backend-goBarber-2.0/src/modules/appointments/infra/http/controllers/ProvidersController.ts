import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

class ProvidersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const providersService = container.resolve(ListProvidersService);

    const providers = await providersService.execute(id);

    return res.json(providers);
  }
}

export default ProvidersController;
