import { Request, Response } from 'express';
import { CreateUserService } from './CreateUserService';

interface IUserRequest extends Request {
  body: {
    name: string;
    email: string;
    username: string;
  }
}

interface IUserResponse extends Response {
  body: {
    id: string;
    name: string;
    username: string;
    email: string;
    createdAt: Date;
    updateAt: Date;
  }
}

export class CreateUserController {
  constructor (readonly createUserService: CreateUserService) {}

  async handle (request: IUserRequest, response: IUserResponse) {
    const { name, email, username } = request.body;
    const newUser = await this.createUserService.execute({ name, email, username });

    return response.json(newUser);
  }
}
