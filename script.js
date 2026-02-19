const TOTAL_QUESTIONS = 10;
const HISTORY_KEY = "best-math-game-history";
const LANGUAGE_KEY = "best-math-game-language";

const MESSAGES = {
  en: {
    title: "🌟 Best Math Game",
    subtitle: "Practice multiplication from 1×1 to 10×10.",
    languageLabel: "Language",
    questionLabel: "Question",
    scoreLabel: "Score",
    streakLabel: "Streak",
    submit: "Submit",
    next: "Next",
    newGame: "New Game",
    progressTitle: "📈 Progress",
    bestAccuracy: "Best Accuracy",
    roundComplete: "Round complete!",
    greatPractice: "⭐ Great practice!",
    perfectReward: "🏆 Perfect! You unlocked a Super Star reward!",
    goldReward: "🎉 Awesome! You earned a Gold Badge!",
    correct: "Correct! +1 point",
    streakBonus: "🔥 Streak bonus!",
    niceTry: "Nice try!",
    practice: "Practice"
  },
  de: {
    title: "🌟 Bestes Mathe-Spiel",
    subtitle: "Übe das Einmaleins von 1×1 bis 10×10.",
    languageLabel: "Sprache",
    questionLabel: "Frage",
    scoreLabel: "Punkte",
    streakLabel: "Serie",
    submit: "Antworten",
    next: "Weiter",
    newGame: "Neues Spiel",
    progressTitle: "📈 Fortschritt",
    bestAccuracy: "Beste Genauigkeit",
    roundComplete: "Runde beendet!",
    greatPractice: "⭐ Tolle Übung!",
    perfectReward: "🏆 Perfekt! Du hast eine Super-Stern-Belohnung erhalten!",
    goldReward: "🎉 Super! Du hast ein Gold-Abzeichen bekommen!",
    correct: "Richtig! +1 Punkt",
    streakBonus: "🔥 Serienbonus!",
    niceTry: "Guter Versuch!",
    practice: "Üben"
  },
  fr: {
    title: "🌟 Super Jeu de Maths",
    subtitle: "Entraîne la multiplication de 1×1 à 10×10.",
    languageLabel: "Langue",
    questionLabel: "Question",
    scoreLabel: "Score",
    streakLabel: "Série",
    submit: "Valider",
    next: "Suivant",
    newGame: "Nouveau jeu",
    progressTitle: "📈 Progrès",
    bestAccuracy: "Meilleure précision",
    roundComplete: "Manche terminée !",
    greatPractice: "⭐ Super entraînement !",
    perfectReward: "🏆 Parfait ! Tu as débloqué une récompense Super Étoile !",
    goldReward: "🎉 Génial ! Tu as gagné un badge Or !",
    correct: "+1 point, bonne réponse !",
    streakBonus: "🔥 Bonus de série !",
    niceTry: "Bien essayé !",
    practice: "À travailler"
  }
};

const state = {
  currentQuestion: 1,
  score: 0,
  streak: 0,
  locked: false,
  a: 1,
  b: 1,
  misses: [],
  language: localStorage.getItem(LANGUAGE_KEY) || "en"
};

const ui = {
  title: document.getElementById("title"),
  subtitle: document.getElementById("subtitle"),
  languageLabel: document.getElementById("language-label"),
  languageSelect: document.getElementById("language-select"),
  questionLabel: document.getElementById("question-label"),
  scoreLabel: document.getElementById("score-label"),
  streakLabel: document.getElementById("streak-label"),
  questionCount: document.getElementById("question-count"),
  score: document.getElementById("score"),
  streak: document.getElementById("streak"),
  question: document.getElementById("question"),
  answer: document.getElementById("answer"),
  submit: document.getElementById("submit"),
  next: document.getElementById("next"),
  newGame: document.getElementById("new-game"),
  feedback: document.getElementById("feedback"),
  progressTitle: document.getElementById("progress-title"),
  best: document.getElementById("best"),
  historyList: document.getElementById("history-list")
};

function t(key) {
  return MESSAGES[state.language]?.[key] || MESSAGES.en[key] || key;
}

