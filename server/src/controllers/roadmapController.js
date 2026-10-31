import User from "../models/User.js";
import { sendNotification } from "../utils/createNotification.js";

/**
 * Helper to update user learning streak if active today.
 */
function updateStreak(user) {
  const now = new Date();
  const lastActive = user.learningStats?.lastActiveDate
    ? new Date(user.learningStats.lastActiveDate)
    : null;

  if (!user.learningStats) {
    user.learningStats = {
      totalLearningMinutes: 0,
      streakDays: 1,
      lastActiveDate: now,
    };
    return;
  }

  if (!lastActive) {
    user.learningStats.streakDays = 1;
    user.learningStats.lastActiveDate = now;
    return;
  }

  // Check if lastActive was yesterday vs today
  const isSameDay =
    now.getFullYear() === lastActive.getFullYear() &&
    now.getMonth() === lastActive.getMonth() &&
    now.getDate() === lastActive.getDate();

  if (isSameDay) return;

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    yesterday.getFullYear() === lastActive.getFullYear() &&
    yesterday.getMonth() === lastActive.getMonth() &&
    yesterday.getDate() === lastActive.getDate();

  if (isYesterday) {
    user.learningStats.streakDays = (user.learningStats.streakDays || 0) + 1;
  } else {
    user.learningStats.streakDays = 1;
  }
  user.learningStats.lastActiveDate = now;
}

/**
 * POST /api/roadmaps/:id/enroll
 * Enroll the authenticated user into a roadmap.
 */
export async function enrollRoadmap(req, res, next) {
  try {
    const { id: roadmapId } = req.params;
    const { title, level, totalLessons, totalModules } = req.body || {};

    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const alreadyEnrolled = (user.enrolledRoadmaps || []).some(
      (r) => r.roadmapId === roadmapId
    );

    if (alreadyEnrolled) {
      return res.status(200).json({
        success: true,
        message: "Already enrolled in this roadmap.",
        enrolledRoadmaps: user.enrolledRoadmaps,
      });
    }

    const newEnrollment = {
      roadmapId,
      title: title || roadmapId,
      level: level || "Beginner",
      progress: 0,
      completedLessons: [],
      totalLessons: Number(totalLessons) || 0,
      completedModules: [],
      totalModules: Number(totalModules) || 0,
      enrolledAt: new Date(),
      lastActivityAt: new Date(),
    };

    user.enrolledRoadmaps = user.enrolledRoadmaps || [];
    user.enrolledRoadmaps.push(newEnrollment);

    // Record activity
    user.recentActivity = user.recentActivity || [];
    user.recentActivity.unshift({
      title: `Enrolled in "${title || roadmapId}" roadmap`,
      type: "roadmap",
      time: "Just now",
      createdAt: new Date(),
    });
    if (user.recentActivity.length > 30) user.recentActivity.pop();

    updateStreak(user);
    await user.save();

    await sendNotification({
      firebaseUid: req.user.uid,
      title: "Roadmap Enrollment Confirmed",
      message: `You successfully enrolled in the "${title || roadmapId}" roadmap!`,
      type: "enrollment",
      link: `/learn/roadmaps/${roadmapId}`,
    });

    return res.status(201).json({
      success: true,
      message: "Successfully enrolled in roadmap.",
      enrollment: newEnrollment,
      enrolledRoadmaps: user.enrolledRoadmaps,
    });
  } catch (err) {
    return next(err);
  }
}

/**
 * DELETE /api/roadmaps/:id/enroll
 * Unenroll the authenticated user from a roadmap.
 */
export async function unenrollRoadmap(req, res, next) {
  try {
    const { id: roadmapId } = req.params;

    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    user.enrolledRoadmaps = (user.enrolledRoadmaps || []).filter(
      (r) => r.roadmapId !== roadmapId
    );

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Unenrolled successfully.",
      enrolledRoadmaps: user.enrolledRoadmaps,
    });
  } catch (err) {
    return next(err);
  }
}

