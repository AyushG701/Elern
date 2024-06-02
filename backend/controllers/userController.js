import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists." });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    user = {
      name,
      email,
      password: hashPassword,
    };

    const otp = Math.floor(Math.random() * 100000);
    const activationToken = jwt.sign(
      {
        user,
        opt,
      },
      process.env.Activation_Secret,
      {
        expiresIn: "1h",
      },
    );
    const data = {
      name,
      otp,
    };
    await sendMail(email, "E learning", data);

    res.status(200).json({
      message: "OTP send to your mail",
      activationToken,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
