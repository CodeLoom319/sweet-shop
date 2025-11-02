import request from "supertest";
import bcrypt from "bcryptjs";
import app from "../app.js";
import { prisma } from "../prismaClient.js";

let token;
let createdSweetId;

beforeAll(async () => {
  await prisma.sweet.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@test.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  const res = await request(app).post("/api/auth/login").send({
    email: "admin@test.com",
    password: "Admin@123",
  });

  token = res.body.token;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Sweets API", () => {
  test("Add a new sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Gulab Jamun",
        category: "Indian",
        price: 20,
        quantity: 50,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Gulab Jamun");
    createdSweetId = res.body.id;
  });

  test("Get all sweets", async () => {
    const res = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("Search sweets by name", async () => {
    const res = await request(app)
      .get("/api/sweets/search?name=Gulab")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body[0].name).toContain("Gulab");
  });

  test("Update sweet", async () => {
    const res = await request(app)
      .put(`/api/sweets/${createdSweetId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        price: 25,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(25);
  });

  test("Delete sweet (admin allowed)", async () => {
    const res = await request(app)
      .delete(`/api/sweets/${createdSweetId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });
});
