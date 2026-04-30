// Learn Computer Through Games - all logic works without external libraries.
const screens = document.querySelectorAll(".screen");
const bestScoreEl = document.getElementById("bestScore");
const confettiLayer = document.getElementById("confettiLayer");

let totalSessionScore = 0;

const quizData = [
  {
    question: "What is the brain of computer?",
    choices: ["CPU", "Mouse", "Monitor", "Printer"],
    answer: "CPU"
  },
  {
    question: "Which device is input?",
    choices: ["Monitor", "Keyboard", "Speaker", "Printer"],
    answer: "Keyboard"
  },
  {
    question: "Full form of AI?",
    choices: ["Auto Internet", "Artificial Intelligence", "Advanced Input", "Audio Interface"],
    answer: "Artificial Intelligence"
  },
  {
    question: "Which is output device?",
    choices: ["Keyboard", "Mouse", "Monitor", "Scanner"],
    answer: "Monitor"
  },
  {
    question: "Which software is browser?",
    choices: ["Chrome", "MS Word", "Recycle Bin", "Folder"],
    answer: "Chrome"
  }
];

const devices = [
  { name: "Keyboard", category: "input", icon: "⌨️" },
  { name: "Mouse", category: "input", icon: "🖱️" },
  { name: "Monitor", category: "output", icon: "🖥️" },
  { name: "Printer", category: "output", icon: "🖨️" },
  { name: "Speaker", category: "output", icon: "🔊" }
];

const pictureData = [
  { name: "Chrome", icon: "🌐", choices: ["Chrome", "Folder", "MS Word", "Recycle Bin"] },
  { name: "MS Word", icon: "📄", choices: ["Chrome", "MS Word", "Printer", "Keyboard"] },
  { name: "Folder", icon: "📁", choices: ["Recycle Bin", "Folder", "Monitor", "Mouse"] },
  { name: "Recycle Bin", icon: "🗑️", choices: ["Speaker", "Chrome", "Recycle Bin", "MS Word"] }
];

let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;

let dragScore = 0;
let placedDevices = new Set();

let pictureIndex = 0;
let pictureScore = 0;
let pictureAnswered = false;

function showScreen(screenId) {
  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.id === screenId);
  });
}

function getBestScore() {
  return Number(localStorage.getItem("learnComputerBestScore") || "0");
}

function updateBestScore(score = 0) {
  const best = Math.max(getBestScore(), score);
  localStorage.setItem("learnComputerBestScore", String(best));
  bestScoreEl.textContent = best;
}

function addSessionScore(points) {
  totalSessionScore += points;
  updateBestScore(totalSessionScore);
}

function playBeep(isCorrect) {
  const AudioContext = window.AudioContext || window.webkitAudioContext;

  if (!AudioContext) {
    return;
  }

  const audio = new AudioContext();
  const oscillator = audio.createOscillator();
  const gain = audio.createGain();

  oscillator.type = isCorrect ? "sine" : "square";
  oscillator.frequency.value = isCorrect ? 720 : 180;
  gain.gain.setValueAtTime(0.08, audio.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.18);

  oscillator.connect(gain);
  gain.connect(audio.destination);
  oscillator.start();
  oscillator.stop(audio.currentTime + 0.18);
}

function setFeedback(element, message, isCorrect) {
  element.textContent = message;
  element.className = `feedback ${isCorrect ? "correct" : "wrong"}`;
  playBeep(isCorrect);
}

function launchConfetti() {
  const colors = ["#3047f5", "#18c6b7", "#ffcf5a", "#ff6b8a", "#16a34a"];
  confettiLayer.innerHTML = "";

  for (let i = 0; i < 70; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.animationDelay = `${Math.random() * 0.35}s`;
    piece.style.transform = `rotate(${Math.random() * 180}deg)`;
    confettiLayer.appendChild(piece);
  }

  window.setTimeout(() => {
    confettiLayer.innerHTML = "";
  }, 1600);
}

