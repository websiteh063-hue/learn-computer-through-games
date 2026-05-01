// Learn Through Games - static gamified learning platform for GitHub Pages.
const STORAGE_KEY = "ltg-player-v1";
const todayKey = new Date().toISOString().slice(0, 10);

const levels = [
  {
    id: 1,
    title: "Basics of Computer",
    mission: "Robo just woke up and needs to learn what a computer is.",
    icon: "L1",
    questions: [
      {
        q: "What is the brain of a computer?",
        answer: "CPU",
        choices: ["CPU", "Mouse", "Speaker", "Printer"],
        explain: "The CPU is called the brain because it processes instructions."
      },
      {
        q: "Which part displays text and pictures?",
        answer: "Monitor",
        choices: ["Monitor", "Keyboard", "Mouse", "Scanner"],
        explain: "A monitor is an output device that shows information on screen."
      },
      {
        q: "What do we use to type letters and numbers?",
        answer: "Keyboard",
        choices: ["Keyboard", "Printer", "Speaker", "Webcam"],
        explain: "A keyboard is an input device used to enter text and numbers."
      },
      {
        q: "Which device helps move the pointer?",
        answer: "Mouse",
        choices: ["Mouse", "CPU", "Monitor", "Printer"],
        explain: "A mouse controls the pointer and helps select items."
      },
      {
        q: "Which part stores files permanently?",
        answer: "Storage",
        choices: ["Storage", "Speaker", "Monitor", "Keyboard"],
        explain: "Storage keeps files even after the computer is switched off."
      }
    ],
    drag: [
      ["CPU", "Computer Part"], ["Monitor", "Computer Part"], ["Keyboard", "Computer Part"],
      ["Mouse", "Computer Part"], ["Chair", "Not a Computer Part"], ["Pencil", "Not a Computer Part"]
    ],
    memory: [["CPU", "Brain"], ["Monitor", "Screen"], ["Keyboard", "Typing"], ["Mouse", "Pointer"]],
    fills: [
      ["The ____ is the brain of the computer.", "CPU", "The CPU processes instructions."],
      ["A ____ shows text and images.", "Monitor", "A monitor displays computer output."],
      ["A ____ is used for typing.", "Keyboard", "A keyboard enters letters and numbers."]
    ]
  },
  {
    id: 2,
    title: "Input/Output Devices",
    mission: "Robo must sort signals coming into and going out of the computer.",
    icon: "L2",
    questions: [
      {
        q: "Which device is an input device?",
        answer: "Keyboard",
        choices: ["Keyboard", "Monitor", "Speaker", "Printer"],
        explain: "A keyboard sends data into a computer, so it is an input device."
      },
      {
        q: "Which device is an output device?",
        answer: "Printer",
        choices: ["Printer", "Mouse", "Keyboard", "Scanner"],
        explain: "A printer gives output by printing information on paper."
      },
      {
        q: "Which device records your voice?",
        answer: "Microphone",
        choices: ["Microphone", "Speaker", "Monitor", "Printer"],
        explain: "A microphone takes sound input into the computer."
      },
      {
        q: "Which device plays sound?",
        answer: "Speaker",
        choices: ["Speaker", "Mouse", "Scanner", "Keyboard"],
        explain: "A speaker gives sound output from the computer."
      },
      {
        q: "Which device can scan paper into the computer?",
        answer: "Scanner",
        choices: ["Scanner", "Monitor", "Speaker", "Printer"],
        explain: "A scanner captures paper images as computer input."
      }
    ],
    drag: [
      ["Keyboard", "Input"], ["Mouse", "Input"], ["Scanner", "Input"], ["Microphone", "Input"],
      ["Monitor", "Output"], ["Printer", "Output"], ["Speaker", "Output"], ["Projector", "Output"]
    ],
    memory: [["Keyboard", "Input"], ["Printer", "Output"], ["Microphone", "Input"], ["Speaker", "Output"]],
    fills: [
      ["A keyboard is an ____ device.", "Input", "It sends typed data into the computer."],
      ["A monitor is an ____ device.", "Output", "It shows results from the computer."],
      ["A speaker gives sound ____.", "Output", "Speakers play sound from the computer."]
    ]
  },
  {
    id: 3,
    title: "Software Types",
    mission: "Robo can see apps now, but must learn what each type does.",
    icon: "L3",
    questions: [
      {
        q: "Which software helps run the computer?",
        answer: "Operating System",
        choices: ["Operating System", "Mouse", "Printer", "Speaker"],
        explain: "An operating system manages hardware and other software."
      },
      {
        q: "Which is an example of a browser?",
        answer: "Chrome",
        choices: ["Chrome", "Keyboard", "Monitor", "Folder"],
        explain: "Chrome is browser software used to visit websites."
      },
      {
        q: "Which software is used to write documents?",
        answer: "MS Word",
        choices: ["MS Word", "Paint", "Chrome", "Recycle Bin"],
        explain: "MS Word is application software used for documents."
      },
      {
        q: "Which software helps protect from viruses?",
        answer: "Antivirus",
        choices: ["Antivirus", "Calculator", "Paint", "Notepad"],
        explain: "Antivirus software detects and removes harmful programs."
      },
      {
        q: "Which software is used for drawing?",
        answer: "Paint",
        choices: ["Paint", "Chrome", "Windows", "Printer"],
        explain: "Paint is an application used to draw simple pictures."
      }
    ],
    drag: [
      ["Windows", "System Software"], ["Linux", "System Software"], ["Android", "System Software"],
      ["Chrome", "Application Software"], ["MS Word", "Application Software"], ["Paint", "Application Software"]
    ],
    memory: [["Windows", "Operating System"], ["Chrome", "Browser"], ["MS Word", "Documents"], ["Antivirus", "Protection"]],
    fills: [
      ["Chrome is a web ____.", "Browser", "A browser opens websites."],
      ["Windows is an operating ____.", "System", "An operating system manages the computer."],
      ["Antivirus software protects against ____.", "Viruses", "It helps detect harmful programs."]
    ]
  },
  {
    id: 4,
    title: "Internet Basics",
    mission: "Robo is ready to connect safely to the online world.",
    icon: "L4",
    questions: [
      {
        q: "What is the internet?",
        answer: "A worldwide network",
        choices: ["A worldwide network", "A keyboard", "A printer", "A folder"],
        explain: "The internet connects computers and devices around the world."
      },
      {
        q: "What does URL help us find?",
        answer: "A web address",
        choices: ["A web address", "A power cable", "A keyboard key", "A speaker"],
        explain: "A URL is the address of a web page or resource."
      },
      {
        q: "Which is safer for websites?",
        answer: "HTTPS",
        choices: ["HTTPS", "HTP", "CPU", "PNG"],
        explain: "HTTPS helps protect data sent between your browser and a website."
      },
      {
        q: "Which word means fake messages trying to steal passwords?",
        answer: "Phishing",
        choices: ["Phishing", "Printing", "Painting", "Formatting"],
        explain: "Phishing tricks people into sharing private information."
      },
      {
        q: "Which tool searches websites?",
        answer: "Search engine",
        choices: ["Search engine", "Scanner", "Speaker", "Folder"],
        explain: "A search engine helps find information on the web."
      }
    ],
    drag: [
      ["HTTPS", "Safe Internet"], ["Strong Password", "Safe Internet"], ["Search Engine", "Internet Tool"],
      ["Browser", "Internet Tool"], ["Phishing", "Online Danger"], ["Unknown Link", "Online Danger"]
    ],
    memory: [["URL", "Web Address"], ["HTTPS", "Secure Website"], ["Phishing", "Fake Message"], ["Browser", "Opens Websites"]],
    fills: [
      ["A ____ opens websites.", "Browser", "A browser lets us visit websites."],
      ["HTTPS is safer than ____.", "HTTP", "HTTPS adds protection for web traffic."],
      ["A fake password-stealing message is called ____.", "Phishing", "Phishing is an online trick."]
    ]
  }
];

