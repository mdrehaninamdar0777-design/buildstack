import Quiz from "../models/Quiz.js";
import QuizAttempt from "../models/QuizAttempt.js";
import User from "../models/User.js";
import { sendNotification } from "../utils/createNotification.js";

// Initial seed quizzes for core skills
const SEED_QUIZZES = [
  {
    quizId: "html-fundamentals-quiz",
    title: "HTML Fundamentals Quiz",
    description: "Test your understanding of semantic HTML, document structure, forms and accessibility.",
    skillSlug: "html",
    roadmapSlug: "frontend-developer",
    difficulty: "Beginner",
    timeLimitMinutes: 10,
    questions: [
      {
        id: "q1",
        question: "Which HTML5 element is most semantically appropriate for a navigation menu?",
        options: ["<menu>", "<nav>", "<section>", "<navbar>"],
        correctIndex: 1,
        explanation: "The <nav> element represents a section of a page whose purpose is to provide navigation links.",
      },
      {
        id: "q2",
        question: "What is the purpose of the 'alt' attribute on an <img> tag?",
        options: [
          "To provide alternative text for screen readers and when the image fails to load",
          "To change the alignment of the image",
          "To set a tooltip when hovering over the image",
          "To link the image to an external website",
        ],
        correctIndex: 0,
        explanation: "The 'alt' attribute provides alternative information for an image if a user cannot view it, critical for accessibility (a11y).",
      },
      {
        id: "q3",
        question: "Which input type is specifically designed for entering email addresses with built-in client validation?",
        options: ["type='text'", "type='mail'", "type='email'", "type='address'"],
        correctIndex: 2,
        explanation: "type='email' provides built-in browser validation against standard email patterns.",
      },
      {
        id: "q4",
        question: "What does semantic HTML improve most significantly?",
        options: [
          "GPU rendering speed",
          "Search engine optimization (SEO) and accessibility (a11y)",
          "Network payload compression",
          "Database query indexing",
        ],
        correctIndex: 1,
        explanation: "Semantic HTML clearly describes its meaning to both the browser and screen readers/search crawlers.",
      },
    ],
  },
  {
    quizId: "css-core-quiz",
    title: "Modern CSS Mastery Quiz",
    description: "Validate your knowledge of Flexbox, CSS Grid, Box Model, and responsive design.",
    skillSlug: "css",
    roadmapSlug: "frontend-developer",
    difficulty: "Beginner",
    timeLimitMinutes: 10,
    questions: [
      {
        id: "q1",
        question: "In the CSS Box Model, which layer is between padding and margin?",
        options: ["Content", "Border", "Outline", "Clip"],
        correctIndex: 1,
        explanation: "From inside out: Content -> Padding -> Border -> Margin.",
      },
      {
        id: "q2",
        question: "Which CSS Flexbox property aligns items along the cross-axis?",
        options: ["justify-content", "align-items", "flex-direction", "flex-wrap"],
        correctIndex: 1,
        explanation: "align-items aligns flex items along the cross axis, while justify-content aligns along the main axis.",
      },
      {
        id: "q3",
        question: "What does 'box-sizing: border-box' do?",
        options: [
          "Adds an outline around all borders",
          "Includes padding and border within the element's specified width and height",
          "Prevents margins from collapsing",
          "Forces elements into a block-level formatting context",
        ],
        correctIndex: 1,
        explanation: "border-box ensures width and height include padding and borders, avoiding unexpected layout overflows.",
      },
      {
        id: "q4",
        question: "Which CSS unit is relative to the font-size of the root <html> element?",
        options: ["em", "rem", "vh", "%"],
        correctIndex: 1,
        explanation: "rem stands for 'root em', which is relative to the root element's font-size.",
      },
    ],
  },
  {
    quizId: "javascript-essentials-quiz",
    title: "JavaScript ES6+ Essentials Quiz",
    description: "Assess your knowledge of closures, async/await, promises, array methods, and scope.",
    skillSlug: "javascript",
    roadmapSlug: "frontend-developer",
    difficulty: "Intermediate",
    timeLimitMinutes: 15,
    questions: [
      {
        id: "q1",
        question: "What will `typeof NaN` evaluate to in JavaScript?",
        options: ["'number'", "'nan'", "'undefined'", "'object'"],
        correctIndex: 0,
        explanation: "In JavaScript, NaN (Not a Number) is technically a numeric data type, so `typeof NaN === 'number'`.",
      },
      {
        id: "q2",
        question: "Which keyword creates a block-scoped variable that cannot be reassigned?",
        options: ["var", "let", "const", "def"],
        correctIndex: 2,
        explanation: "const declares block-scoped variables that cannot be reassigned.",
      },
      {
        id: "q3",
        question: "What does `Array.prototype.map()` return?",
        options: [
          "A single accumulated value",
          "A new array with the results of calling the function on every element",
          "The first matching item",
          "A boolean indicating if elements pass the test",
        ],
        correctIndex: 1,
        explanation: "map() creates a brand new array populated with the results of calling a provided function on every element.",
      },
      {
        id: "q4",
        question: "What is an event loop in JavaScript?",
        options: [
          "A loop that repeats animations at 60fps",
          "A mechanism that coordinates the execution of asynchronous callbacks and the call stack",
          "A syntax construct for handling click events",
          "A thread pool managed by the CPU",
        ],
        correctIndex: 1,
        explanation: "The event loop continuously monitors the Call Stack and the Task/Microtask Queues to execute deferred callbacks.",
      },
    ],
  },
  {
    quizId: "react-architecture-quiz",
    title: "React 19 & Hooks Architecture Quiz",
    description: "Test your React expertise in hooks, component lifecycles, state management, and reconciliation.",
    skillSlug: "react",
    roadmapSlug: "frontend-developer",
    difficulty: "Intermediate",
    timeLimitMinutes: 12,
    questions: [
      {
        id: "q1",
        question: "What is the primary rule regarding React Hook calls?",
        options: [
          "Hooks must only be called at the top level of React functions, not inside loops, conditions, or nested functions",
          "Hooks must always return a JSX element",
          "Hooks can only be called inside class components",
          "Hooks require an asynchronous await statement",
        ],
        correctIndex: 0,
        explanation: "Calling hooks at top level ensures React preserves state order across consecutive renders.",
      },
      {
        id: "q2",
        question: "What does the second argument (dependency array) of `useEffect` control?",
        options: [
          "The priority of the effect in the microtask queue",
          "Which props or state changes cause the effect to re-run",
          "The timeout duration before the effect starts",
          "The component that receives the cleanup return",
        ],
        correctIndex: 1,
        explanation: "React only re-runs the effect if values in the dependency array have changed since the last render.",
      },
      {
        id: "q3",
        question: "When should you use `useCallback`?",
        options: [
          "For every single function defined in a component",
          "To memoize a callback function reference across re-renders when passing to optimized child components",
          "To trigger side-effects after state updates",
          "To fetch remote API data",
        ],
        correctIndex: 1,
        explanation: "useCallback caches a function definition between renders, useful when passing callbacks to memoized children.",
      },
      {
        id: "q4",
        question: "Why should state in React never be mutated directly (e.g. `state.count++`)?",
        options: [
          "It throws an immediate runtime syntax error",
          "React relies on reference equality to detect state changes and schedule re-renders",
          "It corrupts the browser's DOM cache",
          "It causes JavaScript to switch to strict mode",
        ],
        correctIndex: 1,
        explanation: "Direct mutation modifies the existing object reference without triggering a reconciliation or UI re-render.",
      },
    ],
  },
  {
    quizId: "nodejs-fundamentals-quiz",
    title: "Node.js & Express Architecture Quiz",
    description: "Test your understanding of asynchronous I/O, middleware, HTTP status codes, and security.",
    skillSlug: "node-js",
    roadmapSlug: "backend-developer",
    difficulty: "Intermediate",
    timeLimitMinutes: 12,
    questions: [
      {
        id: "q1",
        question: "What is the core architecture principle of Node.js?",
        options: [
          "Multi-threaded blocking I/O model",
          "Single-threaded event loop with non-blocking asynchronous I/O",
          "Compiled bytecode execution inside kernel space",
          "Synchronous procedural dispatching",
        ],
        correctIndex: 1,
        explanation: "Node.js runs on the V8 engine using a single-threaded event loop and delegates non-blocking I/O to libuv.",
      },
      {
        id: "q2",
        question: "In Express.js, what does calling `next()` inside a middleware function do?",
        options: [
          "Immediately terminates the HTTP response",
          "Passes control to the next middleware function in the stack",
          "Restarts the application server",
          "Cancels the current database query",
        ],
        correctIndex: 1,
        explanation: "next() passes execution control to the next matching middleware in the Express processing pipeline.",
      },
    ],
  },
];

