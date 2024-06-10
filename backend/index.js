import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./Database/db.js";
import Razorpay from "razorpay";
import cors from "cors";

dotenv.config();

export const instance = new Razorpay({
  key_id: process.env.Razorpay_Key,
  key_secret: process.env.Razorpay_Secret,
});

const app = express();

// using middleware
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("SErver is running ");
});
// for multer
// to read file in uploads
app.use("/uploads", express.static("uploads"));

// importing routes
import userRoutes from "./routes/userRoute.js";
import coursesRoutes from "./routes/coursesRoute.js";
import adminRoutes from "./routes/adminRoute.js";

// using routes
app.use("/api", userRoutes);
app.use("/api", coursesRoutes);
app.use("/api", adminRoutes);

app.listen(5000, () => {
  console.log(`SErver is running on the port ${PORT}`);
  connectDb();
});
