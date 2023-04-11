import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./database/db.js";
import adminRouter from "./routes/admin.js";
import cors from "cors";

dotenv.config();

await connectDB();

const PORT = process.env.PORT || 5001;

const app = new express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use("/api/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("API is running ...");
});

app.listen(
  PORT,
  console.log(`Server Running in ${process.env.NODE_ENV} mode on PORT ${PORT}`)
);
