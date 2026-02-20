const TOTAL_QUESTIONS = 10;
const HISTORY_KEY = "best-math-game-history";
const LANGUAGE_KEY = "best-math-game-language";
const MODE_KEY = "best-math-game-mode";

const MESSAGES = {
  en: {
    title: "🌟 Best Math Game",
    subtitle: "Choose language and game mode to start.",
    gameSubtitleMultiplication: "Practice multiplication from 1×1 to 10×10.",
    gameSubtitleAddition: "Practice additions from 1 to 100 (sum max 100).",
    languageLabel: "Language",
    languagePickerAria: "Choose language",
    languageOptionEn: "English",
    languageOptionDe: "German",
    languageOptionFr: "French",
    modeLabel: "Game Mode",
    modeInput: "Type Answer (Multiplication)",
    modeChoice: "4 Choices (Multiplication)",
    modeAddition: "4 Choices (Addition up to 100)",
    questionLabel: "Question",
    scoreLabel: "Score",
    streakLabel: "Streak",
    submit: "Submit",
    next: "Next",
    newGame: "New Game",
    progressTitle: "📈 Progress",
    bestAccuracy: "Best Accuracy",
    durationLabel: "Duration",
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
    subtitle: "Sprache und Spielmodus auswählen, dann starten.",
    gameSubtitleMultiplication: "Übe das Einmaleins von 1×1 bis 10×10.",
    gameSubtitleAddition: "Übe Plusaufgaben von 1 bis 100 (Summe max. 100).",
    languageLabel: "Sprache",
    languagePickerAria: "Sprache wählen",
    languageOptionEn: "Englisch",
    languageOptionDe: "Deutsch",
    languageOptionFr: "Französisch",
    modeLabel: "Spielmodus",
    modeInput: "Antwort tippen (Mal)",
    modeChoice: "4 Auswahlantworten (Mal)",
    modeAddition: "4 Auswahlantworten (Plus bis 100)",
    questionLabel: "Frage",
    scoreLabel: "Punkte",
    streakLabel: "Serie",
    submit: "Antworten",
    next: "Weiter",
    newGame: "Neues Spiel",
    progressTitle: "📈 Fortschritt",
    bestAccuracy: "Beste Genauigkeit",
    durationLabel: "Dauer",
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
    subtitle: "Choisis la langue et le mode de jeu pour commencer.",
    gameSubtitleMultiplication: "Entraîne la multiplication de 1×1 à 10×10.",
    gameSubtitleAddition: "Entraîne l'addition de 1 à 100 (somme max 100).",
    languageLabel: "Langue",
    languagePickerAria: "Choisir la langue",
    languageOptionEn: "Anglais",
    languageOptionDe: "Allemand",
    languageOptionFr: "Français",
    modeLabel: "Mode de jeu",
    modeInput: "Écrire la réponse (Multiplication)",
    modeChoice: "4 choix (Multiplication)",
    modeAddition: "4 choix (Addition jusqu'à 100)",
    questionLabel: "Question",
    scoreLabel: "Score",
    streakLabel: "Série",
    submit: "Valider",
    next: "Suivant",
    newGame: "Nouveau jeu",
    progressTitle: "📈 Progrès",
    bestAccuracy: "Meilleure précision",
    durationLabel: "Durée",
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
  mode: localStorage.getItem(MODE_KEY) || "choice",
  roundStartedAt: Date.now()
};

const ui = {
  menuPage: document.getElementById("menu-page"),
  gamePage: document.getElementById("game-page"),
  title: document.getElementById("title"),
  subtitle: document.getElementById("subtitle"),
  gameTitle: document.getElementById("game-title"),
  gameSubtitle: document.getElementById("game-subtitle"),
  languageLabel: document.getElementById("language-label"),
  languageSelect: document.getElementById("language-select"),
  languageOptionEn: document.getElementById("lang-option-en"),
  languageOptionDe: document.getElementById("lang-option-de"),
  languageOptionFr: document.getElementById("lang-option-fr"),
  modeLabel: document.getElementById("mode-label"),
  modeInput: document.getElementById("mode-input"),
  modeChoice: document.getElementById("mode-choice"),
  modeAddition: document.getElementById("mode-addition"),
  menuButton: document.getElementById("menu-button"),
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

function randomCorrectEmoji() {
  return CORRECT_EMOJIS[Math.floor(Math.random() * CORRECT_EMOJIS.length)];
}

function formatDuration(totalSeconds) {
  const safeSeconds = Math.max(0, Number(totalSeconds) || 0);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function expectedAnswer() {
  return state.mode === "addition" ? state.a + state.b : state.a * state.b;
}

function setGameSubtitle() {
  ui.gameSubtitle.textContent = state.mode === "addition" ? t("gameSubtitleAddition") : t("gameSubtitleMultiplication");
}

function updateModeButtons() {
  ui.modeInput.classList.toggle("active", state.mode === "input");
  ui.modeChoice.classList.toggle("active", state.mode === "choice");
  ui.modeAddition.classList.toggle("active", state.mode === "addition");
}

function applyTranslations() {
  document.documentElement.lang = state.language;
  ui.title.textContent = t("title");
  ui.subtitle.textContent = t("subtitle");
  ui.gameTitle.textContent = t("title");
  setGameSubtitle();
  ui.languageLabel.textContent = t("languageLabel");
  ui.languageSelect.setAttribute("aria-label", t("languagePickerAria"));
  ui.languageOptionEn.textContent = t("languageOptionEn");
  ui.languageOptionDe.textContent = t("languageOptionDe");
  ui.languageOptionFr.textContent = t("languageOptionFr");
  ui.modeLabel.textContent = t("modeLabel");
  ui.modeInput.textContent = t("modeInput");
  ui.modeChoice.textContent = t("modeChoice");
  ui.modeAddition.textContent = t("modeAddition");
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
  const choiceMode = state.mode !== "input";
  ui.answerRow.hidden = choiceMode;
  ui.choiceRow.hidden = !choiceMode;
  setGameSubtitle();
  updateModeButtons();
}

function randFactor() {
  return Math.floor(Math.random() * 10) + 1;
}

function renderStats() {
  ui.questionCount.textContent = String(state.currentQuestion);
  ui.score.textContent = String(state.score);
  ui.streak.textContent = String(state.streak);
}

function generateMultiplicationChoices(correct) {
  const candidates = new Set([
    Math.max(1, state.a - 1) * state.b,
    Math.max(1, state.a - 2) * state.b,
    state.a * Math.max(1, state.b - 1),
    state.a * Math.max(1, state.b - 2),
    Math.min(10, state.a + 1) * state.b,
    state.a * Math.min(10, state.b + 1)
  ]);

  candidates.delete(correct);
  while (candidates.size < 3) {
    const jitter = Math.floor(Math.random() * 7) + 1;
    candidates.add(Math.max(1, Math.min(100, correct + (Math.random() > 0.5 ? jitter : -jitter))));
    candidates.delete(correct);
  }

  return shuffle([correct, ...Array.from(candidates).slice(0, 3)]);
}

function generateAdditionChoices(correct) {
  const candidates = new Set([
    Math.max(1, correct - state.a),
    Math.max(1, correct - state.b),
    Math.min(100, correct + Math.max(1, Math.floor(state.a / 2))),
    Math.min(100, correct + Math.max(1, Math.floor(state.b / 2))),
    Math.max(1, correct - 10),
    Math.min(100, correct + 10)
  ]);

  candidates.delete(correct);
  while (candidates.size < 3) {
    const jitter = Math.floor(Math.random() * 8) + 1;
    candidates.add(Math.max(1, Math.min(100, correct + (Math.random() > 0.5 ? jitter : -jitter))));
    candidates.delete(correct);
  }

  return shuffle([correct, ...Array.from(candidates).slice(0, 3)]);
}

function shuffle(arr) {
  const options = [...arr];
  for (let i = options.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
}

function renderChoiceButtons() {
  const correct = expectedAnswer();
  const options = state.mode === "addition" ? generateAdditionChoices(correct) : generateMultiplicationChoices(correct);
  ui.choiceRow.innerHTML = "";

  options.forEach((option) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice-btn";
    btn.textContent = String(option);
    btn.addEventListener("click", () => checkAnswer(option));
    ui.choiceRow.appendChild(btn);
  });
}

function newQuestion() {
  if (state.mode === "addition") {
    state.a = Math.floor(Math.random() * 99) + 1;
    state.b = Math.floor(Math.random() * (100 - state.a)) + 1;
  } else {
    state.a = randFactor();
    state.b = randFactor();
  }

  state.locked = false;
  ui.question.textContent = state.mode === "addition" ? `${state.a} + ${state.b} = ?` : `${state.a} × ${state.b} = ?`;
  ui.answer.value = "";
  ui.feedback.textContent = "";
  ui.feedback.className = "";
  ui.submit.disabled = false;
  ui.next.disabled = true;

  applyModeUI();
  if (state.mode !== "input") renderChoiceButtons();
  else ui.answer.focus();
}

function endRound() {
  ui.submit.disabled = true;
  ui.next.disabled = true;
  const accuracy = Math.round((state.score / TOTAL_QUESTIONS) * 100);
  const durationSeconds = Math.round((Date.now() - state.roundStartedAt) / 1000);
  const history = loadHistory();

  history.unshift({
    date: new Date().toLocaleString(currentLocale()),
    score: state.score,
    total: TOTAL_QUESTIONS,
    accuracy,
    misses: state.misses,
    durationSeconds
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
  const expected = expectedAnswer();
  const value = state.mode !== "input" ? Number(choiceValue) : Number(ui.answer.value);

  if (value === expected) {
    state.score += 1;
    state.streak += 1;
    const bonusText = state.streak >= 3 ? ` ${t("streakBonus")}` : "";
    ui.feedback.textContent = `${randomCorrectEmoji()} ${t("correct")}${bonusText}`;
    ui.feedback.className = "ok";
  } else {
    state.streak = 0;
    const operator = state.mode === "addition" ? "+" : "×";
    state.misses.push(`${state.a}${operator}${state.b}`);
    ui.feedback.textContent = `${t("niceTry")} ${state.a} ${operator} ${state.b} = ${expected}`;
    ui.feedback.className = "bad";
  }

  state.locked = true;
  ui.submit.disabled = true;
  ui.next.disabled = false;
  lockChoiceButtons();
  renderStats();
}

function nextStep() {
  if (state.currentQuestion >= TOTAL_QUESTIONS) return endRound();
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
    const durationPart = Number.isFinite(row.durationSeconds)
      ? ` | ${t("durationLabel")}: ${formatDuration(row.durationSeconds)}`
      : "";
    li.textContent = `${row.date}: ${row.score}/${row.total} (${row.accuracy}%)${durationPart}${
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
  state.roundStartedAt = Date.now();
  renderStats();
  newQuestion();
}

function openGame(mode) {
  state.mode = mode;
  localStorage.setItem(MODE_KEY, state.mode);
  ui.menuPage.hidden = true;
  ui.gamePage.hidden = false;
  resetGame();
}

function openMenu() {
  ui.gamePage.hidden = true;
  ui.menuPage.hidden = false;
  updateModeButtons();
}

ui.modeInput.addEventListener("click", () => openGame("input"));
ui.modeChoice.addEventListener("click", () => openGame("choice"));
ui.modeAddition.addEventListener("click", () => openGame("addition"));
ui.menuButton.addEventListener("click", openMenu);
ui.submit.addEventListener("click", () => checkAnswer());
ui.next.addEventListener("click", nextStep);
ui.newGame.addEventListener("click", resetGame);
ui.languageSelect.addEventListener("change", (event) => {
  state.language = event.target.value;
  localStorage.setItem(LANGUAGE_KEY, state.language);
  applyTranslations();
  updateModeButtons();
});
ui.answer.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !ui.submit.disabled && state.mode === "input") checkAnswer();
});

if (!MESSAGES[state.language]) state.language = "de";
if (!["input", "choice", "addition"].includes(state.mode)) state.mode = "choice";
ui.languageSelect.value = state.language;
applyTranslations();
openMenu();
