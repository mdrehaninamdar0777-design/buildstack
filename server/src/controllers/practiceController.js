import PracticeQuestion from "../models/PracticeQuestion.js";
import PracticeAttempt from "../models/PracticeAttempt.js";
import User from "../models/User.js";

const SEED_PRACTICE = [
  {
    questionId: "js-closure-01",
    title: "Closure & Variable Scope",
    skillSlug: "javascript",
    topic: "Closures",
    difficulty: "Medium",
    format: "mcq",
    description: "What will be logged to the console when `counter()` is executed twice?",
    codeSnippet: `function makeCounter() {\n  let count = 0;\n  return function() {\n    count += 1;\n    return count;\n  };\n}\nconst counter = makeCounter();\nconsole.log(counter(), counter());`,
    options: ["0 1", "1 2", "1 1", "undefined undefined"],
    acceptedAnswers: ["1 2", "1"],
    explanation: "The returned function closes over the local variable `count` and increments its value on each call, producing 1 then 2.",
    constraints: ["ECMAScript 2015+ execution environment"],
    hints: ["Consider whether `count` is re-initialized on every inner function call."],
  },
  {
    questionId: "react-effect-cleanup-01",
    title: "useEffect Cleanup Function",
    skillSlug: "react",
    topic: "Hooks",
    difficulty: "Easy",
    format: "mcq",
    description: "When does the cleanup function returned by `useEffect` execute?",
    codeSnippet: `useEffect(() => {\n  const timer = setInterval(tick, 1000);\n  return () => clearInterval(timer);\n}, [tick]);`,
    options: [
      "Only when the browser window closes",
      "Before the effect runs again and when the component unmounts",
      "Immediately after the initial render",
      "Whenever state outside the component changes",
    ],
    acceptedAnswers: ["Before the effect runs again and when the component unmounts", "1"],
    explanation: "React cleans up effects from the previous render before running effects for the next render, and also on unmount.",
    constraints: ["React 16.8+"],
    hints: ["Think about preventing memory leaks on repeated effect triggers."],
  },
  {
    questionId: "css-flexbox-center-01",
    title: "Centering with Flexbox",
    skillSlug: "css",
    topic: "Flexbox",
    difficulty: "Easy",
    format: "mcq",
    description: "Which two CSS declarations center a child element both horizontally and vertically inside a flex container?",
    codeSnippet: `.container {\n  display: flex;\n  /* Which properties go here? */\n}`,
    options: [
      "justify-content: center; align-items: center;",
      "text-align: center; vertical-align: middle;",
      "margin: auto 0; float: center;",
      "align-content: middle; justify-items: center;",
    ],
    acceptedAnswers: ["justify-content: center; align-items: center;", "0"],
    explanation: "`justify-content: center` centers along the main axis, and `align-items: center` centers along the cross axis.",
    constraints: ["Standard CSS3 Display Flex"],
    hints: ["One property targets the main axis, the other targets the cross axis."],
  },
  {
    questionId: "html-semantic-element-01",
    title: "Main Content Semantic Tag",
    skillSlug: "html",
    topic: "Semantic Structure",
    difficulty: "Easy",
    format: "short_answer",
    description: "What single HTML5 tag should enclose the dominant, non-repeated content of the <body> (excluding headers, footers and navigation)? Answer with just the tag name (without brackets).",
    codeSnippet: `<body>\n  <header>...</header>\n  <!-- What tag goes here? -->\n  <footer>...</footer>\n</body>`,
    options: [],
    acceptedAnswers: ["main", "<main>", "<main></main>"],
    explanation: "The <main> tag designates the dominant contents of the document unique to that page.",
    constraints: ["A document must not have more than one non-hidden <main> element."],
    hints: ["It is a 4-letter word starting with 'm'."],
  },
  {
    questionId: "node-status-code-01",
    title: "REST HTTP Created Status",
    skillSlug: "node-js",
    topic: "HTTP & REST",
    difficulty: "Easy",
    format: "short_answer",
    description: "Which standard 3-digit HTTP status code indicates that a request has succeeded and resulted in a new resource being created?",
    codeSnippet: `app.post('/api/items', (req, res) => {\n  const item = createItem(req.body);\n  res.status(/* ??? */).json(item);\n});`,
    options: [],
    acceptedAnswers: ["201"],
    explanation: "HTTP 201 Created signifies that the request succeeded and a new resource was generated.",
    constraints: ["RFC 7231 standard"],
    hints: ["It is in the 2xx success range."],
  },
];

