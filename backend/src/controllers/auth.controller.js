const bcrypt = require("bcryptjs");

const User = require("../models/user.model");

const sendToken = require("../utils/sendToken");

const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

// =============================
// Register User
// =============================
exports.registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new ApiError(
            "Please fill all required fields",
            400
        );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(
            "Email already exists",
            400
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Assign role automatically
    const role =
        email.toLowerCase() === process.env.ADMIN_EMAIL.toLowerCase()
            ? "admin"
            : "user";

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
    });

    return sendToken(
        user,
        201,
        res,
        "User Registered Successfully"
    );

});

// =============================
// Login User
// =============================
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Find User
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    // Compare Password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    return sendToken(
        user,
        200,
        res,
        "Login Successful"
    );
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// =============================
// Logout
// =============================
exports.logoutUser = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  return res.status(200).json({
    success: true,
    message: "Logout Successful",
  });
};

exports.getCurrentUser = async (req, res) => {

    try{

        const user = await User.findById(req.user._id);

        return res.status(200).json({

            success:true,

            user

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,

            message:"Server Error"

        });

    }

}