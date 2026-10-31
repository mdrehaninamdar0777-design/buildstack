"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Code2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Search,
  Filter,
  ArrowRight,
  Loader2,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import { getPracticeQuestions, submitPracticeAnswer } from "@/lib/api";

export default function PracticeRunner({ skillSlug, skillTitle }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // Filters
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");

  // Answering state
  const [userAnswer, setUserAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null); // { isCorrect, explanation }
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    let active = true;
    getPracticeQuestions({
      skillSlug,
      difficulty: difficultyFilter,
      search,
    })
      .then((res) => {
        if (active && res?.success) {
          const list = res.questions || [];
          setQuestions(list);
          setSelectedQuestion((current) => current || list[0] || null);
        }
      })
      .catch((err) => {
        console.error("[PracticeRunner] Error fetching questions:", err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [skillSlug, difficultyFilter, search]);

  const handleSelectQuestion = (q) => {
    setSelectedQuestion(q);
    setUserAnswer("");
    setFeedback(null);
    setShowHint(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedQuestion || !userAnswer.trim()) return;

    setSubmitting(true);
    try {
      const res = await submitPracticeAnswer(selectedQuestion.questionId, userAnswer.trim());
      if (res?.success) {
        setFeedback({
          isCorrect: res.isCorrect,
          explanation: res.explanation,
        });

        if (res.isCorrect) {
          // Update local question state to solved
          setQuestions((prev) =>
            prev.map((q) =>
              q.questionId === selectedQuestion.questionId
                ? { ...q, isSolved: true, isAttempted: true }
                : q
            )
          );
        }
      }
    } catch (err) {
      console.error("[PracticeRunner] Submit error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search problems..."
            className="h-10 w-full rounded-xl border border-neutral-200 bg-white pl-9 pr-3 text-xs outline-none focus:border-neutral-400"
          />
        </div>

        <div className="flex items-center gap-2">
          {["All", "Easy", "Medium", "Hard"].map((diff) => (
            <button
              key={diff}
              type="button"
              onClick={() => setDifficultyFilter(diff)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                difficultyFilter === diff
                  ? "bg-black text-white"
                  : "border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex h-56 items-center justify-center">
          <Loader2 className="h-7 w-7 animate-spin text-neutral-400" />
        </div>
      ) : questions.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-neutral-300 p-10 text-center">
          <Code2 className="mx-auto h-8 w-8 text-neutral-400" />
          <h4 className="mt-3 text-sm font-bold text-neutral-900">
            No Practice Problems Found
          </h4>
          <p className="mt-1 text-xs text-neutral-500">
            Try adjusting your search or difficulty filter.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-[300px_1fr]">
          {/* Question List Sidebar */}
          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {questions.map((q) => {
              const isCurrent = selectedQuestion?.questionId === q.questionId;
              return (
                <div
                  key={q.questionId}
                  onClick={() => handleSelectQuestion(q)}
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-3 text-xs transition ${
                    isCurrent
                      ? "border-black bg-neutral-900 text-white"
                      : "border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-50"
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <p className="font-semibold truncate">{q.title}</p>
                    <span
                      className={`mt-1 inline-block text-[10px] font-medium ${
                        isCurrent
                          ? "text-neutral-300"
                          : q.difficulty === "Easy"
                          ? "text-emerald-600"
                          : q.difficulty === "Medium"
                          ? "text-amber-600"
                          : "text-red-600"
                      }`}
                    >
                      {q.difficulty} • {q.topic}
                    </span>
                  </div>

                  {q.isSolved && (
                    <CheckCircle2
                      className={`h-4 w-4 shrink-0 ${
                        isCurrent ? "text-emerald-400" : "text-emerald-600"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Active Question Workspace */}
          {selectedQuestion && (
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-[11px] font-semibold text-neutral-700">
                      {selectedQuestion.difficulty}
                    </span>
                    <span className="text-xs text-neutral-400">•</span>
                    <span className="text-xs text-neutral-500 font-medium">
                      {selectedQuestion.topic}
                    </span>
                  </div>
                  <h3 className="mt-2 text-xl font-bold text-neutral-900">
                    {selectedQuestion.title}
                  </h3>
                </div>

                {selectedQuestion.isSolved && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Solved
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="mt-4 text-xs leading-5 text-neutral-700 sm:text-sm">
                <p>{selectedQuestion.description}</p>
              </div>

              {/* Code Snippet */}
              {selectedQuestion.codeSnippet && (
                <div className="mt-4 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-950 p-4 text-xs font-mono text-emerald-400">
                  <pre className="overflow-x-auto whitespace-pre">
                    {selectedQuestion.codeSnippet}
                  </pre>
                </div>
              )}

              {/* Hints */}
              {selectedQuestion.hints && selectedQuestion.hints.length > 0 && (
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => setShowHint((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 hover:text-amber-700"
                  >
                    <Lightbulb className="h-3.5 w-3.5" />
                    {showHint ? "Hide Hint" : "Need a Hint?"}
                  </button>
                  {showHint && (
                    <div className="mt-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
                      {selectedQuestion.hints[0]}
                    </div>
                  )}
                </div>
              )}

              {/* Answer submission form */}
              <form onSubmit={handleSubmit} className="mt-6 border-t border-neutral-100 pt-5">
                {selectedQuestion.format === "mcq" ? (
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-neutral-900">
                      Choose the correct answer:
                    </label>
                    {selectedQuestion.options.map((opt, idx) => {
                      const isSelected = userAnswer === opt;
                      return (
                        <div
                          key={opt}
                          onClick={() => setUserAnswer(opt)}
                          className={`flex cursor-pointer items-center justify-between rounded-xl border p-3 text-xs transition ${
                            isSelected
                              ? "border-black bg-neutral-900 text-white font-semibold"
                              : "border-neutral-200 bg-white text-neutral-800 hover:border-neutral-400"
                          }`}
                        >
                          <span>{opt}</span>
                          <span
                            className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                              isSelected
                                ? "border-white bg-white text-black"
                                : "border-neutral-300"
                            }`}
                          >
                            {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-black" />}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold text-neutral-900">
                      Your Answer:
                    </label>
                    <input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Type your exact answer here..."
                      className="mt-1.5 h-11 w-full rounded-xl border border-neutral-200 px-3.5 text-xs text-neutral-900 outline-none focus:border-neutral-400 sm:text-sm"
                      required
                    />
                  </div>
                )}

                {/* Feedback */}
                {feedback && (
                  <div
                    className={`mt-4 rounded-xl border p-4 text-xs transition ${
                      feedback.isCorrect
                        ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                        : "border-red-200 bg-red-50 text-red-900"
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold">
                      {feedback.isCorrect ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          Correct! Excellent problem solving.
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 text-red-600" />
                          Incorrect. Review the explanation and try again.
                        </>
                      )}
                    </div>
                    {feedback.explanation && (
                      <p className="mt-2 text-xs leading-5">
                        <strong>Explanation: </strong>
                        {feedback.explanation}
                      </p>
                    )}
                  </div>
                )}

                <div className="mt-5 flex justify-end">
                  <button
                    type="submit"
                    disabled={submitting || !userAnswer.trim()}
                    className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-neutral-800 disabled:opacity-40 sm:text-sm"
                  >
                    {submitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                    Submit Answer
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
