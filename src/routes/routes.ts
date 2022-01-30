import { Request, Response, Router } from 'express';

const routes = Router();

routes.get('/users', (request: Request, response: Response) =>
  response.status(200).send('Access users route.')
);

export { routes };
