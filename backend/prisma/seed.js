import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.sweet.createMany({
    data: [
      { name: "Gulab Jamun", category: "Indian", price: 20, quantity: 10 },
      { name: "Rasgulla", category: "Indian", price: 25, quantity: 8 },
      { name: "Chocolate Bar", category: "Western", price: 50, quantity: 15 },
      { name: "Ladoo", category: "Indian", price: 15, quantity: 20 },
      { name: "Cupcake", category: "Bakery", price: 30, quantity: 12 }
    ],
  });

  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@example.com",
      password: "$2b$10$V7i7L/ljB7UpC9E8yM8HjOKD2kz2/kMkuqFvACCOJ0S9XWuW0An4m", // Admin@123
      role: "ADMIN"
    }
  });

  console.log(" Sweets & Admin Created!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
