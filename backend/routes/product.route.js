import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller.js";

// =========================
// Middleware
// =========================
const validateProductFields = (req, res, next) => {
  const { name, price, image } = req.body;
  const errors = [];

  if (!name || typeof name !== "string" || name.trim() === "") {
    errors.push("Name is required and must be a non-empty string.");
  }
  if (price === undefined || price === null || isNaN(price) || Number(price) <= 0) {
    errors.push("Price is required and must be a valid positive number.");
  }
  if (!image || typeof image !== "string" || image.trim() === "") {
    errors.push("Image is required and must be a non-empty string.");
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: "Validation error", errors });
  }
  next();
};

// =========================
// Router Setup
// =========================
const router = express.Router();

// =========================
// Routes
// =========================

// Get all products
router.get("/", getAllProducts);

// Get a single product by ID
router.get("/:id", getProductById);

// Create a new product
router.post("/", validateProductFields, createProduct);

// Update a product by ID
router.put("/:id", validateProductFields, updateProduct);

// Delete a product by ID
router.delete("/:id", deleteProduct);

// =========================
// Export
// =========================
export default router;  