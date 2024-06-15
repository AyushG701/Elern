import TryCatch from "../middleware/TryCatch.js";
import { Courses } from "../models/coursesModel.js";
import { Lecture } from "../models/lectureModel.js";
import { User } from "../models/userModel.js";
import { instance } from "../index.js";
// for payment
import crypto from "crypto";
// import { EsewaPayment } from "../models/paymentModel.js";
// import fetch from "node-fetch";

// for razorpay
import { Payment } from "../models/razorpayModel.js";

export const getAllCourse = TryCatch(async (req, res) => {
  const courses = await Courses.find();
  res.json({
    courses,
  });
});

export const getSingleCourse = TryCatch(async (req, res) => {
  const courseId = req.params.id; // Extracting course ID from request params
  try {
    const course = await Courses.findById(courseId); // Finding course by ID
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json({ course }); // Sending course data in response
  } catch (error) {
    // Handle any errors that occur during course retrieval
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export const fetchLectures = TryCatch(async (req, res) => {
  const lectures = await Lecture.find({ course: req.params.id });

  const user = await User.findById(req.user_id);

  if (user.role === "admin") {
    return res.json({ lectures });
  }

  if (!user.subscription.includes(req.params.id)) {
    return res.status(400).json({
      message: "You have not subscribed to this course",
    });
  }
  res.json({ lectures });
});

// fetchlecture  single one
export const fetchLecture = TryCatch(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);
  const user = await User.findById(req.user_id);

  if (user.role === "admin") {
    return res.json({ lecture });
  }

  if (!user.subscription.includes(req.params.id)) {
    return res.status(400).json({
      message: "You have not subscribed to this course",
    });
  }
  res.json({ lecture });
});

export const getMyCourses = TryCatch(async (req, res) => {
  const courses = await Courses.find({ _id: req.user.subscription });

  res.json({
    courses,
  });
});

// for payment

// export const esewaCheckout = TryCatch(async (req, res) => {
//   const user = await User.findById(req.user._id);
//   const course = await Courses.findById(req.params.id);

//   if (user.subscription.includes(course._id)) {
//     return res.status(400).json({
//       message: "You already have this course",
//     });
//   }

//   const amount = Number(course.price);
//   const transaction_uuid = crypto.randomUUID(); // Generate a unique ID

//   const paymentData = {
//     total_amount: amount,
//     transaction_uuid,
//     product_code: "EPAYTEST", // Use your actual product code
//     success_url: "https://yourdomain.com/payment-success", // Change to your success URL
//     failure_url: "https://yourdomain.com/payment-failure", // Change to your failure URL
//     signed_field_names: "total_amount,transaction_uuid,product_code",
//   };

//   const secretKey = process.env.ESEWA_SECRET_KEY; // Define your eSewa secret key in .env file
//   const signatureString = `total_amount=${amount},transaction_uuid=${transaction_uuid},product_code=${paymentData.product_code}`;
//   const signature = crypto
//     .createHmac("sha256", secretKey)
//     .update(signatureString)
//     .digest("base64");

//   const newPayment = new EsewaPayment({
//     esewa_order_id: transaction_uuid,
//     esewa_payment_id: null, // Will be updated after payment
//     esewa_signature: signature,
//     amount: amount,
//     transaction_uuid: transaction_uuid,
//     status: "PENDING",
//   });

//   await newPayment.save();

//   res.status(201).json({
//     paymentData,
//     signature,
//     payment_url: "https://rc-epay.esewa.com.np/api/epay/main/v2/form", // Use the test URL for UAT
//   });
// });

// export const esewaPaymentVerification = TryCatch(async (req, res) => {
//   const { transaction_uuid, total_amount, esewa_signature } = req.body;

//   const payment = await EsewaPayment.findOne({ transaction_uuid });

//   if (!payment) {
//     return res.status(404).json({ error: "Payment not found" });
//   }

//   const body = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${payment.product_code}`;
//   const secretKey = process.env.ESEWA_SECRET_KEY;

//   const expectedSignature = crypto
//     .createHmac("sha256", secretKey)
//     .update(body)
//     .digest("base64");

//   if (expectedSignature !== esewa_signature) {
//     payment.status = "FAILED";
//     await payment.save();
//     return res.status(400).json({ error: "Payment signature mismatch" });
//   }

//   payment.status = "COMPLETE";
//   payment.esewa_payment_id = req.body.transaction_code; // Use actual payment ID
//   await payment.save();

//   const user = await User.findById(req.user._id);
//   const course = await Courses.findById(req.params.id);

//   user.subscription.push(course._id);
//   await user.save();

//   res.status(200).json({
//     message: "Course Purchased Successfully",
//     payment,
//   });
// });

// export const esewaCheckPaymentStatus = TryCatch(async (req, res) => {
//   const { transaction_uuid } = req.params;

//   const payment = await EsewaPayment.findOne({ transaction_uuid });

//   if (!payment) {
//     return res.status(404).json({ error: "Payment not found" });
//   }

//   const response = await fetch(
//     `https://uat.esewa.com.np/api/epay/transaction/status/?product_code=${payment.product_code}&total_amount=${payment.total_amount}&transaction_uuid=${transaction_uuid}`,
//   );

//   const statusData = await response.json();

//   payment.status = statusData.status;
//   await payment.save();

//   res.json({ status: payment.status, payment });
// });

// using razorpay for payment

export const checkout = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);

  const course = await Courses.findById(req.params.id);

  if (user.subscription.includes(course._id)) {
    return res.status(400).json({
      message: "You already have this course",
    });
  }

  const options = {
    amount: Number(course.price * 100),
    currency: "INR",
  };

  const order = await instance.orders.create(options);

  res.status(201).json({
    order,
    course,
  });
});

export const paymentVerification = TryCatch(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.Razorpay_Secret)
    .update(body)
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    const user = await User.findById(req.user._id);

    const course = await Courses.findById(req.params.id);

    user.subscription.push(course._id);

    await user.save();

    res.status(200).json({
      message: "Course Purchased Successfully",
    });
  } else {
    return res.status(400).json({
      message: "Payment Failed",
    });
  }
});
