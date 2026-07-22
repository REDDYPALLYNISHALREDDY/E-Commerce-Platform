const express = require("express");

const router = express.Router();

const {
  addToWishlist,
  getWishlist,
  removeWishlist,
} = require("../controllers/wishlist.controller");

const { protect } = require("../middleware/auth.middleware");

router.post("/", protect, addToWishlist);

router.get("/", protect, getWishlist);

router.delete("/:productId", protect, removeWishlist);

module.exports = router;