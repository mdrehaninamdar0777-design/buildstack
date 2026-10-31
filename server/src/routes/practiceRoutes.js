import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  getPracticeQuestions,
  getPracticeQuestionById,
  submitPracticeAnswer,
  getPracticeHistory,
} from "../controllers/practiceController.js";

const router = Router();

router.use(verifyToken);

router.get("/", getPracticeQuestions);
router.get("/my/history", getPracticeHistory);
router.get("/:id", getPracticeQuestionById);
router.post("/:id/submit", submitPracticeAnswer);

export default router;