function applyTranslations() {
  ui.title.textContent = t("title");
  ui.subtitle.textContent = t("subtitle");
  ui.languageLabel.textContent = t("languageLabel");
  ui.questionLabel.textContent = t("questionLabel");
  ui.scoreLabel.textContent = t("scoreLabel");
  ui.streakLabel.textContent = t("streakLabel");
  ui.submit.textContent = t("submit");
  ui.next.textContent = t("next");
  ui.newGame.textContent = t("newGame");
  ui.progressTitle.textContent = t("progressTitle");
  renderHistory();
}

function randFactor() {
  return Math.floor(Math.random() * 10) + 1;
}

function renderStats() {
  ui.questionCount.textContent = String(state.currentQuestion);
  ui.score.textContent = String(state.score);
  ui.streak.textContent = String(state.streak);
}

function newQuestion() {
  state.a = randFactor();
  state.b = randFactor();
  state.locked = false;
  ui.question.textContent = `${state.a} × ${state.b} = ?`;
  ui.answer.value = "";
  ui.feedback.textContent = "";
  ui.feedback.className = "";
  ui.submit.disabled = false;
  ui.next.disabled = true;
  ui.answer.focus();
}

function endRound() {
  ui.submit.disabled = true;
  ui.next.disabled = true;
  const accuracy = Math.round((state.score / TOTAL_QUESTIONS) * 100);
  const history = loadHistory();
  history.unshift({
    date: new Date().toLocaleString(),
    score: state.score,
    total: TOTAL_QUESTIONS,
    accuracy,
    misses: state.misses
  });
  saveHistory(history.slice(0, 10));

  let reward = t("greatPractice");
  if (accuracy === 100) reward = t("perfectReward");
  else if (accuracy >= 80) reward = t("goldReward");

  ui.feedback.textContent = `${t("roundComplete")} ${reward}`;
  ui.feedback.className = "ok";
  renderHistory();
}

function checkAnswer() {
  if (state.locked) return;
  const expected = state.a * state.b;
  const value = Number(ui.answer.value);

  if (value === expected) {
    state.score += 1;
    state.streak += 1;
    const bonusText = state.streak >= 3 ? ` ${t("streakBonus")}` : "";
    ui.feedback.textContent = `${t("correct")}${bonusText}`;
    ui.feedback.className = "ok";
  } else {
    state.streak = 0;
    state.misses.push(`${state.a}×${state.b}`);
    ui.feedback.textContent = `${t("niceTry")} ${state.a} × ${state.b} = ${expected}`;
    ui.feedback.className = "bad";
  }

  state.locked = true;
  ui.submit.disabled = true;
  ui.next.disabled = false;
  renderStats();
}

function nextStep() {
  if (state.currentQuestion >= TOTAL_QUESTIONS) {
    endRound();
    return;
  }
  state.currentQuestion += 1;
  renderStats();
  newQuestion();
}

function loadHistory() {
  const raw = localStorage.getItem(HISTORY_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveHistory(history) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function renderHistory() {
  const history = loadHistory();
  const best = history.reduce((max, row) => Math.max(max, row.accuracy), 0);
  ui.best.textContent = `${t("bestAccuracy")}: ${best}%`;
  ui.historyList.innerHTML = "";

  history.slice(0, 5).forEach((row) => {
    const li = document.createElement("li");
    li.textContent = `${row.date}: ${row.score}/${row.total} (${row.accuracy}%)${
      row.misses?.length ? ` | ${t("practice")}: ${row.misses.join(", ")}` : ""
    }`;
    ui.historyList.appendChild(li);
  });
}

function resetGame() {
  state.currentQuestion = 1;
  state.score = 0;
  state.streak = 0;
  state.misses = [];
  renderStats();
  newQuestion();
}

ui.submit.addEventListener("click", checkAnswer);
ui.next.addEventListener("click", nextStep);
ui.newGame.addEventListener("click", resetGame);
ui.languageSelect.addEventListener("change", (event) => {
  state.language = event.target.value;
  localStorage.setItem(LANGUAGE_KEY, state.language);
  applyTranslations();
});
ui.answer.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !ui.submit.disabled) {
    checkAnswer();
  }
});

if (!MESSAGES[state.language]) {
  state.language = "en";
}
ui.languageSelect.value = state.language;
applyTranslations();
renderHistory();
resetGame();
