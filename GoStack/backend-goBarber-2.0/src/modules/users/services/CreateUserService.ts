import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  password: string;
  email: string;
}

class CreateUserService {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  public async execute({ name, password, email }: IRequest): Promise<User> {
    const validEmail = await this.usersRepository.findByEmail(email);

    if (validEmail) {
      throw new AppError('This Email is already being used!', 409);
    }

    const user = await this.usersRepository.create({
      name,
      password,
      email
    });

    return user;
  }
}

export default CreateUserService;
