import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import { inject, injectable } from 'tsyringe';

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute(user_id: string): Promise<User[]> {
    const providers = this.usersRepository.findProviders({
      except_user_id: user_id
    });

    return providers;
  }
}

export default ListProvidersService;
