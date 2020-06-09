import IEmailTemplateProvider from '../models/IEmailTemplateProvider';
import IParseEmailTemplateDTO from '../dtos/IParseEmailTemplateDTO';

class FakeMailTemplateProvider implements IEmailTemplateProvider {
  public async parse({ template }: IParseEmailTemplateDTO): Promise<string> {
    return template;
  }
}

export default FakeMailTemplateProvider;
