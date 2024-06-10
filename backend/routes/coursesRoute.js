import express from "express";
import {
  checkout,
  fetchLecture,
  fetchLectures,
  getAllCourse,
  getMyCourses,
  getSingleCourse,
  paymentVerification,
} from "../controllers/courseController.js";
import { Auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/course/all", getAllCourse);
router.get("/course/:id", getSingleCourse);
router.get("/lectures/:id", Auth, fetchLectures);
router.get("/lecture/:id", Auth, fetchLecture);
router.get("/mycourse", Auth, getMyCourses);
// router.post("/course/checkout/:id", Auth, esewaCheckout);
// router.post("/verification/:id", Auth, esewaPaymentVerification);
router.post("/course/checkout/:id", Auth, checkout);
router.post("/verification/:id", Auth, paymentVerification);

export default router;
