import { Router } from "express";

const router = Router();

/**
 * @route   GET /api/health
 * @desc    Health check endpoint returning minimal, secure status
 * @access  Public
 */
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "BuildStack API is running",
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
  });
});

export default router;
