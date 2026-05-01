// Learn Through Games - GitHub Pages friendly gamified learning engine.
const STORAGE_KEY = "ltg-platform-v2";
const todayKey = new Date().toISOString().slice(0, 10);
const levels = ["easy", "medium", "hard"];
const levelLabels = { easy: "Easy", medium: "Medium", hard: "Hard" };
const levelCounts = { easy: 300, medium: 400, hard: 300 };

const subjectConfig = {
  science: { name: "Science", icon: "🧪", classes: [5, 6, 7, 8, 9, 10], badge: "Science Explorer", color: "blue" },
  maths: { name: "Maths", icon: "➗", classes: [5, 6, 7, 8, 9, 10], badge: "Math Master", color: "orange" },
  english: { name: "English", icon: "📚", classes: [5, 6, 7, 8, 9, 10], badge: "English Pro", color: "purple" },
  evs: { name: "EVS", icon: "🌱", classes: [1, 2, 3, 4], badge: "EVS Champ", color: "green" },
  computer: { name: "Computer", icon: "💻", classes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], badge: "Computer Genius", color: "blue" }
};

let questionData = null;
let state = loadState();
let active = {
  subject: "computer",
  classId: "1",
  level: "easy",
  type: "quiz",
  mode: "normal",
  questions: [],
  index: 0,
  correct: 0,
  roundXp: 0,
  timer: null,
  timeLeft: 30,
  memoryOpen: [],
  memoryMatched: 0
};

function defaultState() {
  return {
    xp: 0,
    correct: 0,
    wrong: 0,
    completed: {},
    badges: [],
    leaderboard: [],
    streak: 0,
    lastPlayed: "",
    dailyReward: "",
    darkMode: false
  };
}

