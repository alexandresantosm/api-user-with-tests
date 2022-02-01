import { IUser } from "../../entities/IUser";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserService } from "./CreateUserService";

describe("CreateUserService", () => {
  const makeSut = () => {
    const usersRepository = new UsersRepositoryInMemory();
    const createUserService = new CreateUserService(usersRepository);
    let userData: IUser = {} as IUser;

    return {
      createUserService,
      userData,
    };
  };

  it("Should be able to create a new user", async () => {
    let { userData, createUserService } = makeSut();

    userData = {
      name: "Test Name",
      email: "test@test.com",
      username: "testusername",
    };

    const user = await createUserService.execute(userData);

    expect(user).toHaveProperty("id");
    expect(user.username).toBe(userData.username);
  });

  it("Should not be able to create an existing user", async () => {
    let { userData, createUserService } = makeSut();

    userData = {
      name: "Test Existing Name",
      email: "testexisting@test.com",
      username: "testexistingusername",
    };

    await createUserService.execute(userData);

    await expect(createUserService.execute(userData)).rejects.toEqual(
      new Error("User already exists!")
    );
  });
});
