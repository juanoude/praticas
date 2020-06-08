import IUserToken from '@modules/users/repositories/IUserTokenRepository';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import { getRepository, Repository } from 'typeorm';

class UserTokenRepository implements IUserToken {
  private userTokenRepository: Repository<UserToken>;

  constructor() {
    this.userTokenRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.userTokenRepository.findOne({
      where: { token }
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.userTokenRepository.create({
      user_id
    });

    this.userTokenRepository.save(userToken);

    return userToken;
  }
}

export default UserTokenRepository;
