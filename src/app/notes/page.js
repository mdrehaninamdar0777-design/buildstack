"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  FileText,
  Plus,
  Search,
  Trash2,
  Edit3,
  Calendar,
  Tag,
  Loader2,
  Folder,
  BookOpen,
  Map,
  X,
  Check,
} from "lucide-react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppNavbar from "@/components/layout/AppNavbar";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "@/lib/api";


export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "General",
    targetType: "general",
    targetTitle: "",
    tags: "",
  });
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const reloadNotes = useCallback(async () => {
    try {
      const res = await getNotes();
      if (res?.success) {
        setNotes(res.notes || []);
      }
    } catch (err) {
      console.error("[NotesPage] Error reloading notes:", err);
    }
  }, []);

  useEffect(() => {
    let active = true;
    getNotes()
      .then((res) => {
        if (active && res?.success) {
          setNotes(res.notes || []);
        }
      })
      .catch((err) => {
        console.error("[NotesPage] Error fetching notes:", err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleOpenCreateModal = () => {
    setEditingNote(null);
    setFormData({
      title: "",
      content: "",
      category: "General",
      targetType: "general",
      targetTitle: "",
      tags: "",
    });
    setFormError("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (note) => {
    setEditingNote(note);
    setFormData({
      title: note.title,
      content: note.content,
      category: note.category || "General",
      targetType: note.targetType || "general",
      targetTitle: note.targetTitle || "",
      tags: Array.isArray(note.tags) ? note.tags.join(", ") : "",
    });
    setFormError("");
    setIsModalOpen(true);
  };

  const handleSaveNote = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setFormError("Note title is required.");
      return;
    }
    if (!formData.content.trim()) {
      setFormError("Note content is required.");
      return;
    }

    setSaving(true);
    setFormError("");

    const payload = {
      title: formData.title.trim(),
      content: formData.content.trim(),
      category: formData.category,
      targetType: formData.targetType,
      targetTitle: formData.targetTitle.trim(),
      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      if (editingNote) {
        const res = await updateNote(editingNote._id, payload);
        if (res?.success) {
          setNotes((prev) =>
            prev.map((n) => (n._id === editingNote._id ? res.note : n))
          );
          setIsModalOpen(false);
        }
      } else {
        const res = await createNote(payload);
        if (res?.success) {
          setNotes((prev) => [res.note, ...prev]);
          setIsModalOpen(false);
        }
      }
    } catch (err) {
      setFormError(err.message || "Failed to save note.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    setUserNotesOptimistic(noteId);
    try {
      await deleteNote(noteId);
    } catch (err) {
      console.error("[NotesPage] Failed to delete note:", err);
      reloadNotes();
    }
  };

  const setUserNotesOptimistic = (noteId) => {
    setNotes((prev) => prev.filter((n) => n._id !== noteId));
  };

  // Filter notes
  const filteredNotes = useMemo(() => {
    return notes.filter((n) => {
      const matchesSearch =
        searchQuery === "" ||
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.targetTitle?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        n.category?.toLowerCase() === selectedCategory.toLowerCase() ||
        n.targetType?.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [notes, searchQuery, selectedCategory]);

  return (
    <ProtectedRoute>
      <AppNavbar />
      <div className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
                  Personal Notes
                </h1>
                <p className="mt-0.5 text-sm text-neutral-500">
                  Organize code snippets, key concepts and study notes across your learning journey.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-neutral-800 sm:text-sm"
          >
            <Plus className="h-4 w-4" />
            New Note
          </button>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in title, content, tags or topic..."
              className="h-11 w-full rounded-xl border border-neutral-200 bg-white pl-10 pr-4 text-xs text-neutral-900 outline-none transition focus:border-neutral-400 sm:text-sm"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Notes" },
              { id: "skill", label: "Skills" },
              { id: "roadmap", label: "Roadmaps" },
              { id: "general", label: "General" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
                  selectedCategory === cat.id
                    ? "bg-black text-white"
                    : "border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notes Grid */}
        <div className="mt-8">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
            </div>
          ) : filteredNotes.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-neutral-300 px-6 py-16 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400">
                <FileText className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-base font-semibold text-neutral-900">
                {searchQuery ? "No matching notes found" : "No notes yet"}
              </h2>
              <p className="mt-1 text-sm text-neutral-500">
                {searchQuery
                  ? "Try searching with different keywords."
                  : "Create your first personal study note to capture important insights."}
              </p>
              {!searchQuery && (
                <button
                  type="button"
                  onClick={handleOpenCreateModal}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-800"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Create Note
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredNotes.map((note) => (
                <div
                  key={note._id}
                  className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-5 shadow-2xs transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-[11px] font-semibold text-neutral-700">
                      {note.category || "General"}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(note)}
                        className="rounded-lg p-1.5 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-900"
                        title="Edit note"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteNote(note._id)}
                        className="rounded-lg p-1.5 text-neutral-400 transition hover:bg-red-50 hover:text-red-600"
                        title="Delete note"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <h3 className="mt-3 text-base font-bold text-neutral-950">
                    {note.title}
                  </h3>

                  {note.targetTitle && (
                    <p className="mt-1 flex items-center gap-1 text-xs font-medium text-neutral-500">
                      <BookOpen className="h-3.5 w-3.5" />
                      {note.targetTitle}
                    </p>
                  )}

                  <p className="mt-2.5 line-clamp-4 text-xs leading-5 text-neutral-600 whitespace-pre-line">
                    {note.content}
                  </p>

                  {/* Tags */}
                  {note.tags && note.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {note.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[10px] font-medium text-neutral-600"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Footer timestamps */}
                  <div className="mt-auto pt-4 border-t border-neutral-100 text-[11px] text-neutral-400 flex items-center justify-between">
                    <span>
                      {new Date(note.updatedAt || note.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span>
                      {new Date(note.updatedAt || note.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Create / Edit Note Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
            <div className="w-full max-w-xl rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                <h3 className="text-lg font-bold text-neutral-900">
                  {editingNote ? "Edit Note" : "Create New Note"}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSaveNote} className="mt-4 space-y-4">
                {formError && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">
                    {formError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-neutral-700">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="e.g. React useEffect Cleanup Patterns"
                    className="mt-1 h-10 w-full rounded-xl border border-neutral-200 px-3.5 text-xs text-neutral-900 outline-none focus:border-neutral-400 sm:text-sm"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700">
                      Category
                    </label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      placeholder="e.g. Frontend, Database"
                      className="mt-1 h-10 w-full rounded-xl border border-neutral-200 px-3.5 text-xs text-neutral-900 outline-none focus:border-neutral-400 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700">
                      Target Entity
                    </label>
                    <select
                      value={formData.targetType}
                      onChange={(e) =>
                        setFormData({ ...formData, targetType: e.target.value })
                      }
                      className="mt-1 h-10 w-full rounded-xl border border-neutral-200 bg-white px-3 text-xs text-neutral-900 outline-none focus:border-neutral-400 sm:text-sm"
                    >
                      <option value="general">General</option>
                      <option value="skill">Skill</option>
                      <option value="roadmap">Roadmap</option>
                      <option value="lesson">Lesson</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700">
                    Associated Entity Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.targetTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, targetTitle: e.target.value })
                    }
                    placeholder="e.g. React, Full Stack Developer"
                    className="mt-1 h-10 w-full rounded-xl border border-neutral-200 px-3.5 text-xs text-neutral-900 outline-none focus:border-neutral-400 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700">
                    Content *
                  </label>
                  <textarea
                    rows={6}
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    placeholder="Write detailed notes, code blocks, or explanations..."
                    className="mt-1 w-full rounded-xl border border-neutral-200 p-3.5 text-xs text-neutral-900 outline-none focus:border-neutral-400 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData({ ...formData, tags: e.target.value })
                    }
                    placeholder="e.g. hooks, cleanup, lifecycle"
                    className="mt-1 h-10 w-full rounded-xl border border-neutral-200 px-3.5 text-xs text-neutral-900 outline-none focus:border-neutral-400 sm:text-sm"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-xl border border-neutral-200 px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 sm:text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-800 sm:text-sm"
                  >
                    {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                    {editingNote ? "Update Note" : "Save Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