function loadState() {
  try {
    return { ...defaultState(), ...JSON.parse(localStorage.getItem(STORAGE_KEY)) };
  } catch {
    return defaultState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function byId(id) {
  return document.getElementById(id);
}

function params() {
  return new URLSearchParams(window.location.search);
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function completionKey(subject, classId, level) {
  return `${subject}-${classId}-${level}`;
}

function isComplete(subject, classId, level) {
  return Boolean(state.completed[completionKey(subject, classId, level)]);
}

function isUnlocked(subject, classId, level) {
  if (level === "easy") return true;
  if (level === "medium") return isComplete(subject, classId, "easy");
  return isComplete(subject, classId, "medium");
}

function accuracy() {
  const total = state.correct + state.wrong;
  return total ? Math.round((state.correct / total) * 100) : 0;
}

function applyDarkMode() {
  document.body.classList.toggle("dark", state.darkMode);
}

function setupDarkMode() {
  const button = byId("darkModeToggle");
  if (!button) return;
  button.addEventListener("click", () => {
    state.darkMode = !state.darkMode;
    saveState();
    applyDarkMode();
  });
}

function updateStreak() {
  if (state.lastPlayed === todayKey) return;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = yesterday.toISOString().slice(0, 10);
  state.streak = state.lastPlayed === yesterdayKey ? state.streak + 1 : 1;
  state.lastPlayed = todayKey;
  if (state.dailyReward !== todayKey) {
    state.xp += 20;
    state.dailyReward = todayKey;
    toast(`Daily reward: +20 XP. Come back tomorrow to keep your ${state.streak}-day streak!`);
  }
  saveState();
}

async function loadQuestions() {
  if (questionData) return questionData;
  const response = await fetch("questions.json");
  questionData = await response.json();
  return questionData;
}

function toast(message) {
  const zone = byId("toastZone");
  if (!zone) return;
  const item = document.createElement("div");
  item.className = "toast";
  item.textContent = message;
  zone.appendChild(item);
  window.setTimeout(() => item.remove(), 3600);
}

function confetti() {
  const layer = byId("confettiLayer");
  if (!layer) return;
  const colors = ["#2563eb", "#7c3aed", "#f97316", "#16a34a", "#facc15"];
  layer.innerHTML = "";
  for (let i = 0; i < 80; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.animationDelay = `${Math.random() * 0.35}s`;
    layer.appendChild(piece);
  }
  window.setTimeout(() => { layer.innerHTML = ""; }, 1600);
}

function sound(correct) {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const ctx = new AudioContext();
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.frequency.value = correct ? 760 : 180;
  oscillator.type = correct ? "sine" : "square";
  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
  oscillator.connect(gain);
  gain.connect(ctx.destination);
  oscillator.start();
  oscillator.stop(ctx.currentTime + 0.18);
}

function addXp(amount) {
  state.xp = Math.max(0, state.xp + amount);
  active.roundXp += amount;
  saveState();
  updateHud();
}

function record(correct) {
  if (correct) {
    state.correct += 1;
    active.correct += 1;
    addXp(10);
  } else {
    state.wrong += 1;
  }
  saveState();
}

function unlockBadges(subject) {
  const earned = [];
  const config = subjectConfig[subject];
  if (config && !state.badges.includes(config.badge)) earned.push(config.badge);
  if (state.xp >= 500 && !state.badges.includes("XP Hero")) earned.push("XP Hero");
  const allSubjectsDone = Object.keys(subjectConfig).every((sid) =>
    subjectConfig[sid].classes.some((cls) => levels.some((lvl) => isComplete(sid, String(cls), lvl)))
  );
  if (allSubjectsDone && !state.badges.includes("Knowledge Champion")) earned.push("Knowledge Champion");
  earned.forEach((badge) => {
    state.badges.push(badge);
    toast(`Badge unlocked: ${badge}`);
  });
  if (earned.length) saveState();
}

function completeChallenge() {
  state.completed[completionKey(active.subject, active.classId, active.level)] = true;
  unlockBadges(active.subject);
  saveState();
}

function updateHud() {
  if (byId("hudXp")) byId("hudXp").textContent = state.xp;
  if (byId("hudStreak")) byId("hudStreak").textContent = `${state.streak} days`;
}

function renderSubjectCards(targetId) {
  const grid = byId(targetId);
  if (!grid) return;
  grid.innerHTML = "";
  Object.entries(subjectConfig).forEach(([id, subject]) => {
    const done = subject.classes.reduce((sum, cls) => sum + levels.filter((lvl) => isComplete(id, String(cls), lvl)).length, 0);
    const total = subject.classes.length * levels.length;
    const card = document.createElement("article");
    card.className = "subject-card";
    card.innerHTML = `
      <span class="subject-icon">${subject.icon}</span>
      <h3>${subject.name}</h3>
      <p>Classes ${subject.classes[0]}-${subject.classes[subject.classes.length - 1]} • ${done}/${total} challenges complete</p>
      <div class="xp-track"><div class="xp-fill" style="width:${Math.round((done / total) * 100)}%"></div></div>
      <a class="primary-button" href="class.html?subject=${id}">Open Mission</a>
    `;
    grid.appendChild(card);
  });
}

function renderHome() {
  byId("homeXp").textContent = state.xp;
  byId("homeAccuracy").textContent = `${accuracy()}%`;
  byId("homeStreak").textContent = `${state.streak} days`;
  byId("homeBadges").textContent = state.badges.length;
  byId("dailyMessage").textContent = state.dailyReward === todayKey
    ? "Daily reward claimed. Come back tomorrow for another bonus."
    : "Play today to collect your daily reward XP.";
  renderSubjectCards("homeSubjectGrid");
}

function renderSubjects() {
  renderSubjectCards("subjectGrid");
}

function renderClasses() {
  const subjectId = params().get("subject") || "computer";
  const subject = subjectConfig[subjectId] || subjectConfig.computer;
  byId("classEyebrow").textContent = `${subject.name} Mission`;
  byId("classTitle").textContent = `Choose ${subject.name} Class`;
  const grid = byId("classGrid");
  grid.innerHTML = "";
  subject.classes.forEach((classId) => {
    const card = document.createElement("article");
    card.className = "class-card";
    const buttons = levels.map((level) => {
      const locked = !isUnlocked(subjectId, String(classId), level);
      const complete = isComplete(subjectId, String(classId), level);
      const href = `game.html?subject=${subjectId}&class=${classId}&level=${level}`;
      return `<a class="challenge-button ${locked ? "locked" : ""} ${complete ? "completed" : ""}" ${locked ? "" : `href="${href}"`}>${locked ? "🔒 " : ""}${levelLabels[level]}</a>`;
    }).join("");
    card.innerHTML = `
      <span class="subject-icon">${subject.icon}</span>
      <h3>Class ${classId}</h3>
      <p>Unlock Medium after Easy, and Hard after Medium.</p>
      <div class="challenge-row">${buttons}</div>
    `;
    grid.appendChild(card);
  });
}

function getBank(subject, classId, level) {
  const bank = questionData.subjects[subject]?.classes?.[String(classId)]?.[level];
  return bank || questionData.subjects.computer.classes["1"].easy;
}

function pickSessionQuestions() {
  const bank = getBank(active.subject, active.classId, active.level);
  return shuffle(bank).slice(0, 10).map((item) => ({
    ...item,
    options: shuffle(item.options)
  }));
}

function pickPictureQuestions() {
  const classData = questionData.subjects[active.subject]?.classes?.[String(active.classId)];
  const selected = classData ? [...classData[active.level]] : getBank(active.subject, active.classId, active.level);
  const fallback = classData ? levels.flatMap((level) => classData[level]) : selected;
  const candidates = shuffle([...selected, ...fallback]);
  const picked = [];
  const usedAnswers = new Set();

  candidates.forEach((item) => {
    if (picked.length >= 10) return;
    if (usedAnswers.has(item.answer)) return;
    picked.push({ ...item, options: shuffle(item.options) });
    usedAnswers.add(item.answer);
  });

  candidates.forEach((item) => {
    if (picked.length >= 10) return;
    if (picked.some((pickedItem) => pickedItem.id === item.id)) return;
    picked.push({ ...item, options: shuffle(item.options) });
  });

  return picked.slice(0, 10);
}

function renderGameSetup() {
  active.subject = params().get("subject") || "computer";
  active.classId = params().get("class") || String(subjectConfig[active.subject].classes[0]);
  active.level = params().get("level") || "easy";
  if (active.mode === "daily") chooseDaily();
  const subject = subjectConfig[active.subject];
  byId("gameBreadcrumb").textContent = `${subject.name} • Class ${active.classId} • ${levelLabels[active.level]}`;
  byId("gameTitle").textContent = `${subject.name} Challenge`;
  byId("missionText").textContent = `Become a Knowledge Champion by completing ${subject.name} Class ${active.classId} ${levelLabels[active.level]}.`;
  updateHud();
}

function chooseDaily() {
  const subjectIds = Object.keys(subjectConfig);
  const subject = subjectIds[new Date().getDate() % subjectIds.length];
  const cls = subjectConfig[subject].classes[new Date().getDay() % subjectConfig[subject].classes.length];
  active.subject = subject;
  active.classId = String(cls);
  active.level = levels[new Date().getDate() % levels.length];
}

function startRound() {
  active.type = byId("gameType").value;
  active.mode = byId("gameMode").value;
  if (active.mode === "daily") chooseDaily();
  active.questions = active.type === "picture" ? pickPictureQuestions() : pickSessionQuestions();
  active.index = 0;
  active.correct = 0;
  active.roundXp = 0;
  active.memoryOpen = [];
  active.memoryMatched = 0;
  byId("setupPanel").classList.add("hidden");
  byId("playScreen").classList.add("active");
  byId("summaryScreen").classList.remove("active");
  byId("roundXp").textContent = "0";
  renderCurrent();
}

function renderCurrent() {
  clearTimer();
  byId("answerFeedback").textContent = "";
  byId("answerFeedback").className = "feedback";
  byId("nextActionBtn").classList.add("hidden");
  byId("roundProgress").style.width = `${Math.round((active.index / 10) * 100)}%`;
  if (active.type === "quiz") renderQuiz();
  if (active.type === "picture") renderPicture();
  if (active.type === "drag") renderDrag();
  if (active.type === "memory") renderMemory();
  if (active.type === "fill") renderFill();
}

function renderQuiz() {
  const item = active.questions[active.index];
  byId("roundLabel").textContent = `${modeLabel()} • Question ${active.index + 1} of 10`;
  byId("gameArea").innerHTML = `<h2 class="question-title">${item.question}</h2><div class="choice-grid" id="choiceGrid"></div>`;
  const grid = byId("choiceGrid");
  item.options.forEach((choice) => addChoice(grid, choice, item.answer, item.explanation));
  startTimer(() => answerChoice(null, "", item.answer, item.explanation));
}

function renderPicture() {
  const item = active.questions[active.index];
  byId("roundLabel").textContent = `${modeLabel()} • Picture ${active.index + 1} of 10`;
  byId("gameArea").innerHTML = `
    <h2 class="question-title">Look at the image. What is the correct answer?</h2>
    <div class="picture-display"><img src="${item.image}" alt="${item.answer} icon"></div>
    <div class="choice-grid" id="choiceGrid"></div>
  `;
  const grid = byId("choiceGrid");
  item.options.forEach((choice) => addChoice(grid, choice, item.answer, item.explanation));
  startTimer(() => answerChoice(null, "", item.answer, item.explanation));
}

function addChoice(grid, choice, answer, explanation) {
  const button = document.createElement("button");
  button.className = "choice-button";
  button.type = "button";
  button.textContent = choice;
  button.addEventListener("click", () => answerChoice(button, choice, answer, explanation));
  grid.appendChild(button);
}

function answerChoice(button, choice, answer, explanation) {
  clearTimer();
  const correct = choice === answer;
  document.querySelectorAll(".choice-button").forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === answer) btn.classList.add("correct");
  });
  if (button && !correct) button.classList.add("wrong");
  record(correct);
  sound(correct);
  showFeedback(correct, `${correct ? "Correct!" : `Wrong! Answer: ${answer}.`} ${explanation}`);
  byId("nextActionBtn").textContent = active.index === 9 ? "Finish" : "Next";
  byId("nextActionBtn").classList.remove("hidden");
}

