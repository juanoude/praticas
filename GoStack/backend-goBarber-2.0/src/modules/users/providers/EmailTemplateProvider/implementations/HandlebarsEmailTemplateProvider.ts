import handlebars from 'handlebars';
import fs from 'fs';

import IEmailTemplateProvider from '../models/IEmailTemplateProvider';
import IParseEmailTemplateDTO from '../dtos/IParseEmailTemplateDTO';

class HandlebarsEmailTemplateProvider implements IEmailTemplateProvider {
  public async parse({
    file,
    variables
  }: IParseEmailTemplateDTO): Promise<string> {
    const template = await fs.promises.readFile(file, {
      encoding: 'utf-8'
    });

    const parseTemplate = await handlebars.compile(template);

    return parseTemplate(variables);
  }
}

export default HandlebarsEmailTemplateProvider;
