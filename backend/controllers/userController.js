import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import TryCatch from "../middleware/TryCatch.js";
import sendMail from "../middleware/sendMail.js";
import { PendingUser } from "../models/pendingUserModel.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists." });
    }

    // for pending user
    let pendingUser = await PendingUser.findOne({ email });
    if (pendingUser) {
      return res
        .status(400)
        .json({ msg: "OTP already sent. Please check your email." });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(Math.random() * 100000)
      .toString()
      .padStart(5, "0");
    const otpExpiry = new Date(Date.now() + 5 * 60000); // 5 minutes
    const activationToken = jwt.sign(
      {
        name,
        email,
        otp,
      },
      process.env.Activation_Secret,
      {
        expiresIn: "1d",
      },
    );
    pendingUser = new PendingUser({
      name,
      email,
      password: hashPassword,
      otp,
      otpExpiry,
    });
    await pendingUser.save();
    const data = {
      name,
      otp,
    };
    await sendMail(email, "E learning", data);

    res.status(200).json({
      message: "OTP send to your mail",
      activationToken,
      otp,
    });
  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({ message: error.message });
  }
};

// as we repeat the try catch many times so we can do in this form
export const verifyUser = TryCatch(async (req, res) => {
  const { otp, activationToken } = req.body;
  console.log(otp);
  let verify;
  try {
    verify = jwt.verify(activationToken, process.env.Activation_Secret);
    console.log(verify);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Invalid or expired activation token." });
  }

  const pendingUser = await PendingUser.findOne({ email: verify.email, otp });
  if (
    !pendingUser ||
    pendingUser.otp !== otp ||
    pendingUser.otpExpiry < Date.now()
  ) {
    return res.status(400).json({ message: "Invalid or expired OTP." });
  }

  await User.create({
    name: verify.name,
    email: verify.email,
    password: pendingUser.password,
    verified: false, // Initial verification status
  });

  await PendingUser.deleteOne({ email: verify.email }); // Remove from temporary collection

  res.status(200).json({ message: "User registered successfully" });
});

// resend the otp function
export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user by email
    const pendingUser = await PendingUser.findOne({ email });
    if (!pendingUser) {
      return res
        .status(400)
        .json({ message: "No pending registration found." });
    }

    // Check if the OTP has already been sent recently (e.g., within 5 minutes)
    const now = new Date();
    if (pendingUser.otpExpiry && pendingUser.otpExpiry > now) {
      const timeLeft = (pendingUser.otpExpiry - now) / 1000; // in seconds
      return res.status(429).json({
        message: `Please wait ${Math.ceil(
          timeLeft,
        )} seconds before requesting a new OTP.`,
      });
    }

    // Generate a new OTP
    const otp = Math.floor(Math.random() * 100000)
      .toString()
      .padStart(5, "0");

    // Generate a new activation token

    const otpExpiry = new Date(now.getTime() + 5 * 60000); // 5 minutes from now

    const activationToken = jwt.sign(
      { name: pendingUser.name, email, otp },
      process.env.Activation_Secret,
      { expiresIn: "1h" },
    );

    // Send the new OTP via email
    const data = { name: pendingUser.name, otp };
    await sendMail(email, "Resend OTP - E-learning", data);

    // Update the user record with the new OTP and expiry time (e.g., 5 minutes from now)
    pendingUser.otp = otp;
    pendingUser.otpExpiry = otpExpiry;
    pendingUser.activationToken = activationToken;
    await pendingUser.save();

    res.status(200).json({
      message: "OTP resent to your email",
      activationToken,
      otp,
    });
  } catch (error) {
    console.error("Error resending OTP:", error);
    res.status(500).json({ message: error.message });
  }
};

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