const badges = [
  { id: "beginner", name: "Beginner", rule: (state) => state.completedLevels.includes(1) },
  { id: "keyboard-master", name: "Keyboard Master", rule: (state) => state.completedLevels.includes(2) },
  { id: "software-scout", name: "Software Scout", rule: (state) => state.completedLevels.includes(3) },
  { id: "computer-genius", name: "Computer Genius", rule: (state) => state.completedLevels.length >= levels.length },
  { id: "streak-star", name: "Streak Star", rule: (state) => state.streak >= 3 }
];

let state = loadState();
let currentLevel = null;
let currentMode = "normal";
let currentType = "quiz";
let roundItems = [];
let currentIndex = 0;
let roundXp = 0;
let roundCorrect = 0;
let timer = null;
let timeLeft = 30;
let selectedMemory = [];
let matchedMemory = 0;

function defaultState() {
  return {
    xp: 0,
    completedLevels: [],
    badges: [],
    correct: 0,
    wrong: 0,
    streak: 0,
    lastPlayed: "",
    dailyReward: "",
    leaderboard: [],
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

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function setScreen(screenId) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.toggle("active", screen.id === screenId);
  });
}

function applyDarkMode() {
  document.body.classList.toggle("dark", state.darkMode);
}

function setupDarkToggle() {
  const toggle = byId("darkModeToggle");
  if (!toggle) return;
  toggle.addEventListener("click", () => {
    state.darkMode = !state.darkMode;
    saveState();
    applyDarkMode();
  });
}

