import Note from "../models/Note.js";

/**
 * GET /api/notes
 * List user's notes with optional search and target filters.
 */
export async function getNotes(req, res, next) {
  try {
    const { search, targetType, targetId } = req.query;
    const filter = { firebaseUid: req.user.uid };

    if (targetType) filter.targetType = targetType;
    if (targetId) filter.targetId = targetId;
    if (search && search.trim()) {
      const q = search.trim();
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { content: { $regex: q, $options: "i" } },
        { targetTitle: { $regex: q, $options: "i" } },
        { tags: { $in: [new RegExp(q, "i")] } },
      ];
    }

    const notes = await Note.find(filter).sort({ updatedAt: -1 });

    return res.status(200).json({
      success: true,
      notes,
    });
  } catch (err) {
    return next(err);
  }
}

/**
 * GET /api/notes/:id
 * Get single note by ID. Verifies ownership.
 */
export async function getNoteById(req, res, next) {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      firebaseUid: req.user.uid,
    });

    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found." });
    }

    return res.status(200).json({ success: true, note });
  } catch (err) {
    return next(err);
  }
}

/**
 * POST /api/notes
 * Create a new personal note.
 */
export async function createNote(req, res, next) {
  try {
    const { title, content, targetType, targetId, targetTitle, category, tags } = req.body || {};

    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: "Note title is required." });
    }
    if (!content || !content.trim()) {
      return res.status(400).json({ success: false, message: "Note content is required." });
    }

    const note = await Note.create({
      firebaseUid: req.user.uid,
      title: title.trim(),
      content: content.trim(),
      targetType: targetType || "general",
      targetId: targetId || "",
      targetTitle: targetTitle || "",
      category: category || "General",
      tags: Array.isArray(tags) ? tags.map((t) => String(t).trim()).filter(Boolean) : [],
    });

    return res.status(201).json({ success: true, message: "Note created successfully.", note });
  } catch (err) {
    return next(err);
  }
}

/**
 * PUT /api/notes/:id
 * Update an existing note. Verifies ownership.
 */
export async function updateNote(req, res, next) {
  try {
    const { title, content, targetType, targetId, targetTitle, category, tags } = req.body || {};

    const note = await Note.findOne({
      _id: req.params.id,
      firebaseUid: req.user.uid,
    });

    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found." });
    }

    if (title && typeof title === "string") note.title = title.trim();
    if (content && typeof content === "string") note.content = content.trim();
    if (targetType) note.targetType = targetType;
    if (targetId !== undefined) note.targetId = targetId;
    if (targetTitle !== undefined) note.targetTitle = targetTitle;
    if (category) note.category = category;
    if (Array.isArray(tags)) note.tags = tags.map((t) => String(t).trim()).filter(Boolean);

    await note.save();

    return res.status(200).json({ success: true, message: "Note updated successfully.", note });
  } catch (err) {
    return next(err);
  }
}

/**
 * DELETE /api/notes/:id
 * Delete note by ID. Verifies ownership.
 */
export async function deleteNote(req, res, next) {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      firebaseUid: req.user.uid,
    });

    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found." });
    }

    return res.status(200).json({ success: true, message: "Note deleted successfully." });
  } catch (err) {
    return next(err);
  }
}
