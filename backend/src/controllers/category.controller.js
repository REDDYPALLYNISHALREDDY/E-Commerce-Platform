const Category = require("../models/category.model");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

// =========================
// Create Category
// =========================
exports.createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    throw new ApiError("Category name is required", 400);
  }

  const categoryExists = await Category.findOne({ name });

  if (categoryExists) {
    throw new ApiError("Category already exists", 400);
  }

  const category = await Category.create({
    name,
    description,
  });

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    category,
  });
});

// =========================
// Get All Categories
// =========================
exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: categories.length,
    categories,
  });
});

// =========================
// Get Single Category
// =========================
exports.getCategoryById = asyncHandler(async (req, res) => {

  const category = await Category.findById(req.params.id);

  if (!category) {
    throw new ApiError("Category not found", 404);
  }

  res.status(200).json({
    success: true,
    category,
  });

});

// =========================
// Update Category
// =========================
exports.updateCategory = asyncHandler(async (req, res) => {

  const { name, description } = req.body;

  const category = await Category.findById(req.params.id);

  if (!category) {
    throw new ApiError("Category not found", 404);
  }

  category.name = name || category.name;
  category.description = description || category.description;

  await category.save();

  res.status(200).json({
    success: true,
    message: "Category updated successfully",
    category,
  });

});

// =========================
// Delete Category
// =========================
exports.deleteCategory = asyncHandler(async (req, res) => {

  const category = await Category.findById(req.params.id);

  if (!category) {
    throw new ApiError("Category not found", 404);
  }

  await category.deleteOne();

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });

});