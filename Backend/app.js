import "express-async-errors";
import express from "express";
import cors from "cors";
import "dotenv/config"; // 'dotenv'.config()
import { networkInterfaces } from "os";

import connectDB from "./src/config/mongoDB.js";
import connectCloudinary from "./src/config/cloudinary.js";

import userRouter from "./src/routes/userRoute.js";
import productRouter from "./src/routes/productRoute.js";
import cartRouter from "./src/routes/cartRoute.js";
import orderRouter from "./src/routes/orderRoute.js";

import notFound from "./src/middleware/not-found.js";
import errorHandler from "./src/middleware/error-handler.js";

// App Config
const app = express();
const port = process.env.PORT || 5000;
const url = process.env.MONGO_URI;
connectDB(url);
connectCloudinary();

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// api endpoints
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/order", orderRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Forever Store API");
});
app.use(notFound);
app.use(errorHandler);
// Listen on all network interfaces
app.listen(port, () => {
  console.log(`Server started on PORT: ${port}`);

  // Try to get the local IP address to display for the user
  // try {
  //   const nets = networkInterfaces();
  //   const results = {};

  //   for (const name of Object.keys(nets)) {
  //     for (const net of nets[name]) {
  //       // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
  //       if (net.family === 'IPv4' && !net.internal) {
  //         if (!results[name]) {
  //           results[name] = [];
  //         }
  //         results[name].push(net.address);
  //       }
  //     }
  //   }

  //   // Display all available IP addresses
  //   console.log('Available on your network at:');
  //   for (const [key, value] of Object.entries(results)) {
  //     for (const ip of value) {
  //       console.log(`http://${ip}:${port}`);
  //     }
  //   }
  // } catch (error) {
  //   console.log('Could not determine network addresses',error);
  // }
});