function addXp(amount) {
  state.xp = Math.max(0, state.xp + amount);
  roundXp += amount;
  saveState();
  updateHud();
}

function recordAnswer(isCorrect) {
  if (isCorrect) {
    state.correct += 1;
    roundCorrect += 1;
    addXp(10);
  } else {
    state.wrong += 1;
    addXp(-5);
  }
  saveState();
}

function accuracy() {
  const total = state.correct + state.wrong;
  return total ? Math.round((state.correct / total) * 100) : 0;
}

function completedCount() {
  return state.completedLevels.length;
}

function updateStreakAndReward() {
  if (state.lastPlayed === todayKey) return;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = yesterday.toISOString().slice(0, 10);
  state.streak = state.lastPlayed === yesterdayKey ? state.streak + 1 : 1;
  state.lastPlayed = todayKey;

  if (state.dailyReward !== todayKey) {
    state.xp += 20;
    state.dailyReward = todayKey;
    showToast(`Daily reward unlocked: +20 XP. Streak: ${state.streak} day${state.streak === 1 ? "" : "s"}!`);
  }

  saveState();
  unlockBadges();
}

function unlockBadges() {
  const newBadges = badges.filter((badge) => !state.badges.includes(badge.id) && badge.rule(state));
  newBadges.forEach((badge) => {
    state.badges.push(badge.id);
    showToast(`Badge unlocked: ${badge.name}`);
  });
  if (newBadges.length) saveState();
}

function isUnlocked(levelId) {
  return levelId === 1 || state.completedLevels.includes(levelId - 1);
}

function completeLevel(levelId) {
  if (!state.completedLevels.includes(levelId)) {
    state.completedLevels.push(levelId);
    showToast(`Level ${levelId} completed! Next mission unlocked.`);
    launchConfetti();
    saveState();
    unlockBadges();
  }
}

function showToast(message) {
  const zone = byId("toastZone");
  if (!zone) return;
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  zone.appendChild(toast);
  window.setTimeout(() => toast.remove(), 3600);
}

