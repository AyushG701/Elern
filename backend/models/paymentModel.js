import mongoose from "mongoose";

const esewaSchema = new mongoose.Schema({
  esewa_order_id: {
    type: String,
    required: true,
  },
  esewa_payment_id: {
    type: String,
    required: true,
  },
  esewa_signature: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  transaction_uuid: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["PENDING", "COMPLETE", "FAILED"],
    default: "PENDING",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const EsewaPayment = mongoose.model("EsewaPayment", esewaSchema);
