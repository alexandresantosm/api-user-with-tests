import { prisma } from '../../database/client';
import { IUser } from '../../entities/IUser';
import { User } from '../../entities/User';

import { IUsersRepository } from '../IUsersRepositories';

export class PrismaUsersRepository implements IUsersRepository {

  async create ({ name, username, email }: IUser) : Promise<User> {
    const newUser = prisma.user.create({
      data: {
        name,
        username,
        email,
      }
    });

    return newUser;
  }

  async exists (username: string): Promise<boolean> {
    const userExists = await prisma.user.findUnique({
      where: {
        username,
      }
    });

    const isUserExists = !!userExists;

    return isUserExists;
  }

}
