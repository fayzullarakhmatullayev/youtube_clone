import express from "express";
import {
  addVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  addView,
  random,
  trend,
  sub,
  getByTag,
  search,
} from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// Create a video
router.post("/", verifyToken, addVideo);
// Update a video
router.put("/:id", verifyToken, updateVideo);
// Delete a video
router.delete("/:id", verifyToken, deleteVideo);
// Get a video
router.get("/find/:id", getVideo);
// Get a video view
router.put("/view/:id", addView);
// Get trend videos
router.get("/trend", trend);
// Get random videos
router.get("/random", random);
// Get subscribed videos
router.get("/sub", verifyToken, sub);
// Get tagged videos
router.get("/tags", verifyToken, getByTag);
// Serach videos by title
router.get("/search", verifyToken, search);

export default router;