async function ensureSeedPractice() {
  for (const item of SEED_PRACTICE) {
    await PracticeQuestion.findOneAndUpdate(
      { questionId: item.questionId },
      { $setOnInsert: item },
      { upsert: true, setDefaultsOnInsert: true }
    );
  }
}

/**
 * GET /api/practice
 * Browse practice questions filtered by skill, topic, and difficulty.
 */
export async function getPracticeQuestions(req, res, next) {
  try {
    await ensureSeedPractice();

    const { skillSlug, topic, difficulty, search } = req.query;
    const filter = {};

    if (skillSlug) filter.skillSlug = skillSlug;
    if (topic && topic !== "All") filter.topic = topic;
    if (difficulty && difficulty !== "All") filter.difficulty = difficulty;
    if (search && search.trim()) {
      filter.$or = [
        { title: { $regex: search.trim(), $options: "i" } },
        { description: { $regex: search.trim(), $options: "i" } },
        { topic: { $regex: search.trim(), $options: "i" } },
      ];
    }

    // Exclude accepted answers from public catalog
    const questions = await PracticeQuestion.find(filter)
      .select("-acceptedAnswers")
      .sort({ createdAt: -1 });

    // Fetch user attempts to annotate solved status
    const attempts = await PracticeAttempt.find({ firebaseUid: req.user.uid });
    const solvedMap = new Set(
      attempts.filter((a) => a.isCorrect).map((a) => a.questionId)
    );
    const attemptedMap = new Set(attempts.map((a) => a.questionId));

    const enriched = questions.map((q) => {
      const obj = q.toObject();
      obj.isSolved = solvedMap.has(q.questionId);
      obj.isAttempted = attemptedMap.has(q.questionId);
      return obj;
    });

    return res.status(200).json({
      success: true,
      questions: enriched,
    });
  } catch (err) {
    return next(err);
  }
}

/**
 * GET /api/practice/:id
 * Get single practice question.
 */
export async function getPracticeQuestionById(req, res, next) {
  try {
    await ensureSeedPractice();

    const question = await PracticeQuestion.findOne({
      $or: [
        { questionId: req.params.id },
        { _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null },
      ],
    }).select("-acceptedAnswers");

    if (!question) {
      return res.status(404).json({ success: false, message: "Question not found." });
    }

    return res.status(200).json({ success: true, question });
  } catch (err) {
    return next(err);
  }
}

/**
 * POST /api/practice/:id/submit
 * Evaluate submitted answer.
 */
export async function submitPracticeAnswer(req, res, next) {
  try {
    const { answer } = req.body || {};

    if (answer === undefined || answer === null || String(answer).trim() === "") {
      return res.status(400).json({ success: false, message: "Answer is required." });
    }

    const question = await PracticeQuestion.findOne({
      $or: [
        { questionId: req.params.id },
        { _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null },
      ],
    });

    if (!question) {
      return res.status(404).json({ success: false, message: "Question not found." });
    }

    const cleanInput = String(answer).trim().toLowerCase();
    const isCorrect = question.acceptedAnswers.some(
      (acc) => String(acc).trim().toLowerCase() === cleanInput
    );

    // Save attempt
    await PracticeAttempt.create({
      firebaseUid: req.user.uid,
      questionId: question.questionId,
      skillSlug: question.skillSlug,
      userAnswer: String(answer).trim(),
      isCorrect,
      explanation: question.explanation || "",
    });

    if (isCorrect) {
      // Record activity
      const user = await User.findOne({ firebaseUid: req.user.uid });
      if (user) {
        user.recentActivity = user.recentActivity || [];
        user.recentActivity.unshift({
          title: `Solved practice problem: ${question.title}`,
          type: "practice",
          time: "Just now",
          createdAt: new Date(),
        });
        if (user.recentActivity.length > 30) user.recentActivity.pop();
        await user.save();
      }
    }

    return res.status(200).json({
      success: true,
      isCorrect,
      explanation: question.explanation,
      acceptedAnswers: isCorrect ? question.acceptedAnswers : undefined,
    });
  } catch (err) {
    return next(err);
  }
}

/**
 * GET /api/practice/my/history
 * Retrieve user's practice attempt history.
 */
export async function getPracticeHistory(req, res, next) {
  try {
    const history = await PracticeAttempt.find({ firebaseUid: req.user.uid })
      .sort({ createdAt: -1 })
      .limit(50);

    return res.status(200).json({ success: true, history });
  } catch (err) {
    return next(err);
  }
}
