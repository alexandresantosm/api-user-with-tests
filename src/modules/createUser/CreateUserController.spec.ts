/**
 * @jest-environment ./prisma/prisma-environment-jest.js
 */

import request from "supertest";

import { app } from "../../app";
import { IUser } from "../../entities/IUser";

describe("CreateUserController", () => {
  it("Should be able to create a new user", async () => {
    const user: IUser = {
      email: "testintegration@test.com.br",
      name: "Test Integration",
      username: "testintegration",
    };

    const response = await request(app).post("/users").send(user);
    const { statusCode, body } = response;

    expect(statusCode).toBe(200);
    expect(body).toHaveProperty("id");
  });
});
