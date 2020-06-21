import Redis, { Redis as RedisType } from 'ioredis';
import cacheConfig from '@config/cache';
import ICacheProvider from '../models/ICacheProvider';

class RedisCacheProvider implements ICacheProvider {
  private client: RedisType;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
    console.log('foi');
  }

  public async save(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
  }

  public async recover(key: string): Promise<string | null> {
    const cache = await this.client.get(key);

    return cache;
  }

  public async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }
}

export default RedisCacheProvider;
