import IHashProvider from '../models/IHashProvider';

class FakeHashProvider implements IHashProvider {
  public async compareHash(password: string, hashed: string): Promise<boolean> {
    return password === hashed;
  }

  public async generateHash(password: string): Promise<string> {
    return password;
  }
}

export default FakeHashProvider;
