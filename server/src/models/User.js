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
  },
  {
    // Automatically manage createdAt and updatedAt
    timestamps: true,
  }
);

// Prevent model recompilation in dev hot-reload environments
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