function startQuiz() {
  quizIndex = 0;
  quizScore = 0;
  quizAnswered = false;
  document.getElementById("quizResult").classList.add("hidden");
  document.querySelector("#quizScreen > .game-card").classList.remove("hidden");
  showScreen("quizScreen");
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const current = quizData[quizIndex];
  const quizChoices = document.getElementById("quizChoices");
  const progress = ((quizIndex) / quizData.length) * 100;

  quizAnswered = false;
  document.getElementById("quizCount").textContent = `Question ${quizIndex + 1} of ${quizData.length}`;
  document.getElementById("quizScore").textContent = quizScore;
  document.getElementById("quizProgress").style.width = `${progress}%`;
  document.getElementById("quizQuestion").textContent = current.question;
  document.getElementById("quizFeedback").textContent = "";
  document.getElementById("quizFeedback").className = "feedback";
  document.getElementById("nextQuizBtn").disabled = true;

  quizChoices.innerHTML = "";
  current.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.className = "choice-button";
    button.type = "button";
    button.textContent = choice;
    button.addEventListener("click", () => selectQuizAnswer(button, choice));
    quizChoices.appendChild(button);
  });
}

function selectQuizAnswer(button, choice) {
  if (quizAnswered) {
    return;
  }

  const correctAnswer = quizData[quizIndex].answer;
  const isCorrect = choice === correctAnswer;
  const feedback = document.getElementById("quizFeedback");

  quizAnswered = true;
  document.querySelectorAll("#quizChoices .choice-button").forEach((choiceButton) => {
    choiceButton.disabled = true;
    if (choiceButton.textContent === correctAnswer) {
      choiceButton.classList.add("correct");
    }
  });

  if (isCorrect) {
    quizScore += 1;
    addSessionScore(1);
    document.getElementById("quizScore").textContent = quizScore;
    setFeedback(feedback, "Correct! Great job.", true);
  } else {
    button.classList.add("wrong");
    setFeedback(feedback, `Wrong! Correct answer: ${correctAnswer}`, false);
  }

  document.getElementById("nextQuizBtn").disabled = false;
}

function nextQuizQuestion() {
  quizIndex += 1;

  if (quizIndex >= quizData.length) {
    finishQuiz();
    return;
  }

  renderQuizQuestion();
}

function finishQuiz() {
  document.getElementById("quizProgress").style.width = "100%";
  document.querySelector("#quizScreen > .game-card").classList.add("hidden");
  document.getElementById("quizResult").classList.remove("hidden");
  document.getElementById("quizResultText").textContent = `Your score is ${quizScore} out of ${quizData.length}.`;
  launchConfetti();
}

function startDragGame() {
  dragScore = 0;
  placedDevices = new Set();
  document.getElementById("dragScore").textContent = dragScore;
  document.getElementById("dragFeedback").textContent = "";
  document.getElementById("dragFeedback").className = "feedback";
  document.querySelectorAll(".drop-zone").forEach((zone) => {
    zone.querySelectorAll(".device-item").forEach((item) => item.remove());
  });
  renderDeviceItems();
  showScreen("dragScreen");
}

function renderDeviceItems() {
  const deviceItems = document.getElementById("deviceItems");
  deviceItems.innerHTML = "";

  devices.forEach((device) => {
    const item = document.createElement("button");
    item.className = "device-item";
    item.type = "button";
    item.draggable = true;
    item.dataset.name = device.name;
    item.dataset.category = device.category;
    item.textContent = `${device.icon} ${device.name}`;

    item.addEventListener("dragstart", (event) => {
      item.classList.add("dragging");
      event.dataTransfer.setData("text/plain", device.name);
    });

    item.addEventListener("dragend", () => {
      item.classList.remove("dragging");
    });

    deviceItems.appendChild(item);
  });
}

function setupDropZones() {
  document.querySelectorAll(".drop-zone").forEach((zone) => {
    zone.addEventListener("dragover", (event) => {
      event.preventDefault();
      zone.classList.add("over");
    });

    zone.addEventListener("dragleave", () => {
      zone.classList.remove("over");
    });

    zone.addEventListener("drop", (event) => {
      event.preventDefault();
      zone.classList.remove("over");

      const deviceName = event.dataTransfer.getData("text/plain");
      const item = document.querySelector(`.device-item[data-name="${deviceName}"]`);

      if (!item || placedDevices.has(deviceName)) {
        return;
      }

      const isCorrect = item.dataset.category === zone.dataset.category;
      const feedback = document.getElementById("dragFeedback");

      if (isCorrect) {
        placedDevices.add(deviceName);
        dragScore += 1;
        addSessionScore(1);
        item.classList.add("placed");
        item.draggable = false;
        zone.appendChild(item);
        document.getElementById("dragScore").textContent = dragScore;
        setFeedback(feedback, `Correct! ${deviceName} belongs in ${zone.dataset.category}.`, true);

        if (dragScore === devices.length) {
          window.setTimeout(() => {
            setFeedback(feedback, "Excellent! You sorted every device.", true);
            launchConfetti();
          }, 250);
        }
      } else {
        setFeedback(feedback, `Try again! ${deviceName} does not belong there.`, false);
      }
    });
  });
}

