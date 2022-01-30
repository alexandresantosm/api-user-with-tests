import { IUser } from '../entities/IUser';
import { User } from '../entities/User';

export interface IUsersRepository {
  create (user: User): Promise<IUser>;
  exists (username: string): Promise<boolean>;
}
