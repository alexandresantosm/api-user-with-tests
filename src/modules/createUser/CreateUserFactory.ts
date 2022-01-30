import { PrismaUsersRepository } from '../../repositories/prisma/PrismaUsersRepository';
import { CreateUserController } from './CreateUserController';
import { CreateUserService } from './CreateUserService';

export const createUserFactory = () => {
  const usersRepository = new PrismaUsersRepository();
  const createUserService = new CreateUserService(usersRepository);
  const createUserController = new CreateUserController(createUserService);

  return createUserController;
}
