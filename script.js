const TOTAL_QUESTIONS = 10;
const HISTORY_KEY = "best-math-game-history";
const LANGUAGE_KEY = "best-math-game-language";
const MODE_KEY = "best-math-game-mode";

const MESSAGES = {
  en: {
    title: "🌟 Best Math Game",
    subtitle: "Practice multiplication from 1×1 to 10×10.",
    languageLabel: "Language",
    languagePickerAria: "Choose language",
    languageOptionEn: "English",
    languageOptionDe: "German",
    languageOptionFr: "French",
    modeLabel: "Game Mode",
    modePickerAria: "Choose game mode",
    modeInput: "Type Answer",
    modeChoice: "4 Choices",
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
    correct: "Great job! +1 point",
    streakBonus: "🔥 Streak bonus!",
    niceTry: "Nice try!",
    practice: "Practice"
  },
  de: {
    title: "🌟 Bestes Mathe-Spiel",
    subtitle: "Übe das Einmaleins von 1×1 bis 10×10.",
    languageLabel: "Sprache",
    languagePickerAria: "Sprache wählen",
    languageOptionEn: "Englisch",
    languageOptionDe: "Deutsch",
    languageOptionFr: "Französisch",
    modeLabel: "Spielmodus",
    modePickerAria: "Spielmodus wählen",
    modeInput: "Antwort tippen",
    modeChoice: "4 Auswahlantworten",
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
    correct: "Super! +1 Punkt",
    streakBonus: "🔥 Serienbonus!",
    niceTry: "Guter Versuch!",
    practice: "Üben"
  },
  fr: {
    title: "🌟 Super Jeu de Maths",
    subtitle: "Entraîne la multiplication de 1×1 à 10×10.",
    languageLabel: "Langue",
    languagePickerAria: "Choisir la langue",
    languageOptionEn: "Anglais",
    languageOptionDe: "Allemand",
    languageOptionFr: "Français",
    modeLabel: "Mode de jeu",
    modePickerAria: "Choisir le mode de jeu",
    modeInput: "Écrire la réponse",
    modeChoice: "4 choix",
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
    correct: "Bravo ! +1 point",
    streakBonus: "🔥 Bonus de série !",
    niceTry: "Bien essayé !",
    practice: "À travailler"
  }
};

const LOCALES = { en: "en-US", de: "de-DE", fr: "fr-FR" };
const CORRECT_EMOJIS = ["🤩", "🥳", "🎉", "🦄", "😺", "🚀"];

const state = {
  currentQuestion: 1,
  score: 0,
  streak: 0,
  locked: false,
  a: 1,
  b: 1,
  misses: [],
  language: localStorage.getItem(LANGUAGE_KEY) || "de",
  mode: localStorage.getItem(MODE_KEY) || "input"
};

const ui = {
  title: document.getElementById("title"),
  subtitle: document.getElementById("subtitle"),
  languageLabel: document.getElementById("language-label"),
  languageSelect: document.getElementById("language-select"),
  languageOptionEn: document.getElementById("lang-option-en"),
  languageOptionDe: document.getElementById("lang-option-de"),
  languageOptionFr: document.getElementById("lang-option-fr"),
  modeLabel: document.getElementById("mode-label"),
  modeSelect: document.getElementById("mode-select"),
  modeOptionInput: document.getElementById("mode-option-input"),
  modeOptionChoice: document.getElementById("mode-option-choice"),
  questionLabel: document.getElementById("question-label"),
  scoreLabel: document.getElementById("score-label"),
  streakLabel: document.getElementById("streak-label"),
  questionCount: document.getElementById("question-count"),
  score: document.getElementById("score"),
  streak: document.getElementById("streak"),
  question: document.getElementById("question"),
  answerRow: document.getElementById("answer-row"),
  answer: document.getElementById("answer"),
  submit: document.getElementById("submit"),
  choiceRow: document.getElementById("choice-row"),
  next: document.getElementById("next"),
  newGame: document.getElementById("new-game"),
  feedback: document.getElementById("feedback"),
  progressTitle: document.getElementById("progress-title"),
  best: document.getElementById("best"),
  historyList: document.getElementById("history-list")
};

function t(key) {
  return MESSAGES[state.language]?.[key] || MESSAGES.de[key] || key;
}

function currentLocale() {
  return LOCALES[state.language] || LOCALES.de;
}

function randFactor() {
  return Math.floor(Math.random() * 10) + 1;
}

function randomCorrectEmoji() {
  return CORRECT_EMOJIS[Math.floor(Math.random() * CORRECT_EMOJIS.length)];
}

