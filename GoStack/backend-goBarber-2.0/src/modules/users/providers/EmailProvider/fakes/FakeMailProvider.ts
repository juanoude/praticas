import IMailProvider from '../models/IMailProvider';

interface IMessage {
  to: string;
  body: string;
  title: string;
}

class FakeMailProvider implements IMailProvider {
  private emails: IMessage[] = [];

  public async sendEmail(
    to: string,
    title: string,
    body: string
  ): Promise<void> {
    this.emails.push({
      to,
      title,
      body
    });
  }
}

export default FakeMailProvider;
