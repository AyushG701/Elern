import express from "express";
import { Auth, isAdmin } from "../middleware/auth.js";
import { addLectures, createCourse } from "../controllers/adminController.js";
import { uploadFiles } from "../middleware/multer.js";
import {
  deleteCourse,
  deleteLecture,
} from "../controllers/courseController.js";

const router = express.Router();

router.post("/course/new", Auth, isAdmin, uploadFiles, createCourse);
router.post("/course/:id", Auth, isAdmin, uploadFiles, addLectures);
router.delete("/course/:id", Auth, isAdmin, deleteCourse);
router.delete("/lecture/:id", Auth, isAdmin, deleteLecture);

export default router;