function launchConfetti() {
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

function playSound(isCorrect) {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.frequency.value = isCorrect ? 760 : 180;
  osc.type = isCorrect ? "sine" : "square";
  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.18);
}

function renderLevelGrid(targetId, clickable = false) {
  const grid = byId(targetId);
  if (!grid) return;
  grid.innerHTML = "";
  levels.forEach((level) => {
    const unlocked = isUnlocked(level.id);
    const completed = state.completedLevels.includes(level.id);
    const card = document.createElement(clickable && unlocked ? "button" : "article");
    card.className = `level-card ${unlocked ? "" : "locked"} ${completed ? "completed" : ""}`;
    card.innerHTML = `
      <span class="level-icon">${level.icon}</span>
      <span class="lock-chip">${completed ? "Done" : unlocked ? "Open" : "Locked"}</span>
      <h3>Level ${level.id}: ${level.title}</h3>
      <p>${level.mission}</p>
    `;
    if (clickable && unlocked) {
      card.type = "button";
      card.addEventListener("click", () => openSetup(level.id));
    }
    grid.appendChild(card);
  });
}

function updateHud() {
  const hudXp = byId("hudXp");
  const hudStreak = byId("hudStreak");
  if (hudXp) hudXp.textContent = state.xp;
  if (hudStreak) hudStreak.textContent = `${state.streak} day${state.streak === 1 ? "" : "s"}`;
}

function initHome() {
  byId("homeXp").textContent = state.xp;
  byId("homeTotalXp").textContent = state.xp;
  byId("homeCompleted").textContent = `${completedCount()}/${levels.length}`;
  byId("homeStreak").textContent = `${state.streak} day${state.streak === 1 ? "" : "s"}`;
  byId("homeBadges").textContent = state.badges.length;
  renderLevelGrid("homeLevelGrid");
}

function initDashboard() {
  byId("dashXp").textContent = state.xp;
  byId("dashLevels").textContent = `${completedCount()}/${levels.length}`;
  byId("dashAccuracy").textContent = `${accuracy()}%`;
  byId("dashStreak").textContent = `${state.streak} day${state.streak === 1 ? "" : "s"}`;
  byId("dashXpFill").style.width = `${state.xp % 100}%`;
  renderLevelGrid("dashLevelGrid");
  renderBadges();
  renderLeaderboard();
}

function renderBadges() {
  const grid = byId("dashBadges");
  grid.innerHTML = "";
  badges.forEach((badge) => {
    const earned = state.badges.includes(badge.id);
    const item = document.createElement("div");
    item.className = `badge-card ${earned ? "" : "locked"}`;
    item.textContent = `${earned ? "🏅" : "🔒"} ${badge.name}`;
    grid.appendChild(item);
  });
}

function renderLeaderboard() {
  const list = byId("dashLeaderboard");
  list.innerHTML = "";
  const scores = [...state.leaderboard].sort((a, b) => b.score - a.score).slice(0, 5);
  if (!scores.length) {
    const item = document.createElement("li");
    item.textContent = "No scores yet. Complete a round to appear here.";
    list.appendChild(item);
    return;
  }
  scores.forEach((score) => {
    const item = document.createElement("li");
    item.textContent = `${score.name}: ${score.score} XP (${score.date})`;
    list.appendChild(item);
  });
}

function initGame() {
  renderLevelGrid("gameLevelGrid", true);
  updateHud();
  byId("backToLevelsBtn").addEventListener("click", () => setScreen("missionScreen"));
  byId("startRoundBtn").addEventListener("click", startRound);
  byId("nextActionBtn").addEventListener("click", nextAction);
  byId("replayBtn").addEventListener("click", startRound);
  byId("nextLevelBtn").addEventListener("click", goNextLevel);
}