function applyTranslations() {
  document.documentElement.lang = state.language;
  ui.title.textContent = t("title");
  ui.subtitle.textContent = t("subtitle");
  ui.languageLabel.textContent = t("languageLabel");
  ui.languageSelect.setAttribute("aria-label", t("languagePickerAria"));
  ui.languageOptionEn.textContent = t("languageOptionEn");
  ui.languageOptionDe.textContent = t("languageOptionDe");
  ui.languageOptionFr.textContent = t("languageOptionFr");
  ui.modeLabel.textContent = t("modeLabel");
  ui.modeSelect.setAttribute("aria-label", t("modePickerAria"));
  ui.modeOptionInput.textContent = t("modeInput");
  ui.modeOptionChoice.textContent = t("modeChoice");
  ui.questionLabel.textContent = t("questionLabel");
  ui.scoreLabel.textContent = t("scoreLabel");
  ui.streakLabel.textContent = t("streakLabel");
  ui.submit.textContent = t("submit");
  ui.next.textContent = t("next");
  ui.newGame.textContent = t("newGame");
  ui.progressTitle.textContent = t("progressTitle");
  renderHistory();
}

function applyModeUI() {
  const choiceMode = state.mode === "choice";
  ui.answerRow.hidden = choiceMode;
  ui.choiceRow.hidden = !choiceMode;
}

function renderStats() {
  ui.questionCount.textContent = String(state.currentQuestion);
  ui.score.textContent = String(state.score);
  ui.streak.textContent = String(state.streak);
}

function generateChoices(correct) {
  const candidates = new Set();
  const nearProducts = [
    Math.max(1, state.a - 1) * state.b,
    Math.max(1, state.a - 2) * state.b,
    state.a * Math.max(1, state.b - 1),
    state.a * Math.max(1, state.b - 2),
    Math.min(10, state.a + 1) * state.b,
    state.a * Math.min(10, state.b + 1)
  ];

  nearProducts.forEach((value) => {
    if (value !== correct && value > 0 && value <= 100) candidates.add(value);
  });

  while (candidates.size < 3) {
    const jitter = Math.floor(Math.random() * 7) + 1;
    const candidate = Math.max(1, correct + (Math.random() > 0.5 ? jitter : -jitter));
    if (candidate !== correct && candidate <= 100) candidates.add(candidate);
  }

  const options = [correct, ...Array.from(candidates).slice(0, 3)];
  for (let i = options.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
}

function renderChoiceButtons() {
  const correct = state.a * state.b;
  const options = generateChoices(correct);
  ui.choiceRow.innerHTML = "";

  options.forEach((option) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice-btn";
    btn.textContent = String(option);
    btn.disabled = false;
    btn.addEventListener("click", () => checkAnswer(option));
    ui.choiceRow.appendChild(btn);
  });
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

  applyModeUI();
  if (state.mode === "choice") {
    renderChoiceButtons();
  } else {
    ui.answer.focus();
  }
}

function endRound() {
  ui.submit.disabled = true;
  ui.next.disabled = true;
  const accuracy = Math.round((state.score / TOTAL_QUESTIONS) * 100);
  const history = loadHistory();
  history.unshift({
    date: new Date().toLocaleString(currentLocale()),
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

function lockChoiceButtons() {
  Array.from(ui.choiceRow.querySelectorAll("button")).forEach((btn) => {
    btn.disabled = true;
  });
}

function checkAnswer(choiceValue) {
  if (state.locked) return;
  const expected = state.a * state.b;
  const value = state.mode === "choice" ? Number(choiceValue) : Number(ui.answer.value);

  if (value === expected) {
    state.score += 1;
    state.streak += 1;
    const bonusText = state.streak >= 3 ? ` ${t("streakBonus")}` : "";
    ui.feedback.textContent = `${randomCorrectEmoji()} ${t("correct")}${bonusText}`;
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
  lockChoiceButtons();
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

ui.submit.addEventListener("click", () => checkAnswer());
ui.next.addEventListener("click", nextStep);
ui.newGame.addEventListener("click", resetGame);
ui.languageSelect.addEventListener("change", (event) => {
  state.language = event.target.value;
  localStorage.setItem(LANGUAGE_KEY, state.language);
  applyTranslations();
});
ui.modeSelect.addEventListener("change", (event) => {
  state.mode = event.target.value;
  localStorage.setItem(MODE_KEY, state.mode);
  resetGame();
  applyTranslations();
});
ui.answer.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !ui.submit.disabled && state.mode === "input") {
    checkAnswer();
  }
});

if (!MESSAGES[state.language]) state.language = "de";
if (!["input", "choice"].includes(state.mode)) state.mode = "input";
ui.languageSelect.value = state.language;
ui.modeSelect.value = state.mode;
applyTranslations();
resetGame();
