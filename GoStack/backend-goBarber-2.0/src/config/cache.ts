import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  driver: 'redis';
  config: {
    redis: RedisOptions;
  };
}

export default {
  driver: process.env.CACHE_DRIVER,
  config: {
    redis: {
      host: 'localhost',
      port: 6379,
      password: undefined
    }
  }
} as ICacheConfig;
