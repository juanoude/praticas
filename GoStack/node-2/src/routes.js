import { Router } from 'express';

import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  
  let user = await User.create({
    name: "Juan Ananda",
    email: "juanoude@hotmail.com",
    password_hash: "123teste123"
  });
 
  return res.json(user);
});


export default routes;
