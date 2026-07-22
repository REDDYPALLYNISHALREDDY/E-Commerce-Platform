const Product = require("../models/product.model");
const Category = require("../models/category.model");

const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

// ===================================
// Create Product
// ===================================
exports.createProduct = asyncHandler(async (req, res) => {

    const {
        name,
        description,
        price,
        stock,
        brand,
        category,
    } = req.body;

    const imagePaths = [];

    if (req.files && req.files.length > 0) {
        req.files.forEach((file) => {
            imagePaths.push(`/uploads/${file.filename}`);
        });
    }

    if (
        !name ||
        !description ||
        !price ||
        !stock ||
        !category
    ) {
        throw new ApiError("Please fill all required fields", 400);
    }

    const categoryExists = await Category.findById(category);

    if (!categoryExists) {
        throw new ApiError("Category not found", 404);
    }

    const product = await Product.create({
        name,
        description,
        price,
        stock,
        brand,
        images: imagePaths,
        category,
        seller: req.user._id,
    });

    res.status(201).json({
        success: true,
        message: "Product created successfully",
        product,
    });

});

// ===================================
// Get All Products
// ===================================
exports.getProducts = asyncHandler(async (req, res) => {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;

    const skip = (page - 1) * limit;

    const filter = {};

    // Search
    if (req.query.keyword) {

        filter.name = {
            $regex: req.query.keyword,
            $options: "i",
        };

    }

    // Category Filter
    if (req.query.category) {

        filter.category = req.query.category;

    }

    // Price Filter
    if (req.query.minPrice || req.query.maxPrice) {

        filter.price = {};

        if (req.query.minPrice) {
            filter.price.$gte = Number(req.query.minPrice);
        }

        if (req.query.maxPrice) {
            filter.price.$lte = Number(req.query.maxPrice);
        }

    }

    const totalProducts = await Product.countDocuments(filter);

    const products = await Product.find(filter)
        .populate("category", "name")
        .populate("seller", "name email")
        .sort(req.query.sort || "-createdAt")
        .skip(skip)
        .limit(limit);

    res.status(200).json({

        success: true,

        page,

        totalPages: Math.ceil(totalProducts / limit),

        totalProducts,

        count: products.length,

        products,

    });

});


// Get Single Product
exports.getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate("category", "name")
    .populate("seller", "name email");

  if (!product) {
    throw new ApiError("Product not found", 404);
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Update Product
exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new ApiError("Product not found", 404);
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    product: updatedProduct,
  });
});

// Delete Product
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new ApiError("Product not found", 404);
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});