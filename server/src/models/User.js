import mongoose from "mongoose";

const { Schema } = mongoose;

// Sub-schema: one social / profile link entry
const linkSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: [64, "Link name must be 64 characters or fewer"],
    },
    url: {
      type: String,
      trim: true,
      maxlength: [512, "URL must be 512 characters or fewer"],
    },
    href: {
      type: String,
      trim: true,
      maxlength: [512, "href must be 512 characters or fewer"],
    },
    // Discriminator for the icon renderer (github | linkedin | portfolio | …)
    type: {
      type: String,
      trim: true,
      maxlength: [32, "Link type must be 32 characters or fewer"],
    },
  },
  { _id: false } // no separate _id for embedded links
);

// Sub-schema: enrolled roadmap tracking
const enrolledRoadmapSchema = new Schema(
  {
    roadmapId: {
      type: String,
      required: [true, "roadmapId is required"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Roadmap title is required"],
      trim: true,
    },
    level: {
      type: String,
      default: "Beginner",
      trim: true,
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    completedModules: {
      type: [String],
      default: [],
    },
    totalModules: {
      type: Number,
      default: 0,
    },
    completedLessons: {
      type: [String],
      default: [],
    },
    totalLessons: {
      type: Number,
      default: 0,
    },
    enrolledAt: {
      type: Date,
      default: Date.now,
    },
    lastActivityAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

// Sub-schema: recent learning activity event
const recentActivitySchema = new Schema(
  {
    id: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toString(),
    },
    title: {
      type: String,
      required: [true, "Activity title is required"],
      trim: true,
    },
    type: {
      type: String,
      default: "lesson",
      trim: true,
    },
    time: {
      type: String,
      default: "Just now",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

// Sub-schema: earned achievement badge
const achievementSchema = new Schema(
  {
    id: {
      type: String,
      required: [true, "Achievement ID is required"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Achievement title is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    earnedAt: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "Award",
    },
  },
  { _id: false }
);

// Sub-schema: aggregate learning statistics
const learningStatsSchema = new Schema(
  {
    totalLearningMinutes: {
      type: Number,
      default: 0,
      min: 0,
    },
    streakDays: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastActiveDate: {
      type: Date,
      default: null,
    },
    weeklyMinutes: {
      type: Map,
      of: Number,
      default: () => new Map(),
    },
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    // ── Identity ────────────────────────────────────────────────────────────
    firebaseUid: {
      type: String,
      required: [true, "firebaseUid is required"],
      unique: true,
      index: true,
      trim: true,
    },

    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      lowercase: true,
      maxlength: [254, "Email must be 254 characters or fewer"],
    },

    // ── Public profile fields ────────────────────────────────────────────────
    name: {
      type: String,
      trim: true,
      maxlength: [128, "Name must be 128 characters or fewer"],
      default: "",
    },

    // Maps to "Job Title" / "role" in the UI
    role: {
      type: String,
      trim: true,
      maxlength: [128, "Role must be 128 characters or fewer"],
      default: "",
    },

    bio: {
      type: String,
      trim: true,
      maxlength: [1000, "Bio must be 1000 characters or fewer"],
      default: "",
    },

    location: {
      type: String,
      trim: true,
      maxlength: [128, "Location must be 128 characters or fewer"],
      default: "",
    },

    // URL or single initial character used as avatar fallback (matches existing UI)
    avatar: {
      type: String,
      trim: true,
      maxlength: [512, "Avatar value must be 512 characters or fewer"],
      default: "",
    },

    // ── Structured data ──────────────────────────────────────────────────────
    skills: {
      type: [String],
      default: [],
      validate: {
        validator(arr) {
          return (
            arr.length <= 100 &&
            arr.every((s) => typeof s === "string" && s.trim().length <= 64)
          );
        },
        message: "skills must have at most 100 entries, each 64 characters or fewer",
      },
    },

    links: {
      type: [linkSchema],
      default: [],
      validate: {
        validator(arr) {
          return arr.length <= 20;
        },
        message: "links must have at most 20 entries",
      },
    },

    // ── Progress & Dashboard Foundation ──────────────────────────────────────
    enrolledRoadmaps: {
      type: [enrolledRoadmapSchema],
      default: [],
    },

    learningStats: {
      type: learningStatsSchema,
      default: () => ({
        totalLearningMinutes: 0,
        streakDays: 0,
        lastActiveDate: null,
      }),
    },

    recentActivity: {
      type: [recentActivitySchema],
      default: [],
    },

    achievements: {
      type: [achievementSchema],
      default: [],
    },

    bookmarks: {
      type: [
        new Schema(
          {
            id: { type: String, required: true },
            type: { type: String, required: true },
            title: { type: String, required: true },
            category: { type: String, default: "" },
            level: { type: String, default: "" },
            progress: { type: Number, default: 0 },
            href: { type: String, required: true },
            savedOn: { type: String, default: "" },
            createdAt: { type: Date, default: Date.now },
          },
          { _id: false }
        ),
      ],
      default: [],
    },
  },
  {
    // Automatically manage createdAt and updatedAt
    timestamps: true,
  }
);

// Prevent model recompilation in dev hot-reload environments
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
