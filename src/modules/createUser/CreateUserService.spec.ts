import { IUser } from "../../entities/IUser";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserService } from "./CreateUserService";

describe("CreateUserService", () => {
  it("Should be able to create a new user", async () => {
    const usersRepositoryInMemory = new UsersRepositoryInMemory();
    const createUserService = new CreateUserService(usersRepositoryInMemory);

    const userData: IUser = {
      name: "Test Name",
      email: "test@test.com",
      username: "testusername",
    };

    const user = await createUserService.execute(userData);

    expect(user).toHaveProperty("id");
    expect(user.username).toBe(userData.username);
  });
});
