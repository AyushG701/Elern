import express from "express";
import { Auth, isAdmin } from "../middleware/auth";
import { addLectures, createCourse } from "../controllers/adminController";
import { uploadFiles } from "../middleware/multer";
import { deleteCourse, deleteLecture } from "../controllers/courseController";

const router = express.Router();

router.post("/course/new", Auth, isAdmin, uploadFiles, createCourse);
router.post("/course/:id", Auth, isAdmin, uploadFiles, addLectures);
router.delete("/course/:id", Auth, isAdmin, deleteCourse);
router.delete("/lecture/:id", Auth, isAdmin, deleteLecture);

export default router;
