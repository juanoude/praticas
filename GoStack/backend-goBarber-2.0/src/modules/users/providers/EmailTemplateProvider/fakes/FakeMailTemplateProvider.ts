import IEmailTemplateProvider from '../models/IEmailTemplateProvider';
import IParseEmailTemplateDTO from '../dtos/IParseEmailTemplateDTO';

class FakeMailTemplateProvider implements IEmailTemplateProvider {
  public async parse({ file }: IParseEmailTemplateDTO): Promise<string> {
    return 'Mail Content';
  }
}

export default FakeMailTemplateProvider;
