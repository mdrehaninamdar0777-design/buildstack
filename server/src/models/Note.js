import mongoose from "mongoose";

const { Schema } = mongoose;

const noteSchema = new Schema(
  {
    firebaseUid: {
      type: String,
      required: [true, "firebaseUid is required"],
      index: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Note title is required"],
      trim: true,
      maxlength: [200, "Title must be 200 characters or fewer"],
    },
    content: {
      type: String,
      required: [true, "Note content is required"],
      trim: true,
      maxlength: [20000, "Content must be 20,000 characters or fewer"],
    },
    targetType: {
      type: String,
      enum: ["skill", "roadmap", "domain", "lesson", "general"],
      default: "general",
    },
    targetId: {
      type: String,
      default: "",
      trim: true,
    },
    targetTitle: {
      type: String,
      default: "",
      trim: true,
    },
    category: {
      type: String,
      default: "General",
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

noteSchema.index({ firebaseUid: 1, createdAt: -1 });

const Note = mongoose.models.Note || mongoose.model("Note", noteSchema);

export default Note;
