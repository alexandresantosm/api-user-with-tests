import { User } from '../../entities/User';
import { IUsersRepository } from '../../repositories/IUsersRepositories';
import { IUserDTO } from '../../dto/IUserDTO';

export class CreateUserService {
  constructor (readonly usersRepository: IUsersRepository) {};

  async execute ({ name, email, username }: IUserDTO) {
    const userAlreadyExists = await this.usersRepository.exists(username);

    if (userAlreadyExists) {
      throw new Error('User already exists!');
    }

    const userToBeCreated = User.create({ name, email, username });
    const createdUser = await this.usersRepository.create(userToBeCreated);

    return createdUser;
  }
}
