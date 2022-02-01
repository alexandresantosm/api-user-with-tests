import { v4 as uuid } from "uuid";

import { IUser } from "../../entities/IUser";
import { IUsersRepository } from "../IUsersRepositories";

export class UsersRepositoryInMemory implements IUsersRepository {
  private users: Array<IUser> = [];

  async create(user: IUser): Promise<IUser> {
    Object.assign(user, {
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.users = [...this.users, user];

    return user;
  }

  async exists(username: string): Promise<boolean> {
    const isUserExists = this.users.some((user) => user.username === username);

    return isUserExists;
  }
}
