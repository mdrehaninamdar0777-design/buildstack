import Notification from "../models/Notification.js";

/**
 * Helper to record an in-app notification safely without interrupting the main request.
 */
export async function sendNotification({
  firebaseUid,
  title,
  message,
  type = "system",
  link = "",
}) {
  try {
    if (!firebaseUid || !title || !message) return null;
    return await Notification.create({
      firebaseUid,
      title,
      message,
      type,
      link,
      isRead: false,
    });
  } catch (err) {
    console.error("[Notification] Error creating notification:", err.message);
    return null;
  }
}
