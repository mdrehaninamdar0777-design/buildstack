import Notification from "../models/Notification.js";

/**
 * GET /api/notifications
 * Returns list of notifications and total unread count for current user.
 */
export async function getNotifications(req, res, next) {
  try {
    const notifications = await Notification.find({
      firebaseUid: req.user.uid,
    })
      .sort({ createdAt: -1 })
      .limit(50);

    const unreadCount = await Notification.countDocuments({
      firebaseUid: req.user.uid,
      isRead: false,
    });

    return res.status(200).json({
      success: true,
      notifications,
      unreadCount,
    });
  } catch (err) {
    return next(err);
  }
}

/**
 * PATCH /api/notifications/:id/read
 * Mark a single notification as read.
 */
export async function markAsRead(req, res, next) {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, firebaseUid: req.user.uid },
      { $set: { isRead: true } },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found." });
    }

    const unreadCount = await Notification.countDocuments({
      firebaseUid: req.user.uid,
      isRead: false,
    });

    return res.status(200).json({
      success: true,
      notification,
      unreadCount,
    });
  } catch (err) {
    return next(err);
  }
}

/**
 * PATCH /api/notifications/read-all
 * Mark all notifications as read for current user.
 */
export async function markAllAsRead(req, res, next) {
  try {
    await Notification.updateMany(
      { firebaseUid: req.user.uid, isRead: false },
      { $set: { isRead: true } }
    );

    return res.status(200).json({
      success: true,
      message: "All notifications marked as read.",
      unreadCount: 0,
    });
  } catch (err) {
    return next(err);
  }
}

/**
 * DELETE /api/notifications/:id
 * Delete a notification by ID.
 */
export async function deleteNotification(req, res, next) {
  try {
    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      firebaseUid: req.user.uid,
    });

    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found." });
    }

    const unreadCount = await Notification.countDocuments({
      firebaseUid: req.user.uid,
      isRead: false,
    });

    return res.status(200).json({
      success: true,
      message: "Notification deleted.",
      unreadCount,
    });
  } catch (err) {
    return next(err);
  }
}
