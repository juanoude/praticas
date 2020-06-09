import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';

import IEmailTemplateProvider from '@modules/users/providers/EmailTemplateProvider/models/IEmailTemplateProvider';
import IMailProvider from '@modules/users/providers/EmailProvider/models/IMailProvider';

import ISendMailDTO from '@modules/users/providers/EmailProvider/dtos/ISendMailDTO';

@injectable()
class EtherealMailProvider implements IMailProvider {
  private transporter: Transporter;

  constructor(
    @inject('EmailTemplateProvider')
    private emailTemplateProvider: IEmailTemplateProvider
  ) {
    nodemailer.createTestAccount((err, account) => {
      if (err) {
        console.error(`Failed to create a testing account.${err.message}`);
        return process.exit(1);
      }

      this.transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      });
    });
  }

  public async sendEmail({
    to,
    from,
    subject,
    templateData
  }: ISendMailDTO): Promise<void> {
    const message = {
      from: {
        name: from?.name || 'Equipe GoBarber',
        address: from?.email || 'equipe@gobarber.com'
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await this.emailTemplateProvider.parse(templateData)
    };

    const info = await this.transporter.sendMail(message);

    console.log('message sent: %s', info.messageId);
    console.log('message URL: %s', nodemailer.getTestMessageUrl(info));
  }
}

export default EtherealMailProvider;
