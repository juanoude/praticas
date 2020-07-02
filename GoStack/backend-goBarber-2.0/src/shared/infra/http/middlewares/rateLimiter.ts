import { RateLimiterRedis } from 'rate-limiter-flexible';
import { Request, Response } from 'express';
import redis from 'redis';
import AppError from '@shared/errors/AppError';

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS || undefined,
  enable_offline_queue: false
});

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 5,
  duration: 5
});

async function rateLimiterMiddleware(req: Request, res: Response, next) {
  try {
    await rateLimiter.consume(req.ip);
    return next();
  } catch (err) {
    throw new AppError('Too many requests', 429);
  }
}

export default rateLimiterMiddleware;
