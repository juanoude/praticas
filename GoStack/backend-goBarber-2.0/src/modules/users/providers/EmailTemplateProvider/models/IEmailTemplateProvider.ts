import IParseEmailTemplateDTO from '../dtos/IParseEmailTemplateDTO';

export default interface IEmailInterfaceProvider {
  parse(data: IParseEmailTemplateDTO): Promise<string>;
}