function openSetup(levelId) {
  currentLevel = levels.find((level) => level.id === levelId);
  byId("gameTitle").textContent = `Level ${currentLevel.id}: ${currentLevel.title}`;
  byId("setupLevelTitle").textContent = `Mission ${currentLevel.id}: ${currentLevel.title}`;
  byId("setupStory").textContent = currentLevel.mission;
  setScreen("setupScreen");
}

function startRound() {
  currentMode = byId("gameMode").value;
  currentType = byId("gameType").value;
  currentIndex = 0;
  roundXp = 0;
  roundCorrect = 0;
  matchedMemory = 0;
  selectedMemory = [];
  byId("roundXp").textContent = "0";
  byId("answerFeedback").textContent = "";
  byId("nextActionBtn").classList.add("hidden");

  if (currentMode === "daily") {
    currentLevel = levels[((new Date().getDate() - 1) % levels.length)];
    currentType = "quiz";
    showToast("Daily challenge loaded. Complete it for streak power!");
  }

  if (currentType === "quiz") roundItems = shuffle(currentLevel.questions);
  if (currentType === "drag") roundItems = shuffle(currentLevel.drag);
  if (currentType === "memory") roundItems = shuffle(currentLevel.memory);
  if (currentType === "fill") roundItems = shuffle(currentLevel.fills);

  setScreen("playScreen");
  renderCurrentGame();
}

function renderCurrentGame() {
  clearTimer();
  byId("roundXp").textContent = roundXp;
  byId("roundProgress").style.width = `${Math.min(100, (currentIndex / getTotalSteps()) * 100)}%`;
  byId("answerFeedback").className = "feedback";
  byId("answerFeedback").textContent = "";
  byId("nextActionBtn").classList.add("hidden");

  if (currentType === "quiz") renderQuiz();
  if (currentType === "drag") renderDrag();
  if (currentType === "memory") renderMemory();
  if (currentType === "fill") renderFill();
}

function getTotalSteps() {
  if (currentType === "memory") return roundItems.length;
  if (currentType === "drag") return roundItems.length;
  return roundItems.length;
}

function renderQuiz() {
  const item = roundItems[currentIndex];
  byId("roundLabel").textContent = `${currentModeLabel()} • Question ${currentIndex + 1} of ${roundItems.length}`;
  byId("gameArea").innerHTML = `
    <h2 class="question-title">${item.q}</h2>
    <div class="choice-grid" id="choiceGrid"></div>
  `;
  const grid = byId("choiceGrid");
  shuffle(item.choices).forEach((choice) => {
    const button = document.createElement("button");
    button.className = "choice-button";
    button.type = "button";
    button.textContent = choice;
    button.addEventListener("click", () => answerQuiz(button, choice, item));
    grid.appendChild(button);
  });
  startTimerIfNeeded(() => answerQuiz(null, "", item));
}

function answerQuiz(button, choice, item) {
  clearTimer();
  const correct = choice === item.answer;
  document.querySelectorAll(".choice-button").forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === item.answer) btn.classList.add("correct");
  });
  if (button && !correct) button.classList.add("wrong");
  recordAnswer(correct);
  playSound(correct);
  showFeedback(correct, `${correct ? "Correct!" : "Wrong!"} ${item.explain}`);
  byId("nextActionBtn").textContent = currentIndex === roundItems.length - 1 ? "Finish" : "Next";
  byId("nextActionBtn").classList.remove("hidden");
}

