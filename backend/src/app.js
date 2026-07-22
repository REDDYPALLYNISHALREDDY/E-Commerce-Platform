const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const authRoutes = require("./routes/auth.routes");

const errorMiddleware = require("./middleware/error.middleware");

const categoryRoutes = require("./routes/category.routes");

const productRoutes = require("./routes/product.routes");

const orderRoutes = require("./routes/order.routes");

const dashboardRoutes = require("./routes/dashboard.routes");

const wishlistRoutes = require("./routes/wishlist.routes");

const path = require("path");

const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/categories", categoryRoutes);

app.use("/api/v1/products", productRoutes);

app.use("/api/v1/orders", orderRoutes);

app.use("/api/v1/dashboard", dashboardRoutes);

app.use("/api/v1/wishlist", wishlistRoutes);

// Test Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "E-Commerce Backend API Running Successfully"
    });
});

app.use(errorMiddleware);

app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

module.exports = app;