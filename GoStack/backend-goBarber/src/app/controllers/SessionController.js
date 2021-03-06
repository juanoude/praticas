import jwt from 'jsonwebtoken';
import User from '../models/User';

import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
 
    const {email, password} = req.body;

    const user = await User.findOne({ where: { email }});

    if(!user) {
      return res.status(401).json({ error: 'User not found'});
    }

    const passwordMatch = await user.checkPassword(password);

    if(!passwordMatch) {
      return res.status(401).json({ error: 'Password not match'});
    }

    const { id, name } = user;

    return res.json({
      id,
      name,
      email,
      token: jwt.sign( { id }, authConfig.secret,
      {expiresIn: authConfig.expiresIn})
    });
    
  }
}

export default new SessionController();