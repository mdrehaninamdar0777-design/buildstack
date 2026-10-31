import mongoose from "mongoose";

const { Schema } = mongoose;

const practiceAttemptSchema = new Schema(
  {
    firebaseUid: { type: String, required: true, index: true },
    questionId: { type: String, required: true, index: true },
    skillSlug: { type: String, default: "" },
    userAnswer: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
    explanation: { type: String, default: "" },
  },
  { timestamps: true }
);

practiceAttemptSchema.index({ firebaseUid: 1, questionId: 1 });

const PracticeAttempt =
  mongoose.models.PracticeAttempt ||
  mongoose.model("PracticeAttempt", practiceAttemptSchema);

export default PracticeAttempt;
