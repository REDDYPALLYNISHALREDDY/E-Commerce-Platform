require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

// Trust Render's reverse proxy
app.set("trust proxy", 1);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on Port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();