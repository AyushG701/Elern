import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./Database/db.js";

dotenv.config();

const app = express();

// using middleware
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("SErver is running ");
});

// importing routes
import userRoutes from "./routes/userRoute.js";

// using routes
app.use("/api", userRoutes);

app.listen(5000, () => {
  console.log(`SErver is running on the port ${PORT}`);
  connectDb();
});
