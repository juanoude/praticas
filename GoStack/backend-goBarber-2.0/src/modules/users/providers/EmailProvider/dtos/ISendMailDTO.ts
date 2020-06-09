import IParseEmailTemplateDTO from '@modules/users/providers/EmailTemplateProvider/dtos/IParseEmailTemplateDTO';

interface IMailContact {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseEmailTemplateDTO;
}
