import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  enrollRoadmap,
  unenrollRoadmap,
  getMyRoadmaps,
  toggleLesson,
} from "../controllers/roadmapController.js";

const router = Router();

/**
 * @route   GET /api/roadmaps/my
 * @desc    Get all roadmaps the authenticated user is enrolled in
 * @access  Protected
 */
router.get("/my", verifyToken, getMyRoadmaps);

/**
 * @route   POST /api/roadmaps/:id/enroll
 * @desc    Enroll the user in a roadmap
 * @access  Protected
 */
router.post("/:id/enroll", verifyToken, enrollRoadmap);

/**
 * @route   DELETE /api/roadmaps/:id/enroll
 * @desc    Unenroll the user from a roadmap
 * @access  Protected
 */
router.delete("/:id/enroll", verifyToken, unenrollRoadmap);

/**
 * @route   POST /api/roadmaps/:id/lessons/:lessonId/toggle
 * @desc    Toggle completion of a lesson in a roadmap
 * @access  Protected
 */
router.post("/:id/lessons/:lessonId/toggle", verifyToken, toggleLesson);

export default router;
