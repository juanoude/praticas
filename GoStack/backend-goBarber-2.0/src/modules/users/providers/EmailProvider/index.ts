import { container } from 'tsyringe';
import mailConfig from '@config/mail';

import IMailProvider from '@modules/users/providers/EmailProvider/models/IMailProvider';

import EtherealMailProvider from '@modules/users/providers/EmailProvider/implementations/EtherealMailProvider';
import SESMailProvider from '@modules/users/providers/EmailProvider/implementations/SESMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider)
};

container.registerInstance<IMailProvider>(
  'SendMailProvider',
  providers[mailConfig.driver]
);
