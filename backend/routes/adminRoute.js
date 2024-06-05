import express from "express";
import { Auth, isAdmin } from "../middleware/auth";
import { addLectures, createCourse } from "../controllers/adminController";
import { uploadFiles } from "../middleware/multer";

const router = express.Router();

router.post("/course/new", Auth, isAdmin, uploadFiles, createCourse);
router.post("/course/:id", Auth, isAdmin, uploadFiles, addLectures);

export default router;
