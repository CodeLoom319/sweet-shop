import request from "supertest";
import bcrypt from "bcryptjs";
import app from "../app.js";
import { prisma } from "../prismaClient.js";

let adminToken;
let userToken;
let sweetId;

beforeAll(async () => {
  await prisma.sweet.deleteMany();
  await prisma.user.deleteMany();

  // Create Admin
  const adminPass = await bcrypt.hash("Admin@123", 10);
  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@test.com",
      password: adminPass,
      role: "ADMIN"
    },
  });

  // Create User
  const userPass = await bcrypt.hash("User@123", 10);
  await prisma.user.create({
    data: {
      name: "User",
      email: "user@test.com",
      password: userPass,
      role: "USER"
    },
  });

  // Login Admin
  const adminRes = await request(app).post("/api/auth/login").send({
    email: "admin@test.com",
    password: "Admin@123",
  });
  adminToken = adminRes.body.token;

  // Login User
  const userRes = await request(app).post("/api/auth/login").send({
    email: "user@test.com",
    password: "User@123",
  });
  userToken = userRes.body.token;

  // Create Sweet with stock = 5
  const sweet = await prisma.sweet.create({
    data: {
      name: "Ladoo",
      category: "Indian",
      price: 10,
      quantity: 5
    }
  });

  sweetId = sweet.id;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Inventory Management (Purchase & Restock)", () => {

  test("User can purchase a sweet (quantity decreases)", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe(4); 
  });

  test("Purchase fails if sweet is out of stock", async () => {
   
    await prisma.sweet.update({
      where: { id: sweetId },
      data: { quantity: 0 }
    });

    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Out of stock");
  });

  test("Admin can restock sweets", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ amount: 10 });

    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe(10); 
  });

});
