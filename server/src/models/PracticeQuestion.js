import mongoose from "mongoose";

const { Schema } = mongoose;

const practiceQuestionSchema = new Schema(
  {
    questionId: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    skillSlug: { type: String, required: true, index: true },
    topic: { type: String, default: "General" },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },
    format: {
      type: String,
      enum: ["mcq", "short_answer"],
      default: "mcq",
    },
    description: { type: String, required: true },
    codeSnippet: { type: String, default: "" },
    options: { type: [String], default: [] },
    // For mcq: index or option text. For short_answer: accepted lowercase strings
    acceptedAnswers: { type: [String], default: [] },
    explanation: { type: String, default: "" },
    constraints: { type: [String], default: [] },
    hints: { type: [String], default: [] },
  },
  { timestamps: true }
);

const PracticeQuestion =
  mongoose.models.PracticeQuestion ||
  mongoose.model("PracticeQuestion", practiceQuestionSchema);

export default PracticeQuestion;
