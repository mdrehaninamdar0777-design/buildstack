"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  Trophy,
  BookOpen,
  Map,
  HelpCircle,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

export default function NotificationBell() {
  const { user } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!user) return;
    let active = true;

    const load = () => {
      getNotifications()
        .then((res) => {
          if (active && res?.success) {
            setNotifications(res.notifications || []);
            setUnreadCount(res.unreadCount || 0);
          }
        })
        .catch((err) => {
          console.error("[NotificationBell] Error fetching notifications:", err);
        });
    };

    load();
    const interval = setInterval(load, 30000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [user]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleMarkAsRead = async (id, e) => {
    e?.stopPropagation();
    try {
      const res = await markNotificationAsRead(id);
      if (res?.success) {
        setNotifications((prev) =>
          prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
        );
        setUnreadCount(res.unreadCount);
      }
    } catch (err) {
      console.error("[NotificationBell] Mark as read error:", err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      const res = await markAllNotificationsAsRead();
      if (res?.success) {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
        setUnreadCount(0);
      }
    } catch (err) {
      console.error("[NotificationBell] Mark all as read error:", err);
    }
  };

  const handleDelete = async (id, e) => {
    e?.stopPropagation();
    try {
      const res = await deleteNotification(id);
      if (res?.success) {
        setNotifications((prev) => prev.filter((n) => n._id !== id));
        setUnreadCount(res.unreadCount);
      }
    } catch (err) {
      console.error("[NotificationBell] Delete error:", err);
    }
  };

  const handleNotificationClick = async (notif) => {
    if (!notif.isRead) {
      handleMarkAsRead(notif._id);
    }
    setIsOpen(false);
    if (notif.link) {
      router.push(notif.link);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "achievement":
        return <Trophy className="h-4 w-4 text-amber-500" />;
      case "roadmap":
      case "enrollment":
        return <Map className="h-4 w-4 text-indigo-500" />;
      case "lesson":
      case "module":
        return <BookOpen className="h-4 w-4 text-emerald-500" />;
      case "quiz":
        return <HelpCircle className="h-4 w-4 text-purple-500" />;
      default:
        return <Sparkles className="h-4 w-4 text-neutral-500" />;
    }
  };

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-600 transition hover:bg-neutral-50 hover:text-neutral-900"
        aria-label="Notifications"
        aria-expanded={isOpen}
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white shadow-xs animate-pulse">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 sm:w-96 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-100 p-4">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-neutral-900 text-sm">Notifications</h3>
              {unreadCount > 0 && (
                <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-bold text-neutral-700">
                  {unreadCount} new
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="flex items-center gap-1 text-[11px] font-semibold text-neutral-600 hover:text-neutral-900"
              >
                <CheckCheck className="h-3.5 w-3.5" />
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-[380px] overflow-y-auto divide-y divide-neutral-100">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="mx-auto h-7 w-7 text-neutral-300" />
                <p className="mt-2 text-xs font-semibold text-neutral-700">
                  No notifications
                </p>
                <p className="mt-0.5 text-[11px] text-neutral-400">
                  Enroll in roadmaps, complete lessons, and finish quizzes to earn updates!
                </p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif._id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`flex cursor-pointer items-start gap-3 p-3.5 transition hover:bg-neutral-50 ${
                    !notif.isRead ? "bg-neutral-50/70" : ""
                  }`}
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-neutral-100">
                    {getIcon(notif.type)}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-xs font-bold text-neutral-900 truncate">
                        {notif.title}
                      </p>
                      <span className="shrink-0 text-[10px] text-neutral-400">
                        {new Date(notif.createdAt).toLocaleDateString([], {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    <p className="mt-0.5 text-[11px] leading-4 text-neutral-600 line-clamp-2">
                      {notif.message}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-1">
                    {!notif.isRead && (
                      <button
                        type="button"
                        onClick={(e) => handleMarkAsRead(notif._id, e)}
                        title="Mark as read"
                        className="rounded-md p-1 text-neutral-400 hover:bg-neutral-200 hover:text-neutral-700"
                      >
                        <Check className="h-3.5 w-3.5" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={(e) => handleDelete(notif._id, e)}
                      title="Delete"
                      className="rounded-md p-1 text-neutral-400 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
