import jwt from "jsonwebtoken";
import { User } from "../models/userModel";

export const Auth = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      res.status(403).json({
        message: "Please Login",
      });
    }
    const decodedData = jwt.verify(token, process.env.JWT_SEC);

    req.user = await User.findById(decodedData._id);
    next();
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
    });
  }
};