/**
 * GET /api/roadmaps/my
 * Return all enrolled roadmaps for the authenticated user.
 */
export async function getMyRoadmaps(req, res, next) {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    return res.status(200).json({
      success: true,
      roadmaps: user.enrolledRoadmaps || [],
    });
  } catch (err) {
    return next(err);
  }
}

/**
 * POST /api/roadmaps/:id/lessons/:lessonId/toggle
 * Toggle completion status of a lesson in a roadmap.
 */
export async function toggleLesson(req, res, next) {
  try {
    const { id: roadmapId, lessonId } = req.params;
    const { completed, lessonTitle, roadmapTitle, totalLessons } = req.body || {};

    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    user.enrolledRoadmaps = user.enrolledRoadmaps || [];
    let enrollment = user.enrolledRoadmaps.find((r) => r.roadmapId === roadmapId);

    // Auto-enroll if user completes a lesson directly
    if (!enrollment) {
      enrollment = {
        roadmapId,
        title: roadmapTitle || roadmapId,
        level: "Beginner",
        progress: 0,
        completedLessons: [],
        totalLessons: Number(totalLessons) || 0,
        completedModules: [],
        totalModules: 0,
        enrolledAt: new Date(),
        lastActivityAt: new Date(),
      };
      user.enrolledRoadmaps.push(enrollment);
    }

    enrollment.completedLessons = enrollment.completedLessons || [];
    const isCurrentlyDone = enrollment.completedLessons.includes(lessonId);
    const shouldBeDone = typeof completed === "boolean" ? completed : !isCurrentlyDone;

    if (shouldBeDone && !isCurrentlyDone) {
      enrollment.completedLessons.push(lessonId);

      // Record activity
      user.recentActivity = user.recentActivity || [];
      user.recentActivity.unshift({
        title: `Completed "${lessonTitle || lessonId}" lesson`,
        type: "lesson",
        time: "Just now",
        createdAt: new Date(),
      });
      if (user.recentActivity.length > 30) user.recentActivity.pop();

      updateStreak(user);
    } else if (!shouldBeDone && isCurrentlyDone) {
      enrollment.completedLessons = enrollment.completedLessons.filter((l) => l !== lessonId);
    }

    if (totalLessons && Number(totalLessons) > 0) {
      enrollment.totalLessons = Number(totalLessons);
    }

    const total = enrollment.totalLessons || enrollment.completedLessons.length;
    enrollment.progress = total > 0
      ? Math.min(100, Math.round((enrollment.completedLessons.length / total) * 100))
      : 0;

    enrollment.lastActivityAt = new Date();

    // Check achievement for 100% roadmap completion
    if (enrollment.progress === 100) {
      user.achievements = user.achievements || [];
      const hasBadge = user.achievements.some((a) => a.id === `roadmap-${roadmapId}`);
      if (!hasBadge) {
        user.achievements.push({
          id: `roadmap-${roadmapId}`,
          title: `${enrollment.title} Mastered`,
          description: `Completed 100% of ${enrollment.title} lessons!`,
          earnedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
          icon: "Trophy",
        });
      }
    }

    await user.save();

    if (shouldBeDone && !isCurrentlyDone) {
      await sendNotification({
        firebaseUid: req.user.uid,
        title: "Lesson Completed",
        message: `Great job! You completed "${lessonTitle || lessonId}".`,
        type: "lesson",
        link: `/learn/roadmaps/${roadmapId}`,
      });
    }

    if (enrollment.progress === 100) {
      await sendNotification({
        firebaseUid: req.user.uid,
        title: "Roadmap Completed!",
        message: `Congratulations! You completed 100% of the ${enrollment.title} roadmap and earned the ${enrollment.title} Mastered badge!`,
        type: "roadmap",
        link: `/learn/roadmaps/${roadmapId}`,
      });
    }

    return res.status(200).json({
      success: true,
      enrollment,
      progress: enrollment.progress,
      completedLessons: enrollment.completedLessons,
    });
  } catch (err) {
    return next(err);
  }
}
