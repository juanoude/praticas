import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@modules/users/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute(user_id: string): Promise<User[]> {
    let providers = await this.cacheProvider.recover<User[]>(
      `provider-list:${user_id}`
    );

    if (!providers) {
      providers = await this.usersRepository.findProviders({
        except_user_id: user_id
      });

      await this.cacheProvider.save(
        `provider-list:${user_id}`,
        classToClass(providers)
      );
    }

    return providers;
  }
}

export default ListProvidersService;
