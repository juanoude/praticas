import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindProvidersDTO from '@modules/users/dtos/IFindProvidersDTO';
import { uuid } from 'uuidv4';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findProviders({
    except_user_id
  }: IFindProvidersDTO): Promise<User[]> {
    let providers = this.users;

    if (except_user_id) {
      providers = this.users.filter(user => user.id !== except_user_id);
    }

    return providers;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const existsEmail = this.users.find(user => user.email === email);

    return existsEmail;
  }

  public async findById(id: string): Promise<User | undefined> {
    const existsId = this.users.find(user => user.id === id);

    return existsId;
  }

  public async create({
    name,
    email,
    password
  }: ICreateUserDTO): Promise<User> {
    const createdUser = new User();

    Object.assign(createdUser, {
      id: uuid(),
      name,
      email,
      password
    });

    this.users.push(createdUser);

    return createdUser;
  }

  public async save(user: User): Promise<User> {
    const index = this.users.findIndex(
      userFromArray => userFromArray.id === user.id
    );
    this.users[index] = user;

    return user;
  }
}

export default FakeUsersRepository;
