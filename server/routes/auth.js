import express from "express";
import { signup, signin, google } from "../controllers/auth.js";

const router = express.Router();

// Create a user
router.post("/signup", signup);
// Sign in
router.post("/signin", signin);
// Google auth
router.post("/google", google);

export default router;
