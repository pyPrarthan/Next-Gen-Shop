import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import productRoute from "./routes/productRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// Basic test route to check server status
app.get("/", (req, res) => {
  res.send("Server is ready");
});

// Middleware to parse JSON data
app.use(express.json());

// API routes
app.use("/api/products", productRoute);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  // Serve static files from the frontend build directory
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  // Serve the index.html for any unmatched routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Start server and connect to the database
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port http://localhost:${PORT}`);
});
