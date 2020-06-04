import { compare, hash } from 'bcryptjs';
import IHashProvider from '../models/IHashProvider';

class BCryptHashProvider implements IHashProvider {
  public async generateHash(password: string): Promise<string> {
    const hashedPassword = await hash(password, 8);

    return hashedPassword;
  }

  public async compareHash(password: string, hashed: string): Promise<boolean> {
    const isMatch = await compare(password, hashed);

    return isMatch;
  }
}

export default BCryptHashProvider;
