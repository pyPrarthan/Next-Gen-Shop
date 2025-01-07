import Product from "../models/product.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("error in fetching products:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export const createProduct = async (req, res) => {
  const product = req.body; //user will send this data

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .send({ success: false, message: "name, price and image are required" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("error in creating product:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Product Id" });
  }

  try {
    const updatedProcuct = await Product.findByIdAndUpdate(productId, product, {
      new: true,
    }); //update the product
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProcuct,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "Product not found" });
  }
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Product Id" });
  }

  try {
    await Product.findByIdAndDelete(productId);
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(404).json({ success: false, message: "Product not found" });
  }
};