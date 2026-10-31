import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import { syncUser, getMe, updateMe, getDashboardStats } from "../controllers/userController.js";
import {
  getBookmarks,
  addBookmark,
  removeBookmark,
} from "../controllers/bookmarkController.js";

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
 * @route   GET /api/users/me/dashboard
 * @desc    Return the authenticated user's dashboard statistics & activity
 * @access  Protected
 */
router.get("/me/dashboard", verifyToken, getDashboardStats);

/**
 * @route   PUT /api/users/me
 * @desc    Update allowed fields on the authenticated user's profile
 * @access  Protected
 */
router.put("/me", verifyToken, updateMe);

/**
 * @route   GET /api/users/bookmarks
 * @desc    Retrieve all saved bookmarks for the authenticated user
 * @access  Protected
 */
router.get("/bookmarks", verifyToken, getBookmarks);

/**
 * @route   POST /api/users/bookmarks
 * @desc    Add a bookmark for the authenticated user
 * @access  Protected
 */
router.post("/bookmarks", verifyToken, addBookmark);

/**
 * @route   DELETE /api/users/bookmarks/:id
 * @desc    Remove a bookmark for the authenticated user
 * @access  Protected
 */
router.delete("/bookmarks/:id", verifyToken, removeBookmark);

export default router;