function renderDrag() {
  const items = active.questions.slice(0, 10);
  byId("roundLabel").textContent = `${modeLabel()} • Drag & Drop Matching`;
  byId("gameArea").innerHTML = `<div class="drag-layout"><div class="item-bank" id="dragBank"></div><div class="drop-zone-grid"><div class="drop-zone" data-category="answer"><h3>Correct Answer</h3><p>Drop real answers here</p></div><div class="drop-zone" data-category="distractor"><h3>Distractor</h3><p>Drop wrong options here</p></div></div></div>`;
  const bank = byId("dragBank");
  const cards = shuffle(items.flatMap((q, index) => [
    { id: `a-${index}`, text: q.answer, category: "answer" },
    { id: `d-${index}`, text: q.options.find((o) => o !== q.answer) || "Wrong Option", category: "distractor" }
  ])).slice(0, 10);
  active.dragTotal = cards.length;
  active.dragDone = 0;
  cards.forEach((card) => {
    const el = document.createElement("button");
    el.className = "device-item";
    el.type = "button";
    el.draggable = true;
    el.dataset.id = card.id;
    el.dataset.category = card.category;
    el.textContent = card.text;
    el.addEventListener("dragstart", (event) => event.dataTransfer.setData("text/plain", card.id));
    bank.appendChild(el);
  });
  document.querySelectorAll(".drop-zone").forEach((zone) => {
    zone.addEventListener("dragover", (event) => event.preventDefault());
    zone.addEventListener("drop", (event) => handleDrop(event, zone));
  });
}

