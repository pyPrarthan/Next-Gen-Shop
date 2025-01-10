import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRoute from "./routes/productRoute.js"; // Ensure this name matches the import

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// Enable CORS
app.use(cors());

// Basic route to test server
app.get("/", (req, res) => {
  res.send("Server is ready");
});

// Middleware to parse JSON data
app.use(express.json());

// API Routes
app.use("/api/products", productRoute); // Use the correct route name

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Start server and connect to the database
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port http://localhost:${PORT}`);
});
