import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import TryCatch from "../middleware/TryCatch.js";

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

// as we repeat the try catch many times so we can do in this form
export const verifyUser = TryCatch(async (req, res) => {
  const { otp, activationToken } = req.body;
  const verify = jwt.verify(activationToken, process.env.Activation_Secret);

  if (!verify) {
    return res.status(400).json({ message: "OTP expired valid time 5 min" });
  }
  if (verify.otp !== otp) {
    return res.status(400).json({ message: "Invalid otp" });
  }
  await User.create({
    name: verify.user.name,
    email: verify.user.email,
    password: verify.user.password,
  });
  res.status(200).json({ message: "User registered successfully" });
});

export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user)
    return res.status(400).json({ message: "No User with this email" });

  //pass match
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid password" });

  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SEC, {
    expiresIn: "2d",
  });

  res
    .status(200)
    .json({ message: `Login Successfull ${user.name}`, token, user });
});

export const myUserProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({ user });
});
