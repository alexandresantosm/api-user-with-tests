import { IUser } from "./IUser";

export class User {
  constructor({ name, username, email }: Readonly<IUser>) {
    return Object.assign(this, {
      name,
      username,
      email
    });
  }

  static create({ name, username, email }: IUser) {
    const user = new User({name, username, email});
    return user;
  }
}