function handleDrop(event, zone) {
  event.preventDefault();
  const card = document.querySelector(`[data-id="${event.dataTransfer.getData("text/plain")}"]`);
  if (!card || card.classList.contains("placed")) return;
  const correct = card.dataset.category === zone.dataset.category;
  record(correct);
  sound(correct);
  if (correct) {
    card.classList.add("placed");
    card.draggable = false;
    zone.appendChild(card);
    active.dragDone += 1;
    byId("roundProgress").style.width = `${Math.round((active.dragDone / active.dragTotal) * 100)}%`;
    showFeedback(true, "Correct match!");
    if (active.dragDone === active.dragTotal) finishRound();
  } else {
    showFeedback(false, "Try again. That card belongs in the other box.");
  }
}

function renderMemory() {
  const items = active.questions.slice(0, 5);
  const cards = shuffle(items.flatMap((q, index) => [{ pair: index, text: q.answer }, { pair: index, text: q.explanation.split(".")[0] }]));
  active.memoryMatched = 0;
  byId("roundLabel").textContent = `${modeLabel()} • Memory Cards`;
  byId("gameArea").innerHTML = `<div class="memory-grid" id="memoryGrid"></div>`;
  cards.forEach((card) => {
    const el = document.createElement("button");
    el.className = "memory-card";
    el.type = "button";
    el.dataset.pair = card.pair;
    el.dataset.text = card.text;
    el.textContent = "?";
    el.addEventListener("click", () => flipMemory(el));
    byId("memoryGrid").appendChild(el);
  });
}

