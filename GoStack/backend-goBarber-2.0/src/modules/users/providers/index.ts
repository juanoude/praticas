import { container } from 'tsyringe';
import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IMailProvider from '@modules/users/providers/EmailProvider/models/IMailProvider';
import EtherealMailProvider from '@modules/users/providers/EmailProvider/implementations/EtherealMailProvider';
import IEmailTemplateProvider from '@modules/users/providers/EmailTemplateProvider/models/IEmailTemplateProvider';
import HandlebarsEmailTemplateProvider from '@modules/users/providers/EmailTemplateProvider/implementations/HandlebarsEmailTemplateProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

container.registerSingleton<IEmailTemplateProvider>(
  'EmailTemplateProvider',
  HandlebarsEmailTemplateProvider
);

container.registerInstance<IMailProvider>(
  'SendMailProvider',
  container.resolve(EtherealMailProvider)
);
