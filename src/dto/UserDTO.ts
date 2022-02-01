import { IUser } from "../entities/IUser";

export interface IUserDTO {
  name: string;
  username: string;
  email: string;
}

export class UserDTO {
  constructor(user: IUser) {
    return {
      ...user,
      createdAt: user.createdAt?.toLocaleDateString(),
      updatedAt: user.updatedAt?.toLocaleDateString(),
    };
  }
}
