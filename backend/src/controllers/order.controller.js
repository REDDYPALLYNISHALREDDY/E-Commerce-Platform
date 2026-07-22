const Order = require("../models/order.model");
const asyncHandler = require("../utils/asyncHandler");

exports.createOrder = asyncHandler(async (req, res) => {

  const order = await Order.create({

    ...req.body,

    user: req.user._id,

  });

  res.status(201).json({

    success: true,

    message: "Order placed successfully",

    order,

  });

});

exports.getOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find()
        .populate("user", "name email")
        .sort({ createdAt: -1 });

    res.status(200).json({

        success: true,

        orders,

    });

});