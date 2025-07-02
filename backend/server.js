// =========================
// Imports & Config
// =========================
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import path from "path";

// =========================
// Environment Configuration
// =========================
dotenv.config({ path: "./.env" });

// =========================
// Database Connection
// =========================
connectDB();

// =========================
// App Initialization
// =========================
const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

// =========================
// Middleware
// =========================
app.use(express.json());
app.use(cors());

// =========================
// Routes
// =========================
app.get("/", (req, res) => {
  res.send("API is running");
});
app.use("/api/products", productRoutes);

// =========================
// Serve Frontend in Production
// =========================
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "frontend/dist")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
//   });
// }

// =========================
// Start Server
// =========================
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
