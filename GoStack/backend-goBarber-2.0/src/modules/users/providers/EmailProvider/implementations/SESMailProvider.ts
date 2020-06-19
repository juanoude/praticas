import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';
import aws from 'aws-sdk';

import mailConfig from '@config/mail';

import IEmailTemplateProvider from '@modules/users/providers/EmailTemplateProvider/models/IEmailTemplateProvider';
import IMailProvider from '@modules/users/providers/EmailProvider/models/IMailProvider';

import ISendMailDTO from '@modules/users/providers/EmailProvider/dtos/ISendMailDTO';
import { template } from 'handlebars';

@injectable()
class SESMailProvider implements IMailProvider {
  private transporter: Transporter;

  constructor(
    @inject('EmailTemplateProvider')
    private emailTemplateProvider: IEmailTemplateProvider
  ) {
    this.transporter = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: 'us-east-1'
      })
    });
  }

  public async sendEmail({
    to,
    subject,
    templateData
  }: ISendMailDTO): Promise<void> {
    const { name, email } = mailConfig.defaults.from;
    this.transporter.sendMail({
      from: {
        name,
        address: email
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await this.emailTemplateProvider.parse(templateData)
    });
  }
}

export default SESMailProvider;