function renderDrag() {
  currentIndex = 0;
  byId("roundLabel").textContent = `${currentModeLabel()} • Sort ${roundItems.length} cards`;
  const categories = [...new Set(roundItems.map((item) => item[1]))];
  byId("gameArea").innerHTML = `
    <div class="drag-layout">
      <div class="item-bank" id="dragBank"></div>
      <div class="drop-zone-grid" id="dropGrid"></div>
    </div>
  `;
  const bank = byId("dragBank");
  const dropGrid = byId("dropGrid");
  roundItems.forEach(([term, category], index) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "device-item";
    item.draggable = true;
    item.dataset.category = category;
    item.dataset.id = `drag-${index}`;
    item.textContent = term;
    item.addEventListener("dragstart", (event) => {
      item.classList.add("dragging");
      event.dataTransfer.setData("text/plain", item.dataset.id);
    });
    item.addEventListener("dragend", () => item.classList.remove("dragging"));
    bank.appendChild(item);
  });
  categories.forEach((category) => {
    const zone = document.createElement("div");
    zone.className = "drop-zone";
    zone.dataset.category = category;
    zone.innerHTML = `<h3>${category}</h3><p>Drop matching cards here</p>`;
    zone.addEventListener("dragover", (event) => {
      event.preventDefault();
      zone.classList.add("over");
    });
    zone.addEventListener("dragleave", () => zone.classList.remove("over"));
    zone.addEventListener("drop", (event) => handleDrop(event, zone));
    dropGrid.appendChild(zone);
  });
}

function handleDrop(event, zone) {
  event.preventDefault();
  zone.classList.remove("over");
  const item = document.querySelector(`[data-id="${event.dataTransfer.getData("text/plain")}"]`);
  if (!item || item.classList.contains("placed")) return;
  const correct = item.dataset.category === zone.dataset.category;
  recordAnswer(correct);
  playSound(correct);
  if (correct) {
    item.classList.add("placed");
    item.draggable = false;
    zone.appendChild(item);
    currentIndex += 1;
    showFeedback(true, `Correct! ${item.textContent} belongs in ${zone.dataset.category}.`);
    byId("roundProgress").style.width = `${Math.min(100, (currentIndex / roundItems.length) * 100)}%`;
    if (currentIndex === roundItems.length) finishRound();
  } else {
    showFeedback(false, "Try again. That card belongs in another category.");
  }
}

function renderMemory() {
  byId("roundLabel").textContent = `${currentModeLabel()} • Match all pairs`;
  const cards = shuffle(roundItems.flatMap(([term, meaning], index) => [
    { pair: index, text: term },
    { pair: index, text: meaning }
  ]));
  byId("gameArea").innerHTML = `<div class="memory-grid" id="memoryGrid"></div>`;
  const grid = byId("memoryGrid");
  cards.forEach((card) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "memory-card";
    button.dataset.pair = card.pair;
    button.dataset.text = card.text;
    button.textContent = "?";
    button.addEventListener("click", () => flipMemory(button));
    grid.appendChild(button);
  });
}

function flipMemory(card) {
  if (card.classList.contains("matched") || card.classList.contains("flipped") || selectedMemory.length >= 2) return;
  card.classList.add("flipped");
  card.textContent = card.dataset.text;
  selectedMemory.push(card);
  if (selectedMemory.length !== 2) return;

  const [first, second] = selectedMemory;
  const correct = first.dataset.pair === second.dataset.pair;
  recordAnswer(correct);
  playSound(correct);
  if (correct) {
    first.classList.add("matched");
    second.classList.add("matched");
    matchedMemory += 1;
    showFeedback(true, "Correct match! Robo learned another pair.");
    byId("roundProgress").style.width = `${Math.min(100, (matchedMemory / roundItems.length) * 100)}%`;
    selectedMemory = [];
    if (matchedMemory === roundItems.length) finishRound();
  } else {
    showFeedback(false, "Not a match. Watch the cards carefully.");
    window.setTimeout(() => {
      first.classList.remove("flipped");
      second.classList.remove("flipped");
      first.textContent = "?";
      second.textContent = "?";
      selectedMemory = [];
    }, 850);
  }
}

