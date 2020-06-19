import { container } from 'tsyringe';
import IEmailTemplateProvider from '@modules/users/providers/EmailTemplateProvider/models/IEmailTemplateProvider';
import HandlebarsEmailTemplateProvider from '@modules/users/providers/EmailTemplateProvider/implementations/HandlebarsEmailTemplateProvider';

container.registerSingleton<IEmailTemplateProvider>(
  'EmailTemplateProvider',
  HandlebarsEmailTemplateProvider
);
