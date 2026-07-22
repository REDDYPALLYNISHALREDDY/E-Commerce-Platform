const Wishlist = require("../models/wishlist.model");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

// Add to Wishlist
exports.addToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  const exists = await Wishlist.findOne({
    user: req.user._id,
    product: productId,
  });

  if (exists) {
    throw new ApiError("Already in wishlist", 400);
  }

  const wishlist = await Wishlist.create({
    user: req.user._id,
    product: productId,
  });

  res.status(201).json({
    success: true,
    message: "Added to wishlist",
    wishlist,
  });
});

// Get Wishlist
exports.getWishlist = asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.find({
    user: req.user._id,
  }).populate("product");

  res.status(200).json({
    success: true,
    wishlist,
  });
});

// Remove from Wishlist
exports.removeWishlist = asyncHandler(async (req, res) => {
  await Wishlist.findOneAndDelete({
    user: req.user._id,
    product: req.params.productId,
  });

  res.status(200).json({
    success: true,
    message: "Removed from wishlist",
  });
});