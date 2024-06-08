import express from "express";
import { Auth, isAdmin } from "../middleware/auth.js";
import {
  addLectures,
  createCourse,
  deleteCourse,
  deleteLecture,
  getAllStats,
} from "../controllers/adminController.js";
import { uploadFiles } from "../middleware/multer.js";

const router = express.Router();

router.post("/course/new", Auth, isAdmin, uploadFiles, createCourse);
router.post("/course/:id", Auth, isAdmin, uploadFiles, addLectures);
router.delete("/course/:id", Auth, isAdmin, deleteCourse);
router.delete("/lecture/:id", Auth, isAdmin, deleteLecture);
router.get("/stats", Auth, isAdmin, getAllStats);

export default router;