/**
 * Ensure seed quizzes are in MongoDB.
 */
async function ensureSeedQuizzes() {
  for (const seed of SEED_QUIZZES) {
    await Quiz.findOneAndUpdate(
      { quizId: seed.quizId },
      { $setOnInsert: seed },
      { upsert: true, setDefaultsOnInsert: true }
    );
  }
}

/**
 * GET /api/quizzes
 * Retrieve quizzes, optionally filtered by skillSlug or roadmapSlug.
 */
export async function getQuizzes(req, res, next) {
  try {
    await ensureSeedQuizzes();

    const { skillSlug, roadmapSlug } = req.query;
    const filter = {};
    if (skillSlug) filter.skillSlug = skillSlug;
    if (roadmapSlug) filter.roadmapSlug = roadmapSlug;

    const quizzes = await Quiz.find(filter).select("-questions.correctIndex");

    return res.status(200).json({
      success: true,
      quizzes,
    });
  } catch (err) {
    return next(err);
  }
}

/**
 * GET /api/quizzes/:id
 * Retrieve a single quiz without exposing correct answers.
 */
export async function getQuizById(req, res, next) {
  try {
    await ensureSeedQuizzes();

    const quiz = await Quiz.findOne({
      $or: [{ quizId: req.params.id }, { _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }],
    }).select("-questions.correctIndex");

    if (!quiz) {
      return res.status(404).json({ success: false, message: "Quiz not found." });
    }

    return res.status(200).json({ success: true, quiz });
  } catch (err) {
    return next(err);
  }
}

