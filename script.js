const TOTAL_QUESTIONS = 10;
const HISTORY_KEY = "best-math-game-history";

const state = {
  currentQuestion: 1,
  score: 0,
  streak: 0,
  locked: false,
  a: 1,
  b: 1,
  misses: []
};

const ui = {
  questionCount: document.getElementById("question-count"),
  score: document.getElementById("score"),
  streak: document.getElementById("streak"),
  question: document.getElementById("question"),
  answer: document.getElementById("answer"),
  submit: document.getElementById("submit"),
  next: document.getElementById("next"),
  newGame: document.getElementById("new-game"),
  feedback: document.getElementById("feedback"),
  best: document.getElementById("best"),
  historyList: document.getElementById("history-list")
};

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

  let reward = "⭐ Great practice!";
  if (accuracy === 100) reward = "🏆 Perfect! You unlocked a Super Star reward!";
  else if (accuracy >= 80) reward = "🎉 Awesome! You earned a Gold Badge!";

  ui.feedback.textContent = `Round complete! ${reward}`;
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
    ui.feedback.textContent = `Correct! +1 point ${state.streak >= 3 ? "🔥 Streak bonus!" : ""}`;
    ui.feedback.className = "ok";
  } else {
    state.streak = 0;
    state.misses.push(`${state.a}×${state.b}`);
    ui.feedback.textContent = `Nice try! ${state.a} × ${state.b} = ${expected}`;
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
  ui.best.textContent = `Best Accuracy: ${best}%`;
  ui.historyList.innerHTML = "";

  history.slice(0, 5).forEach((row) => {
    const li = document.createElement("li");
    li.textContent = `${row.date}: ${row.score}/${row.total} (${row.accuracy}%)${
      row.misses?.length ? ` | Practice: ${row.misses.join(", ")}` : ""
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
ui.answer.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !ui.submit.disabled) {
    checkAnswer();
  }
});

renderHistory();
resetGame();
