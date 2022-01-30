import { User } from '../entities/User';

export interface IUserRepository {
  create (user: User): Promise<User>;
  exists (username: string): Promise<boolean>;
}
