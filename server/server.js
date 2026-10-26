import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

import { connectDB } from "./config/db.js";

import productModel from "./models/productModel.js";

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.get("/api/products", async (req, res) => {
  // Here you would typically fetch products from the database
  // For now, we'll just send a sample response
  try {
    const products = await productModel.find({});
    res.status(200).json({ success: true, data: products, message: "Products fetched successfully" });
  }
  catch (error) {
    console.error(error.message);
    res.status(404).json({ success: false, message: "Server error", error: error.message });
  }

});

app.post("/api/products", async (req, res) => {
  const product = req.body;

      if (!product.name || !product.price || !product.description || !product.image) {
        return res.status(404).json({ success: false, message: "All fields are required" });
      }

      const newProduct = new productModel(product);
      
      try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct, message: "Product created successfully" });
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
      }

})


app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, image, description } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(id, { name, price, description, image }, { new: true });
    res.status(200).json({ success: true, data: updatedProduct, message: `Product with ID ${id} updated successfully` });
  } catch (error) {
    console.error(error.message);
    res.status(404).json({ success: false, message: "Server error", error: error.message });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await productModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: `Product with ID ${id} deleted successfully` });
  } catch (error) {
    console.error(error.message);
    res.status(404).json({ success: false, message: "Server error", error: error.message });
  }
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running http://localhost:${PORT}`);
});
