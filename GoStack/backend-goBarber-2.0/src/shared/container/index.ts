import { container } from 'tsyringe';
import '@modules/users/providers';
import './providers';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepositories';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';

container.registerSingleton<IAppointmentRepository>(
  'AppointmentsRepository',
  AppointmentsRepository
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UserTokenRepository
);
