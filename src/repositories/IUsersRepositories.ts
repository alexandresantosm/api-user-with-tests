import { User } from '../entities/User';

export interface IUsersRepository {
  create (user: User): Promise<User>;
  exists (username: string): Promise<boolean>;
}
