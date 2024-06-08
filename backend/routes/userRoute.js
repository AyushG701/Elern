import express from "express";
import {
  loginUser,
  myUserProfile,
  register,
  resendOtp,
  verifyUser,
} from "../controllers/userController.js";
import { Auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/user/register", register);
router.post("/user/verify", verifyUser);
router.post("/user/resendOtp", resendOtp);
router.post("/user/login", loginUser);
router.get("/user/userprofile", Auth, myUserProfile);
export default router;
