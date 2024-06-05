import express from "express";
import {
  fetchLecture,
  fetchLectures,
  getAllCourse,
  getSingleCourse,
} from "../controllers/courseController";
import { Auth } from "../middleware/auth";

const router = express.Router();

router.get("/course/all", getAllCourse);
router.get("/course/:id", getSingleCourse);
router.get("/lectures/:id", Auth, fetchLectures);
router.get("/lecture/:id", Auth, fetchLecture);

export default router;
