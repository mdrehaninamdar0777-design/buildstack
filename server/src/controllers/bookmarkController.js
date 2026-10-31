import User from "../models/User.js";

/**
 * GET /api/users/bookmarks
 * Returns all bookmarks for the authenticated user.
 */
export async function getBookmarks(req, res, next) {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    return res.status(200).json({
      success: true,
      bookmarks: user.bookmarks || [],
    });
  } catch (err) {
    return next(err);
  }
}

/**
 * POST /api/users/bookmarks
 * Add a new bookmark. Prevents duplicates.
 */
export async function addBookmark(req, res, next) {
  try {
    const { id, type, title, category, level, progress, href, savedOn } = req.body || {};

    if (!id || !title || !href) {
      return res.status(400).json({
        success: false,
        message: "id, title, and href are required.",
      });
    }

    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    user.bookmarks = user.bookmarks || [];
    const exists = user.bookmarks.some((b) => b.id === id);
    if (exists) {
      return res.status(200).json({
        success: true,
        message: "Bookmark already exists.",
        bookmarks: user.bookmarks,
      });
    }

    const newBookmark = {
      id: String(id),
      type: type || "resource",
      title: String(title).trim(),
      category: category || "",
      level: level || "",
      progress: Number(progress) || 0,
      href: String(href).trim(),
      savedOn: savedOn || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      createdAt: new Date(),
    };

    user.bookmarks.push(newBookmark);
    await user.save();

    return res.status(201).json({
      success: true,
      message: "Bookmark added successfully.",
      bookmark: newBookmark,
      bookmarks: user.bookmarks,
    });
  } catch (err) {
    return next(err);
  }
}

/**
 * DELETE /api/users/bookmarks/:id
 * Remove a bookmark by ID.
 */
export async function removeBookmark(req, res, next) {
  try {
    const { id } = req.params;

    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    user.bookmarks = (user.bookmarks || []).filter((b) => b.id !== id);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Bookmark removed successfully.",
      bookmarks: user.bookmarks,
    });
  } catch (err) {
    return next(err);
  }
}
