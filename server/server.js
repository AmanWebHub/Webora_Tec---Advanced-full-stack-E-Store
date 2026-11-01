import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";

import authRoutes from "./routes/authRoute.js";
import productRoutes from "./routes/productRoute.js";

import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();

  console.log(`Server running http://localhost:${PORT}`);
});
