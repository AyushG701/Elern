import express from "express";
import { getAllCourse, getSingleCourse } from "../controllers/courseController";

const router = express.Router();

router.get("/course/all", getAllCourse);
router.get("/course/:id", getSingleCourse);

export default router;
