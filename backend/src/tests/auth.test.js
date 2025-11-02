import request from "supertest";
import app from "../app.js";
import { prisma } from "../prismaClient.js";

describe("Auth API", () => {
  beforeAll(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  const userData = {
    name: "testuser",
    email: "test@example.com",
    password: "password123",
  };

  test("User registration works", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send(userData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message");
    expect(res.body.user).toHaveProperty("email", userData.email);
  });

  test("Duplicate email should fail", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send(userData);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  test("User login returns token", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: userData.email,
        password: userData.password,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  test("Login with wrong password fails", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: userData.email,
        password: "wrongpass",
      });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error");
  });

  test("Protected route requires token (POST /api/sweets)", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .send({
        name: "Temp Sweet",
        category: "Test",
        price: 10,
        quantity: 1,
      });

    // without Authorization header it should reject (401)
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("message", "No token provided");
  });
});
