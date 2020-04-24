import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    throw new AppError('JWT was not sent');
  }

  const [, token] = bearerToken.split(' ');

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);

    const { sub } = decodedToken as TokenPayload;

    req.user = {
      id: sub
    };

    console.log(decodedToken);
  } catch {
    throw new AppError('Invalid JWT', 401);
  }

  return next();
}
