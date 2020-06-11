import { getRepository, Repository, Not } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindProvidersDTO from '@modules/users/dtos/IFindProvidersDTO';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findProviders({
    except_user_id
  }: IFindProvidersDTO): Promise<User[]> {
    let providers: User[];

    if (except_user_id) {
      providers = await this.ormRepository.find({
        where: {
          id: Not(except_user_id)
        }
      });
    } else {
      providers = await this.ormRepository.find();
    }

    return providers;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email
      }
    });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        id
      }
    });

    return user;
  }

  public async create({
    name,
    email,
    password
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({ name, email, password });
    await this.ormRepository.save(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    const savedUser = await this.ormRepository.save(user);
    return savedUser;
  }
}

export default UsersRepository;
