import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import { syncUser, getMe, updateMe } from "../controllers/userController.js";

const router = Router();

/**
 * @route   POST /api/users/sync
 * @desc    Create or retrieve the authenticated user's MongoDB profile
 * @access  Protected (requires valid Firebase ID token)
 */
router.post("/sync", verifyToken, syncUser);

/**
 * @route   GET /api/users/me
 * @desc    Return the authenticated user's profile
 * @access  Protected
 */
router.get("/me", verifyToken, getMe);

/**
 * @route   PUT /api/users/me
 * @desc    Update allowed fields on the authenticated user's profile
 * @access  Protected
 */
router.put("/me", verifyToken, updateMe);

export default router;
