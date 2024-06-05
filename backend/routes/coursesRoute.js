import express from "express";
import {
  fetchLectures,
  getAllCourse,
  getSingleCourse,
} from "../controllers/courseController";
import { Auth } from "../middleware/auth";

const router = express.Router();

router.get("/course/all", getAllCourse);
router.get("/course/:id", getSingleCourse);
router.get("/lectures/:id", Auth, fetchLectures);

export default router;
