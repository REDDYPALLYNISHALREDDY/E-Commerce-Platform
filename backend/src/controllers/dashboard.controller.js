const Product = require("../models/product.model");
const User = require("../models/user.model");
const Order = require("../models/order.model");

const asyncHandler = require("../utils/asyncHandler");

exports.getDashboardStats = asyncHandler(async (req, res) => {

    const totalProducts = await Product.countDocuments();

    const totalUsers = await User.countDocuments();

    const totalOrders = await Order.countDocuments();

    const orders = await Order.find();

    const totalRevenue = orders.reduce(
        (acc, order) => acc + order.totalPrice,
        0
    );

    res.status(200).json({

        success: true,

        stats: {

            totalProducts,

            totalUsers,

            totalOrders,

            totalRevenue,

        },

    });

});