import { Response, Request } from 'express';
import createUser from './services/CreateUser';

export function helloWorld(request: Request, response: Response) {
  const user = createUser({
    email: 'juanoude@hotmail.com',
    password: '123',
    techs: [
      'tech1', 
      'tech2', 
      'etc',
      {title: 'JavaScript', mastery: 100}
    ]
  });
  return response.json({ message: 'Hello World'});
}