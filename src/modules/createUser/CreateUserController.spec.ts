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
    expect(body.email).toBe(user.email);
  });

  it("Should not be able to create an existing user", async () => {
    const existUser: IUser = {
      email: "existusertestintegration@test.com.br",
      name: "Exist User Test Integration",
      username: "existusertestintegration",
    };

    await request(app).post("/users").send(existUser);
    const response = await request(app).post("/users").send(existUser);
    const { statusCode, body } = response;

    expect(statusCode).toBe(400);
    expect(body.message).toBe("User already exists!");
  });
});
