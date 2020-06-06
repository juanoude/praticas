export default interface IMailProvider {
  sendEmail(to: string, title: string, body: string): Promise<void>;
}