function flipMemory(card) {
  if (card.classList.contains("matched") || card.classList.contains("flipped") || active.memoryOpen.length >= 2) return;
  card.classList.add("flipped");
  card.textContent = card.dataset.text;
  active.memoryOpen.push(card);
  if (active.memoryOpen.length < 2) return;
  const [first, second] = active.memoryOpen;
  const correct = first.dataset.pair === second.dataset.pair;
  record(correct);
  sound(correct);
  if (correct) {
    first.classList.add("matched");
    second.classList.add("matched");
    active.memoryMatched += 1;
    active.memoryOpen = [];
    showFeedback(true, "Correct pair!");
    byId("roundProgress").style.width = `${Math.round((active.memoryMatched / 5) * 100)}%`;
    if (active.memoryMatched === 5) finishRound();
  } else {
    showFeedback(false, "Not a match. Try again.");
    window.setTimeout(() => {
      first.classList.remove("flipped");
      second.classList.remove("flipped");
      first.textContent = "?";
      second.textContent = "?";
      active.memoryOpen = [];
    }, 800);
  }
}

function renderFill() {
  const item = active.questions[active.index];
  byId("roundLabel").textContent = `${modeLabel()} • Fill ${active.index + 1} of 10`;
  byId("gameArea").innerHTML = `<div class="fill-box"><h2 class="question-title">____ is the answer for this clue: ${item.question}</h2><input class="fill-input" id="fillInput" placeholder="Type answer"><button class="primary-button" id="checkFillBtn" type="button">Check Answer</button></div>`;
  byId("checkFillBtn").addEventListener("click", checkFill);
  byId("fillInput").addEventListener("keydown", (event) => { if (event.key === "Enter") checkFill(); });
  startTimer(checkFill);
}

function checkFill() {
  clearTimer();
  const item = active.questions[active.index];
  const value = byId("fillInput").value.trim().toLowerCase();
  const correct = value === item.answer.toLowerCase();
  byId("fillInput").disabled = true;
  byId("checkFillBtn").disabled = true;
  record(correct);
  sound(correct);
  showFeedback(correct, `${correct ? "Correct!" : `Wrong! Answer: ${item.answer}.`} ${item.explanation}`);
  byId("nextActionBtn").textContent = active.index === 9 ? "Finish" : "Next";
  byId("nextActionBtn").classList.remove("hidden");
}

function showFeedback(correct, message) {
  const feedback = byId("answerFeedback");
  feedback.className = `feedback ${correct ? "correct" : "wrong"}`;
  feedback.textContent = message;
  byId("roundXp").textContent = active.roundXp;
}

function nextAction() {
  active.index += 1;
  if (active.index >= 10) finishRound();
  else renderCurrent();
}

function finishRound() {
  clearTimer();
  const passed = active.correct >= 6 || active.type === "drag" || active.type === "memory";
  if (passed) {
    completeChallenge();
    confetti();
  }
  updateLeaderboard();
  byId("playScreen").classList.remove("active");
  byId("summaryScreen").classList.add("active");
  byId("summaryTitle").textContent = passed ? "Achievement Unlocked!" : "Try Again";
  byId("summaryText").textContent = `${subjectConfig[active.subject].name} Class ${active.classId} ${levelLabels[active.level]}: ${active.correct}/10 correct. XP earned: ${active.roundXp}. ${passed ? "Next challenge unlocked!" : "Score 6 or more to unlock the next level."}`;
  byId("nextChallengeLink").href = `class.html?subject=${active.subject}`;
}

