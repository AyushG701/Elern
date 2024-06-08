import mongoose from "mongoose";

const pendingUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  activationToken: String,
  otp: {
    type: String,
  },
  otpExpiry: { Date },
  createdAt: { type: Date, default: Date.now, expires: 3600 }, // 1-hour TTL
});

export const PendingUser = mongoose.model("PendingUser", pendingUserSchema);