function startPictureGame() {
  pictureIndex = 0;
  pictureScore = 0;
  pictureAnswered = false;
  document.getElementById("pictureResult").classList.add("hidden");
  document.querySelector("#pictureScreen > .game-card").classList.remove("hidden");
  showScreen("pictureScreen");
  renderPictureQuestion();
}

function renderPictureQuestion() {
  const current = pictureData[pictureIndex];
  const pictureChoices = document.getElementById("pictureChoices");

  pictureAnswered = false;
  document.getElementById("pictureCount").textContent = `Item ${pictureIndex + 1} of ${pictureData.length}`;
  document.getElementById("pictureScore").textContent = pictureScore;
  document.getElementById("pictureEmoji").textContent = current.icon;
  document.getElementById("pictureFeedback").textContent = "";
  document.getElementById("pictureFeedback").className = "feedback";
  document.getElementById("nextPictureBtn").disabled = true;

  pictureChoices.innerHTML = "";
  current.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.className = "choice-button";
    button.type = "button";
    button.textContent = choice;
    button.addEventListener("click", () => selectPictureAnswer(button, choice));
    pictureChoices.appendChild(button);
  });
}

function selectPictureAnswer(button, choice) {
  if (pictureAnswered) {
    return;
  }

  const correctAnswer = pictureData[pictureIndex].name;
  const isCorrect = choice === correctAnswer;
  const feedback = document.getElementById("pictureFeedback");

  pictureAnswered = true;
  document.querySelectorAll("#pictureChoices .choice-button").forEach((choiceButton) => {
    choiceButton.disabled = true;
    if (choiceButton.textContent === correctAnswer) {
      choiceButton.classList.add("correct");
    }
  });

  if (isCorrect) {
    pictureScore += 1;
    addSessionScore(1);
    document.getElementById("pictureScore").textContent = pictureScore;
    setFeedback(feedback, "Correct picture match!", true);
  } else {
    button.classList.add("wrong");
    setFeedback(feedback, `Wrong! This is ${correctAnswer}.`, false);
  }

  document.getElementById("nextPictureBtn").disabled = false;
}

function nextPictureQuestion() {
  pictureIndex += 1;

  if (pictureIndex >= pictureData.length) {
    finishPictureGame();
    return;
  }

  renderPictureQuestion();
}

function finishPictureGame() {
  document.querySelector("#pictureScreen > .game-card").classList.add("hidden");
  document.getElementById("pictureResult").classList.remove("hidden");
  document.getElementById("pictureResultText").textContent = `Your score is ${pictureScore} out of ${pictureData.length}.`;
  launchConfetti();
}

document.getElementById("homeLogo").addEventListener("click", () => showScreen("homeScreen"));
document.getElementById("startQuizBtn").addEventListener("click", startQuiz);
document.getElementById("dragGameBtn").addEventListener("click", startDragGame);
document.getElementById("pictureGameBtn").addEventListener("click", startPictureGame);
document.getElementById("nextQuizBtn").addEventListener("click", nextQuizQuestion);
document.getElementById("restartQuizBtn").addEventListener("click", startQuiz);
document.getElementById("resetDragBtn").addEventListener("click", startDragGame);
document.getElementById("nextPictureBtn").addEventListener("click", nextPictureQuestion);
document.getElementById("restartPictureBtn").addEventListener("click", startPictureGame);

document.querySelectorAll("[data-screen]").forEach((button) => {
  button.addEventListener("click", () => showScreen(button.dataset.screen));
});

setupDropZones();
updateBestScore();
