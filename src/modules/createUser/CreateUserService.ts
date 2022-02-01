import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepositories";
import { IUserDTO, UserDTO } from "../../dto/UserDTO";
import { ExistsUserError } from "../../errors/ExistsUserError";

export class CreateUserService {
  constructor(readonly usersRepository: IUsersRepository) {}

  async execute({ name, email, username }: IUserDTO) {
    const userAlreadyExists = await this.usersRepository.exists(username);

    if (userAlreadyExists) {
      throw new ExistsUserError("User already exists!");
    }

    const userToBeCreated = User.create({ name, email, username });
    const createdUser = await this.usersRepository.create(userToBeCreated);

    const userDTO = new UserDTO(createdUser);

    return userDTO as IUserDTO;
  }
}
