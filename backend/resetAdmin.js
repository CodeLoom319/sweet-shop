import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function resetAdminPassword() {
  const newPassword = "Admin@123";
  const hashed = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { email: "admin@example.com" },
    data: { password: hashed },
  });

  console.log("Admin password reset to Admin@123");
}

resetAdminPassword()
  .catch((e) => console.error(e))
  .finally(async () => prisma.$disconnect());