function updateLeaderboard() {
  if (active.roundXp <= 0) return;
  state.leaderboard.push({ name: "Player", score: active.roundXp, date: todayKey, subject: subjectConfig[active.subject].name });
  state.leaderboard = state.leaderboard.sort((a, b) => b.score - a.score).slice(0, 5);
  saveState();
}

function startTimer(onTimeout) {
  clearTimer();
  const pill = byId("timerPill");
  if (active.mode !== "timer") {
    pill.classList.add("hidden");
    return;
  }
  active.timeLeft = 30;
  pill.textContent = "30s";
  pill.classList.remove("hidden");
  active.timer = window.setInterval(() => {
    active.timeLeft -= 1;
    pill.textContent = `${active.timeLeft}s`;
    if (active.timeLeft <= 0) {
      clearTimer();
      onTimeout();
    }
  }, 1000);
}

function clearTimer() {
  if (active.timer) window.clearInterval(active.timer);
  active.timer = null;
  if (byId("timerPill")) byId("timerPill").classList.add("hidden");
}

function modeLabel() {
  if (active.mode === "timer") return "Timer Mode";
  if (active.mode === "daily") return "Daily Challenge";
  return "Normal Mode";
}

function renderDashboard() {
  byId("dashXp").textContent = state.xp;
  byId("dashAccuracy").textContent = `${accuracy()}%`;
  byId("dashCompleted").textContent = Object.keys(state.completed).length;
  byId("dashStreak").textContent = `${state.streak} days`;
  byId("dashXpFill").style.width = `${state.xp % 100}%`;
  const badgeGrid = byId("dashBadges");
  badgeGrid.innerHTML = "";
  const badgeNames = [...Object.values(subjectConfig).map((s) => s.badge), "XP Hero", "Knowledge Champion"];
  badgeNames.forEach((badge) => {
    const card = document.createElement("div");
    card.className = `badge-card ${state.badges.includes(badge) ? "" : "locked"}`;
    card.textContent = `${state.badges.includes(badge) ? "🏅" : "🔒"} ${badge}`;
    badgeGrid.appendChild(card);
  });
  const board = byId("dashLeaderboard");
  board.innerHTML = "";
  (state.leaderboard.length ? state.leaderboard : [{ name: "No scores yet", score: 0, date: "Play a game", subject: "" }]).slice(0, 5).forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = `${entry.name}: ${entry.score} XP ${entry.subject ? `(${entry.subject}, ${entry.date})` : entry.date}`;
    board.appendChild(li);
  });
  const progress = byId("subjectProgress");
  progress.innerHTML = "";
  Object.entries(subjectConfig).forEach(([id, subject]) => {
    const total = subject.classes.length * levels.length;
    const done = subject.classes.reduce((sum, cls) => sum + levels.filter((lvl) => isComplete(id, String(cls), lvl)).length, 0);
    const row = document.createElement("div");
    row.className = "progress-row";
    row.innerHTML = `<strong>${subject.icon} ${subject.name}: ${done}/${total}</strong><div class="xp-track"><div class="xp-fill" style="width:${Math.round((done / total) * 100)}%"></div></div>`;
    progress.appendChild(row);
  });
}

async function boot() {
  applyDarkMode();
  setupDarkMode();
  updateStreak();
  await loadQuestions();
  const page = document.body.dataset.page;
  if (page === "home") renderHome();
  if (page === "subjects") renderSubjects();
  if (page === "class") renderClasses();
  if (page === "dashboard") renderDashboard();
  if (page === "game") {
    renderGameSetup();
    byId("startRoundBtn").addEventListener("click", startRound);
    byId("nextActionBtn").addEventListener("click", nextAction);
    byId("replayBtn").addEventListener("click", startRound);
  }
}

boot().catch((error) => {
  console.error(error);
  toast("Questions could not load. Please refresh the page.");
});
