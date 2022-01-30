import { Request, Response, Router } from 'express';
import { createUserFactory } from '../modules/createUser/CreateUserFactory';

const routes = Router();

routes.post('/users', (request: Request, response: Response | any) =>
  createUserFactory().handle(request, response)
);

export { routes };
