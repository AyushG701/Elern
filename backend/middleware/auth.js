import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const Auth = async (req, res, next) => {
  try {
    // const token = req.headers.token || req.query.token || req.body.token;
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({ message: "Please log in to your account" });
    }

    const token = authHeader.split(" ")[1]; // Extract the token from "Bearer <token>"

    if (!token) {
      res.status(403).json({
        message: "Please Login to your account",
      });
    }
    let decodedData;
    try {
      decodedData = jwt.verify(token, process.env.JWT_SEC);
    } catch (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    req.user = await User.findById(decodedData._id);
    if (!req.user) {
      return res.status(403).json({ message: "User not found" });
    }
    next();
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ message: "An error occurred" });
    }
  }
};

export const isAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(403).json({ message: "No user found" });
    }
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "You are not admin",
      });
    }
    next();
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ message: "An error occurred: " + error.message });
    }
  }
};
