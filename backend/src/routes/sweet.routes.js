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

/**
 * @route   POST /api/sweets
 * @desc    Add a new sweet to inventory
 * @access  Admin (requires token + admin role)
 */
router.post("/", verifyToken, isAdmin, addSweet);

/**
 * @route   PUT /api/sweets/:id
 * @desc    Update details of an existing sweet
 * @access  Admin (requires token + admin role)
 */
router.put("/:id", verifyToken, isAdmin, updateSweet);

/**
 * @route   DELETE /api/sweets/:id
 * @desc    Delete a sweet from inventory
 * @access  Admin (requires token + admin role)
 */
router.delete("/:id", verifyToken, isAdmin, deleteSweet);

/**
 * @route   POST /api/sweets/:id/restock
 * @desc    Increase stock quantity of a sweet
 * @access  Admin (requires token + admin role)
 */
router.post("/:id/restock", verifyToken, isAdmin, restockSweet);

/**
 * @route   GET /api/sweets/search?name=
 * @desc    Search sweets by name (public route)
 * @access  Public
 */
router.get("/search", searchSweets);

/**
 * @route   GET /api/sweets
 * @desc    Get all sweets (public)
 * @access  Public
 */
router.get("/", getAllSweets);

/**
 * @route   POST /api/sweets/:id/purchase
 * @desc    Purchase a sweet (reduces stock)
 * @access  User (requires token)
 */
router.post("/:id/purchase", verifyToken, purchaseSweet);

export default router;