function renderFill() {
  const item = roundItems[currentIndex];
  byId("roundLabel").textContent = `${currentModeLabel()} • Blank ${currentIndex + 1} of ${roundItems.length}`;
  byId("gameArea").innerHTML = `
    <div class="fill-box">
      <h2 class="question-title">${item[0]}</h2>
      <input class="fill-input" id="fillInput" type="text" autocomplete="off" placeholder="Type your answer">
      <button class="primary-button" id="checkFillBtn" type="button">Check Answer</button>
    </div>
  `;
  byId("checkFillBtn").addEventListener("click", checkFill);
  byId("fillInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") checkFill();
  });
  startTimerIfNeeded(checkFill);
}

function checkFill() {
  clearTimer();
  const item = roundItems[currentIndex];
  const value = byId("fillInput").value.trim().toLowerCase();
  const correct = value === item[1].toLowerCase();
  byId("fillInput").disabled = true;
  byId("checkFillBtn").disabled = true;
  recordAnswer(correct);
  playSound(correct);
  showFeedback(correct, `${correct ? "Correct!" : `Wrong! Answer: ${item[1]}.`} ${item[2]}`);
  byId("nextActionBtn").textContent = currentIndex === roundItems.length - 1 ? "Finish" : "Next";
  byId("nextActionBtn").classList.remove("hidden");
}

function startTimerIfNeeded(onTimeout) {
  const pill = byId("timerPill");
  if (currentMode !== "timer") {
    pill.classList.add("hidden");
    return;
  }
  timeLeft = 30;
  pill.textContent = `${timeLeft}s`;
  pill.classList.remove("hidden");
  timer = window.setInterval(() => {
    timeLeft -= 1;
    pill.textContent = `${timeLeft}s`;
    if (timeLeft <= 0) {
      clearTimer();
      onTimeout();
    }
  }, 1000);
}

function clearTimer() {
  if (timer) window.clearInterval(timer);
  timer = null;
  const pill = byId("timerPill");
  if (pill) pill.classList.add("hidden");
}

function showFeedback(correct, message) {
  const feedback = byId("answerFeedback");
  feedback.className = `feedback ${correct ? "correct" : "wrong"}`;
  feedback.textContent = message;
  byId("roundXp").textContent = roundXp;
}

function nextAction() {
  currentIndex += 1;
  if (currentIndex >= roundItems.length) {
    finishRound();
    return;
  }
  renderCurrentGame();
}

function finishRound() {
  clearTimer();
  const total = currentType === "memory" ? roundItems.length : roundItems.length;
  const percent = Math.round((roundCorrect / Math.max(1, total)) * 100);
  const completed = percent >= 60 || currentType === "drag" || currentType === "memory";
  if (completed) completeLevel(currentLevel.id);
  updateLeaderboard(roundXp);

  byId("summaryTitle").textContent = completed ? "Level Completed" : "Mission Needs Replay";
  byId("summaryText").textContent = `Score: ${roundCorrect}/${total}. XP this round: ${roundXp}. Accuracy: ${percent}%. ${completed ? "Robo is ready for the next mission." : "Replay to unlock the next level."}`;
  byId("nextLevelBtn").classList.toggle("hidden", currentLevel.id >= levels.length || !completed);
  setScreen("summaryScreen");
}

function updateLeaderboard(score) {
  if (score <= 0) return;
  const name = localStorage.getItem("ltg-player-name") || "Player";
  state.leaderboard.push({ name, score, date: todayKey });
  state.leaderboard = state.leaderboard.sort((a, b) => b.score - a.score).slice(0, 5);
  saveState();
}

function goNextLevel() {
  const next = levels.find((level) => level.id === currentLevel.id + 1);
  if (next && isUnlocked(next.id)) openSetup(next.id);
}

function currentModeLabel() {
  if (currentMode === "timer") return "Timer Mode";
  if (currentMode === "daily") return "Daily Challenge";
  return "Normal Mode";
}

function boot() {
  applyDarkMode();
  setupDarkToggle();
  updateStreakAndReward();
  const page = document.body.dataset.page;
  if (page === "home") initHome();
  if (page === "dashboard") initDashboard();
  if (page === "game") initGame();
}

boot();
