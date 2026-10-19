import User from "../models/User.js";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Fields that callers are allowed to update via PUT /api/users/me.
 * Any key not in this set is silently stripped before the update.
 */
const ALLOWED_UPDATE_FIELDS = new Set([
  "name",
  "role",
  "bio",
  "location",
  "avatar",
  "skills",
  "links",
]);

/**
 * Validate and sanitize the body of a profile update request.
 * Returns { data, errors } where `errors` is an array of human-readable strings.
 */
function sanitizeUpdateBody(body) {
  const data = {};
  const errors = [];

  for (const key of ALLOWED_UPDATE_FIELDS) {
    if (!(key in body)) continue; // caller didn't supply this field — skip

    const value = body[key];

    switch (key) {
      case "name":
      case "role":
      case "location":
      case "avatar":
        if (typeof value !== "string") {
          errors.push(`"${key}" must be a string`);
        } else if (value.length > 128 && key !== "avatar") {
          errors.push(`"${key}" must be 128 characters or fewer`);
        } else if (key === "avatar" && value.length > 512) {
          errors.push(`"avatar" must be 512 characters or fewer`);
        } else {
          data[key] = value.trim();
        }
        break;

      case "bio":
        if (typeof value !== "string") {
          errors.push('"bio" must be a string');
        } else if (value.length > 1000) {
          errors.push('"bio" must be 1000 characters or fewer');
        } else {
          data[key] = value.trim();
        }
        break;

      case "skills":
        if (!Array.isArray(value)) {
          errors.push('"skills" must be an array of strings');
        } else if (value.length > 100) {
          errors.push('"skills" must have at most 100 entries');
        } else if (!value.every((s) => typeof s === "string" && s.trim().length <= 64)) {
          errors.push('"skills" entries must be strings of 64 characters or fewer');
        } else {
          data[key] = value.map((s) => s.trim()).filter(Boolean);
        }
        break;

      case "links":
        if (!Array.isArray(value)) {
          errors.push('"links" must be an array');
        } else if (value.length > 20) {
          errors.push('"links" must have at most 20 entries');
        } else {
          const sanitizedLinks = [];
          for (const link of value) {
            if (typeof link !== "object" || link === null) {
              errors.push('"links" entries must be objects');
              break;
            }
            sanitizedLinks.push({
              ...(typeof link.name === "string" && { name: link.name.trim().slice(0, 64) }),
              ...(typeof link.url  === "string" && { url:  link.url.trim().slice(0, 512) }),
              ...(typeof link.href === "string" && { href: link.href.trim().slice(0, 512) }),
              ...(typeof link.type === "string" && { type: link.type.trim().slice(0, 32) }),
            });
          }
          if (errors.length === 0) data[key] = sanitizedLinks;
        }
        break;

      default:
        // Should never happen given the ALLOWED_UPDATE_FIELDS guard above
        break;
    }
  }

  return { data, errors };
}

// ─── Controllers ──────────────────────────────────────────────────────────────

/**
 * POST /api/users/sync
 * Creates a MongoDB profile for first-time users; returns existing profile
 * for returning users. Populates name/email/avatar from verified Firebase claims.
 */
export async function syncUser(req, res, next) {
  try {
    const { uid, email, name: firebaseName, picture } = req.user;

    // Optional display name from the request body (e.g. provided during
    // email/password registration). Validated and trimmed; never used as UID.
    let displayName = firebaseName || "";
    if (req.body && typeof req.body.displayName === "string") {
      const trimmed = req.body.displayName.trim();
      if (trimmed.length > 128) {
        return res.status(400).json({
          success: false,
          message: "displayName must be 128 characters or fewer",
        });
      }
      if (trimmed.length > 0) displayName = trimmed;
    }

    // findOneAndUpdate with upsert handles both first-login and concurrent
    // duplicate requests safely.
    const user = await User.findOneAndUpdate(
      { firebaseUid: uid },
      {
        $setOnInsert: {
          firebaseUid: uid,
          email: email || "",
          name: displayName,
          avatar: picture || (displayName ? displayName[0].toUpperCase() : ""),
        },
      },
      {
        new: true,           // return the document after update
        upsert: true,        // create if not found
        runValidators: true,
        // For new documents, setDefaultsOnInsert ensures schema defaults apply
        setDefaultsOnInsert: true,
      }
    );

    const isNew = !user.createdAt || user.updatedAt?.getTime() === user.createdAt?.getTime();

    return res.status(isNew ? 201 : 200).json({
      success: true,
      user,
    });
  } catch (err) {
    // Duplicate key on a race condition — fetch the existing document
    if (err.code === 11000) {
      try {
        const existing = await User.findOne({ firebaseUid: req.user.uid });
        return res.status(200).json({ success: true, user: existing });
      } catch (fetchErr) {
        return next(fetchErr);
      }
    }
    return next(err);
  }
}

/**
 * GET /api/users/me
 * Returns the authenticated user's own profile.
 */
export async function getMe(req, res, next) {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });

    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          "Profile not found. Call POST /api/users/sync after sign-in to create one.",
      });
    }

    return res.status(200).json({ success: true, user });
  } catch (err) {
    return next(err);
  }
}

/**
 * PUT /api/users/me
 * Updates only explicitly allowed profile fields for the authenticated user.
 */
export async function updateMe(req, res, next) {
  try {
    const { data, errors } = sanitizeUpdateBody(req.body);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    if (Object.keys(data).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields to update were provided",
      });
    }

    // Only update the authenticated user's own document — UID comes from the
    // verified token, never from the request body.
    const user = await User.findOneAndUpdate(
      { firebaseUid: req.user.uid },
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          "Profile not found. Call POST /api/users/sync after sign-in to create one.",
      });
    }

    return res.status(200).json({ success: true, user });
  } catch (err) {
    return next(err);
  }
}
