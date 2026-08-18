import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://product-store-ln3g.onrender.com",
    ],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.use("/api/products", productRoutes);

app.listen(PORT, async () => {
  console.log(`Server started on port ${PORT}`);
  await connectDB();
});