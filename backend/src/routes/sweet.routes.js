import { Router } from "express";

import {
  addSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
} from "../controllers/sweet.controller.js";

import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = Router();

// Admin routes
router.post("/", verifyToken, isAdmin, addSweet);
router.put("/:id", verifyToken, isAdmin, updateSweet);
router.delete("/:id", verifyToken, isAdmin, deleteSweet);
router.post("/:id/restock", verifyToken, isAdmin, restockSweet);

// Public + User routes
// Public + User routes
router.get("/search", searchSweets);  // FIRST
router.get("/", getAllSweets);       // THEN this
router.post("/:id/purchase", verifyToken, purchaseSweet);


export default router;
