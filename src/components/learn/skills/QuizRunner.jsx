"use client";

import { useState, useEffect, useCallback } from "react";
import {
  HelpCircle,
  Clock3,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Calendar,
} from "lucide-react";
import { getQuizzes, submitQuiz, getQuizAttempts } from "@/lib/api";

export default function QuizRunner({ skillSlug, skillTitle }) {
  const [quizzes, setQuizzes] = useState([]);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  // Runner state
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [questionId]: optionIndex }
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    let active = true;
    getQuizzes({ skillSlug })
      .then(async (res) => {
        if (!active || !res?.success || !res.quizzes?.length) return;
        setQuizzes(res.quizzes);
        setActiveQuiz(res.quizzes[0]);

        try {
          const attRes = await getQuizAttempts(res.quizzes[0].quizId);
          if (active && attRes?.success) {
            setAttempts(attRes.attempts || []);
          }
        } catch {
          // ignore attempt fetch error
        }
      })
      .catch((err) => {
        console.error("[QuizRunner] Error loading quizzes:", err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [skillSlug]);

  const handleStartQuiz = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setResult(null);
    setQuizStarted(true);
  };

  const handleSelectOption = (questionId, optionIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmit = async () => {
    if (!activeQuiz) return;
    const answeredCount = Object.keys(selectedAnswers).length;
    if (answeredCount < activeQuiz.questions.length) {
      if (
        !window.confirm(
          `You have answered ${answeredCount} of ${activeQuiz.questions.length} questions. Submit anyway?`
        )
      ) {
        return;
      }
    }

    setSubmitting(true);
    const answersPayload = activeQuiz.questions.map((q) => ({
      questionId: q.id,
      selectedIndex: selectedAnswers[q.id] !== undefined ? selectedAnswers[q.id] : -1,
    }));

    try {
      const res = await submitQuiz(activeQuiz.quizId, answersPayload);
      if (res?.success) {
        setResult(res.result);
        setQuizStarted(false);

        // Refresh attempts
        const attRes = await getQuizAttempts(activeQuiz.quizId);
        if (attRes?.success) {
          setAttempts(attRes.attempts || []);
        }
      }
    } catch (err) {
      console.error("[QuizRunner] Submit error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-56 items-center justify-center p-6">
        <Loader2 className="h-7 w-7 animate-spin text-neutral-400" />
      </div>
    );
  }

  if (!activeQuiz || activeQuiz.questions.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400">
          <HelpCircle className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-base font-bold text-neutral-900">
          No Quiz Available Yet
        </h3>
        <p className="mt-1 text-xs text-neutral-500">
          Check back soon for quizzes tailored to {skillTitle || "this skill"}.
        </p>
      </div>
    );
  }

  // View: Finished Results
  if (result) {
    return (
      <div className="p-6">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs">
          <div className="flex flex-col items-center text-center">
            <span
              className={`flex h-16 w-16 items-center justify-center rounded-full ${
                result.passed
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-amber-50 text-amber-600"
              }`}
            >
              {result.passed ? (
                <Award className="h-8 w-8" />
              ) : (
                <RotateCcw className="h-8 w-8" />
              )}
            </span>

            <h3 className="mt-4 text-2xl font-bold text-neutral-900">
              {result.passed ? "Quiz Passed!" : "Quiz Completed"}
            </h3>

            <p className="mt-1 text-sm text-neutral-500">
              You scored{" "}
              <strong className="text-neutral-900">
                {result.score} of {result.total}
              </strong>{" "}
              ({result.percentage}%)
            </p>

            <button
              type="button"
              onClick={handleStartQuiz}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-neutral-800"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Retake Quiz
            </button>
          </div>

          {/* Breakdown */}
          <div className="mt-8 space-y-4 border-t border-neutral-100 pt-6">
            <h4 className="text-sm font-bold text-neutral-900">
              Answer Review & Explanations
            </h4>

            {result.breakdown?.map((b, idx) => (
              <div
                key={b.questionId}
                className={`rounded-xl border p-4 text-xs transition ${
                  b.isCorrect
                    ? "border-emerald-200 bg-emerald-50/40"
                    : "border-red-200 bg-red-50/40"
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5">
                    {b.isCorrect ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-neutral-900">
                      {idx + 1}. {b.question}
                    </p>

                    <div className="mt-2 space-y-1">
                      {b.options.map((opt, optIdx) => {
                        const isChosen = b.selectedIndex === optIdx;
                        const isCorrectOpt = b.correctIndex === optIdx;
                        return (
                          <div
                            key={opt}
                            className={`rounded-lg px-2.5 py-1.5 font-medium ${
                              isCorrectOpt
                                ? "bg-emerald-100 text-emerald-900 font-bold"
                                : isChosen
                                ? "bg-red-100 text-red-900 line-through"
                                : "text-neutral-600"
                            }`}
                          >
                            {opt}
                            {isCorrectOpt && " ✓ (Correct)"}
                            {isChosen && !isCorrectOpt && " ✗ (Your Answer)"}
                          </div>
                        );
                      })}
                    </div>

                    {b.explanation && (
                      <p className="mt-2.5 rounded-lg bg-white/80 p-2 text-[11px] text-neutral-600 border border-neutral-200">
                        <strong className="text-neutral-800">Explanation: </strong>
                        {b.explanation}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // View: In-Progress Quiz Questions
  if (quizStarted) {
    const currentQ = activeQuiz.questions[currentQuestionIndex];
    const isFirst = currentQuestionIndex === 0;
    const isLast = currentQuestionIndex === activeQuiz.questions.length - 1;

    return (
      <div className="p-6">
        {/* Progress Bar & Indicators */}
        <div className="flex items-center justify-between text-xs text-neutral-500">
          <span>
            Question {currentQuestionIndex + 1} of {activeQuiz.questions.length}
          </span>
          <span className="flex items-center gap-1 font-semibold text-neutral-900">
            <Clock3 className="h-3.5 w-3.5" />
            {activeQuiz.timeLimitMinutes} Mins
          </span>
        </div>

        <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
          <div
            className="h-full bg-black transition-all duration-300"
            style={{
              width: `${
                ((currentQuestionIndex + 1) / activeQuiz.questions.length) * 100
              }%`,
            }}
          />
        </div>

        {/* Question Bubbles */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {activeQuiz.questions.map((q, idx) => {
            const isAnswered = selectedAnswers[q.id] !== undefined;
            const isCurrent = idx === currentQuestionIndex;
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setCurrentQuestionIndex(idx)}
                className={`h-7 w-7 rounded-lg text-xs font-semibold transition ${
                  isCurrent
                    ? "border-2 border-black bg-black text-white"
                    : isAnswered
                    ? "bg-neutral-800 text-white"
                    : "border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {/* Current Question */}
        <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-5 shadow-2xs">
          <h4 className="text-base font-bold text-neutral-900">
            {currentQuestionIndex + 1}. {currentQ.question}
          </h4>

          {/* Options */}
          <div className="mt-4 space-y-2.5">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedAnswers[currentQ.id] === idx;
              return (
                <div
                  key={option}
                  onClick={() => handleSelectOption(currentQ.id, idx)}
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-3.5 text-xs transition ${
                    isSelected
                      ? "border-black bg-neutral-900 text-white font-semibold"
                      : "border-neutral-200 bg-white text-neutral-800 hover:border-neutral-400"
                  }`}
                >
                  <span>{option}</span>
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

          {/* Navigation Controls */}
          <div className="mt-6 flex items-center justify-between pt-4 border-t border-neutral-100">
            <button
              type="button"
              disabled={isFirst}
              onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 px-3.5 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 disabled:opacity-30"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Previous
            </button>

            {isLast ? (
              <button
                type="button"
                disabled={submitting}
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-neutral-800 disabled:opacity-50"
              >
                {submitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                Submit Quiz
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-black px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-800"
              >
                Next
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // View: Overview & Instructions
  return (
    <div className="p-6">
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                {activeQuiz.difficulty}
              </span>
              <span className="text-xs text-neutral-400">•</span>
              <span className="text-xs font-medium text-neutral-500">
                {activeQuiz.questions.length} Questions
              </span>
            </div>

            <h3 className="mt-2 text-2xl font-bold text-neutral-900">
              {activeQuiz.title}
            </h3>

            <p className="mt-1 max-w-xl text-xs leading-5 text-neutral-600 sm:text-sm">
              {activeQuiz.description}
            </p>

            <div className="mt-4 flex items-center gap-4 text-xs text-neutral-500">
              <span className="flex items-center gap-1.5">
                <Clock3 className="h-4 w-4 text-neutral-400" />
                {activeQuiz.timeLimitMinutes} Minutes Duration
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="h-4 w-4 text-neutral-400" />
                Passing Grade: 70%
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleStartQuiz}
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-black px-6 text-xs font-semibold text-white shadow-xs transition hover:bg-neutral-800 sm:text-sm"
          >
            Start Quiz
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Previous Attempts History */}
        {attempts.length > 0 && (
          <div className="mt-8 border-t border-neutral-100 pt-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Your Past Attempts
            </h4>
            <div className="mt-3 space-y-2">
              {attempts.map((att) => (
                <div
                  key={att._id}
                  className="flex items-center justify-between rounded-xl border border-neutral-200 bg-neutral-50/50 p-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-lg font-bold text-[11px] ${
                        att.percentage >= 70
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-neutral-200 text-neutral-700"
                      }`}
                    >
                      {att.percentage}%
                    </span>
                    <span className="font-semibold text-neutral-800">
                      {att.score} / {att.total} Correct
                    </span>
                  </div>

                  <span className="text-[11px] text-neutral-400">
                    {new Date(att.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
