import mongoose from "mongoose";

const { Schema } = mongoose;

const questionSchema = new Schema(
  {
    id: { type: String, required: true },
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctIndex: { type: Number, required: true },
    explanation: { type: String, default: "" },
  },
  { _id: false }
);

const quizSchema = new Schema(
  {
    quizId: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    skillSlug: { type: String, required: true, index: true },
    roadmapSlug: { type: String, default: "" },
    difficulty: { type: String, default: "Beginner" },
    timeLimitMinutes: { type: Number, default: 10 },
    questions: { type: [questionSchema], default: [] },
  },
  { timestamps: true }
);

const Quiz = mongoose.models.Quiz || mongoose.model("Quiz", quizSchema);

export default Quiz;
