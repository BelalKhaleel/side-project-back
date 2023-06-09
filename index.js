import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./database/db.js";
import cors from "cors";
import adminRoutes from "./src/routes/admin.js";
import productRoutes from "./src/routes/product.js";
import categoryRoutes from "./src/routes/category.js";
import upload from "./src/middleware/image-upload.js";

dotenv.config();

await connectDB();

const PORT = process.env.PORT || 5001;

const app = new express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("uploads"));

app.use(cors());

app.use("/api/admin", adminRoutes);
app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);

app.get("/", (req, res) => {
  res.send("API is running ...");
});

app.listen(
  PORT,
  console.log(`Server Running in ${process.env.NODE_ENV} mode on PORT ${PORT}`)
);
