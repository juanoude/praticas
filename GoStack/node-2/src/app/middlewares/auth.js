import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import {promisify} from 'util';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader) {
    return res.status(401).json({error:'Token not provided'});
  }

  // const token = authHeader.split(' '); //token[1]
  // const [bearer, token] = authHeader.split(' '); //bearer e token
  const [, token] = authHeader.split(' '); //Apenas o token

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;
    
    return next();
  }catch(err) {
    return res.status(401).json({error: 'Token invalid'});
  }
}
