import express from "express";

const router = express.Router();

router.post("/courses/verify", verifyUser);

export default router;
