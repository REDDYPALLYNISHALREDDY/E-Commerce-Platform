const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.protect = async (req, res, next) => {
  try {
    console.log("========== AUTH DEBUG ==========");
    console.log("Cookies:", req.cookies);

    let token;

    if (req.cookies.token) {
      token = req.cookies.token;
      console.log("Token from Cookie:", token);
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      console.log("Token from Header:", token);
    }

    if (!token) {
      console.log("❌ No Token Found");

      return res.status(401).json({
        success: false,
        message: "Not Authorized. Token Missing",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded Token:", decoded);

    const user = await User.findById(decoded.id);

    console.log("User Found:", user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User Not Found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("AUTH ERROR:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

exports.admin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin Access Only",
    });
  }

  next();
};