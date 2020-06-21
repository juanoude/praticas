import { container } from 'tsyringe';
import RedisCacheProvider from './implementations/RedisCacheProvider';

container.registerSingleton('CacheProvider', RedisCacheProvider);
