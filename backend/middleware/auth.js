import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const Auth = async (req, res, next) => {
  try {
    // First, try to get the token from the 'Authorization' header
    let token = null;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1]; // Extract the token from "Bearer <token>"
    }
    // If no token in 'Authorization' header, try 'token' header
    if (!token) {
      token = req.headers.token;
    }

    // If no token in headers, try query parameters
    if (!token) {
      token = req.query.token;
    }

    // If no token in query, try body parameters
    if (!token) {
      token = req.body.token;
    }
    // If no token is found in any of the sources
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
