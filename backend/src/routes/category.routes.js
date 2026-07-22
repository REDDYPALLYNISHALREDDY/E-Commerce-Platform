const express = require("express");

const router = express.Router();

const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

const {
  protect,
  admin,
} = require("../middleware/auth.middleware");

// Public Routes
router.get("/", getCategories);
router.get("/:id", getCategoryById);

// Admin Routes
router.post("/", protect, admin, createCategory);
router.put("/:id", protect, admin, updateCategory);
router.delete("/:id", protect, admin, deleteCategory);

module.exports = router;