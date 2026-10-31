import mongoose from "mongoose";

const { Schema } = mongoose;

const attemptAnswerSchema = new Schema(
  {
    questionId: { type: String, required: true },
    selectedIndex: { type: Number, required: true },
    correctIndex: { type: Number, required: true },
    isCorrect: { type: Boolean, required: true },
  },
  { _id: false }
);

const quizAttemptSchema = new Schema(
  {
    firebaseUid: { type: String, required: true, index: true },
    quizId: { type: String, required: true, index: true },
    quizTitle: { type: String, default: "" },
    skillSlug: { type: String, default: "" },
    score: { type: Number, required: true },
    total: { type: Number, required: true },
    percentage: { type: Number, required: true },
    answers: { type: [attemptAnswerSchema], default: [] },
  },
  { timestamps: true }
);

quizAttemptSchema.index({ firebaseUid: 1, quizId: 1, createdAt: -1 });

const QuizAttempt =
  mongoose.models.QuizAttempt || mongoose.model("QuizAttempt", quizAttemptSchema);

export default QuizAttempt;
