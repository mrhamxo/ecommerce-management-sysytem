const app = require("./app");
const cloudinary = require("cloudinary");
const connectDB = require("./config/database");
const dotenv = require("dotenv");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting Down Server due to Uncaught Exception`);

  process.exit(1);
});

// config dotenv
dotenv.config({ path: "backend/config/config.env" });

// connecting to mongoDB
connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting Down Server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
