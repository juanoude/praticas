import { container } from 'tsyringe';
import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IMailProvider from '@modules/users/providers/EmailProvider/models/IMailProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
