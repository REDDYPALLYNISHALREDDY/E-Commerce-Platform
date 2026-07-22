const express = require("express");

const router = express.Router();

const { createOrder, getOrders } = require("../controllers/order.controller");

const { protect } = require("../middleware/auth.middleware");

router.post("/", protect, createOrder);

router.get("/", protect, getOrders);

module.exports = router;