/**
 * POST /api/quizzes/:id/submit
 * Server-side evaluation of submitted quiz answers.
 * Calculates score, records attempt, triggers notifications & achievements.
 */
export async function submitQuiz(req, res, next) {
  try {
    const { answers } = req.body || {}; // array of { questionId, selectedIndex }

    if (!Array.isArray(answers)) {
      return res.status(400).json({ success: false, message: "Answers array is required." });
    }

    const quiz = await Quiz.findOne({
      $or: [{ quizId: req.params.id }, { _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }],
    });

    if (!quiz) {
      return res.status(404).json({ success: false, message: "Quiz not found." });
    }

    let score = 0;
    const total = quiz.questions.length;
    const answerBreakdown = [];

    for (const q of quiz.questions) {
      const userSubmission = answers.find((a) => a.questionId === q.id);
      const selectedIndex = userSubmission !== undefined ? Number(userSubmission.selectedIndex) : -1;
      const isCorrect = selectedIndex === q.correctIndex;

      if (isCorrect) score += 1;

      answerBreakdown.push({
        questionId: q.id,
        question: q.question,
        options: q.options,
        selectedIndex,
        correctIndex: q.correctIndex,
        isCorrect,
        explanation: q.explanation || "",
      });
    }

    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

    // Record the attempt
    const attempt = await QuizAttempt.create({
      firebaseUid: req.user.uid,
      quizId: quiz.quizId,
      quizTitle: quiz.title,
      skillSlug: quiz.skillSlug,
      score,
      total,
      percentage,
      answers: answerBreakdown.map((a) => ({
        questionId: a.questionId,
        selectedIndex: a.selectedIndex,
        correctIndex: a.correctIndex,
        isCorrect: a.isCorrect,
      })),
    });

    // Update user learning activity
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (user) {
      user.recentActivity = user.recentActivity || [];
      user.recentActivity.unshift({
        title: `Completed ${quiz.title} (${percentage}%)`,
        type: "quiz",
        time: "Just now",
        createdAt: new Date(),
      });
      if (user.recentActivity.length > 30) user.recentActivity.pop();

      // Award quiz ace achievement if >= 80%
      if (percentage >= 80) {
        user.achievements = user.achievements || [];
        const badgeId = `quiz-${quiz.quizId}`;
        const hasBadge = user.achievements.some((a) => a.id === badgeId);
        if (!hasBadge) {
          user.achievements.push({
            id: badgeId,
            title: `${quiz.title} Ace`,
            description: `Scored ${percentage}% on ${quiz.title}!`,
            earnedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            icon: "Award",
          });
        }
      }

      await user.save();
    }

    // In-app notification
    await sendNotification({
      firebaseUid: req.user.uid,
      title: "Quiz Completed",
      message: `You scored ${score}/${total} (${percentage}%) on "${quiz.title}".`,
      type: "quiz",
      link: `/learn/skills/${quiz.skillSlug}`,
    });

    return res.status(200).json({
      success: true,
      result: {
        score,
        total,
        percentage,
        passed: percentage >= 70,
        breakdown: answerBreakdown,
        attemptId: attempt._id,
      },
    });
  } catch (err) {
    return next(err);
  }
}

/**
 * GET /api/quizzes/:id/attempts
 * List previous attempts by authenticated user for this quiz.
 */
export async function getQuizAttempts(req, res, next) {
  try {
    const attempts = await QuizAttempt.find({
      firebaseUid: req.user.uid,
      quizId: req.params.id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      attempts,
    });
  } catch (err) {
    return next(err);
  }
}
