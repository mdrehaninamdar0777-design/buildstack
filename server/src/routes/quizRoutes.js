import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  getQuizzes,
  getQuizById,
  submitQuiz,
  getQuizAttempts,
} from "../controllers/quizController.js";

const router = Router();

router.use(verifyToken);

router.get("/", getQuizzes);
router.get("/:id", getQuizById);
router.post("/:id/submit", submitQuiz);
router.get("/:id/attempts", getQuizAttempts);

export default router;
