import request from "supertest";
import app from "../app.js";
import { prisma } from "../prismaClient.js";


describe("Auth API", () => {
  beforeAll(async () => {
    await prisma.user.deleteMany(); // clean table before test
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test("User registration works", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "testuser",
        email: "test@example.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message");
  });

  test("User login returns token", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@example.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
