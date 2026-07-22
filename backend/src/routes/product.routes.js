const express = require("express");

const router = express.Router();

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

const {
  protect,
  admin,
} = require("../middleware/auth.middleware");

const upload = require("../middleware/upload.middleware");

// ============================
// Public Routes
// ============================

// Get All Products
router.get("/", getProducts);

// Get Single Product
router.get("/:id", getProduct);

// ============================
// Admin Routes
// ============================

// Create Product
router.post("/", protect, admin, upload.array("images", 5), createProduct);

// Update Product
router.put("/:id", protect, admin, updateProduct);

// Delete Product
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;