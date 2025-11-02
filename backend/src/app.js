import express from "express";
import cors from "cors";
import { prisma } from "./prismaClient.js";
import authRoutes from "./routes/auth.routes.js";
import sweetRoutes from "./routes/sweet.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Sweet Shop API is running " });
});

export default app;
