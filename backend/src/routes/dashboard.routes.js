const express = require("express");

const router = express.Router();

const { protect, admin } = require("../middleware/auth.middleware");

const {
    getDashboardStats,
} = require("../controllers/dashboard.controller");

router.get("/", protect, admin, getDashboardStats);

module.exports = router;