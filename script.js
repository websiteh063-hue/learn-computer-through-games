// Learn Computer Through Games - all logic works without external libraries.
const screens = document.querySelectorAll(".screen");
const bestScoreEl = document.getElementById("bestScore");
const confettiLayer = document.getElementById("confettiLayer");

let totalSessionScore = 0;

let activeQuizData = [];
let selectedClass = 1;
let selectedLevel = "easy";

const quizBank = {
  easy: [
    { minClass: 1, question: "What is the brain of a computer?", answer: "CPU", choices: ["CPU", "Mouse", "Speaker", "Printer"] },
    { minClass: 1, question: "Which device is used to type letters?", answer: "Keyboard", choices: ["Keyboard", "Monitor", "Speaker", "CPU"] },
    { minClass: 1, question: "Which device shows pictures and text?", answer: "Monitor", choices: ["Monitor", "Mouse", "Keyboard", "Microphone"] },
    { minClass: 1, question: "Which device is used to move the pointer?", answer: "Mouse", choices: ["Mouse", "Printer", "Speaker", "Scanner"] },
    { minClass: 2, question: "Which icon is used to keep deleted files?", answer: "Recycle Bin", choices: ["Recycle Bin", "Chrome", "MS Word", "Paint"] },
    { minClass: 2, question: "Which software helps us browse websites?", answer: "Chrome", choices: ["Chrome", "Calculator", "Notepad", "Folder"] },
    { minClass: 3, question: "Which device prints on paper?", answer: "Printer", choices: ["Printer", "Monitor", "Mouse", "CPU"] },
    { minClass: 3, question: "Which device plays sound?", answer: "Speaker", choices: ["Speaker", "Keyboard", "Scanner", "Monitor"] },
    { minClass: 4, question: "Which key is used to give space between words?", answer: "Spacebar", choices: ["Spacebar", "Enter", "Shift", "Esc"] },
    { minClass: 4, question: "Which software is used for drawing simple pictures?", answer: "Paint", choices: ["Paint", "Chrome", "Excel", "Recycle Bin"] },
    { minClass: 5, question: "What does AI stand for?", answer: "Artificial Intelligence", choices: ["Artificial Intelligence", "Automatic Internet", "Advanced Icon", "Audio Input"] },
    { minClass: 5, question: "Which part stores files and folders permanently?", answer: "Storage", choices: ["Storage", "Mouse", "Monitor", "Speaker"] },
    { minClass: 6, question: "Which device is both input and output on many phones?", answer: "Touchscreen", choices: ["Touchscreen", "Printer", "Keyboard", "Speaker"] },
    { minClass: 7, question: "Which program is used to make presentations?", answer: "PowerPoint", choices: ["PowerPoint", "Chrome", "Recycle Bin", "Paint"] },
    { minClass: 8, question: "Which device connects a computer to a network?", answer: "Router", choices: ["Router", "Printer", "Mouse", "Monitor"] },
    { minClass: 9, question: "Which language is used to style web pages?", answer: "CSS", choices: ["CSS", "HTML", "RAM", "CPU"] },
    { minClass: 10, question: "Which tag is used for the main heading in HTML?", answer: "h1", choices: ["h1", "img", "br", "link"] }
  ],
  medium: [
    { minClass: 1, question: "Which device sends information into a computer?", answer: "Input device", choices: ["Input device", "Output device", "Storage device", "Power cable"] },
    { minClass: 2, question: "Which device gives information from a computer?", answer: "Output device", choices: ["Output device", "Input device", "Folder", "Cursor"] },
    { minClass: 3, question: "Which memory is temporary and clears when power is off?", answer: "RAM", choices: ["RAM", "Hard disk", "Pen drive", "DVD"] },
    { minClass: 4, question: "Which software is used to write documents?", answer: "MS Word", choices: ["MS Word", "Chrome", "Paint", "Recycle Bin"] },
    { minClass: 5, question: "Which shortcut copies selected text or files?", answer: "Ctrl + C", choices: ["Ctrl + C", "Ctrl + V", "Ctrl + Z", "Ctrl + P"] },
    { minClass: 5, question: "Which shortcut pastes copied text or files?", answer: "Ctrl + V", choices: ["Ctrl + V", "Ctrl + C", "Ctrl + S", "Ctrl + A"] },
    { minClass: 6, question: "What is an operating system?", answer: "System software", choices: ["System software", "Input device", "Output device", "Website"] },
    { minClass: 6, question: "Which is an example of an operating system?", answer: "Windows", choices: ["Windows", "Chrome", "Keyboard", "Printer"] },
    { minClass: 7, question: "Which number system uses only 0 and 1?", answer: "Binary", choices: ["Binary", "Decimal", "Roman", "Alphabet"] },
    { minClass: 7, question: "Which unit is larger than MB?", answer: "GB", choices: ["GB", "KB", "Byte", "Bit"] },
    { minClass: 8, question: "What does URL mean?", answer: "Uniform Resource Locator", choices: ["Uniform Resource Locator", "Universal Robot Link", "User Record Login", "Unit Resource Label"] },
    { minClass: 8, question: "Which technology protects data by changing it into secret code?", answer: "Encryption", choices: ["Encryption", "Formatting", "Scrolling", "Printing"] },
    { minClass: 9, question: "Which language gives structure to a web page?", answer: "HTML", choices: ["HTML", "CSS", "JavaScript", "SQL"] },
    { minClass: 9, question: "Which language makes web pages interactive?", answer: "JavaScript", choices: ["JavaScript", "HTML", "CSS", "PNG"] },
    { minClass: 10, question: "Which database language is used to query data?", answer: "SQL", choices: ["SQL", "HTML", "CSS", "HTTP"] },
    { minClass: 10, question: "Which network connects computers worldwide?", answer: "Internet", choices: ["Internet", "Bluetooth", "Printer", "Folder"] }
  ],
  hard: [
    { minClass: 1, question: "Which device can scan a paper image into a computer?", answer: "Scanner", choices: ["Scanner", "Speaker", "Monitor", "CPU"] },
    { minClass: 2, question: "Which key starts a new line while typing?", answer: "Enter", choices: ["Enter", "Shift", "Caps Lock", "Tab"] },
    { minClass: 3, question: "Which storage device is small and portable?", answer: "Pen drive", choices: ["Pen drive", "Monitor", "Keyboard", "Speaker"] },
    { minClass: 4, question: "What is a folder used for?", answer: "Organizing files", choices: ["Organizing files", "Playing sound", "Typing text", "Printing pages"] },
    { minClass: 5, question: "Which part performs calculations and instructions?", answer: "Processor", choices: ["Processor", "Monitor", "Mouse", "Speaker"] },
    { minClass: 6, question: "What does CPU stand for?", answer: "Central Processing Unit", choices: ["Central Processing Unit", "Computer Power Unit", "Central Program Utility", "Control Print Unit"] },
    { minClass: 7, question: "How many bits make one byte?", answer: "8", choices: ["8", "2", "10", "16"] },
    { minClass: 7, question: "Which type of software helps protect from viruses?", answer: "Antivirus", choices: ["Antivirus", "Browser", "Spreadsheet", "Paint"] },
    { minClass: 8, question: "Which protocol is commonly used for secure websites?", answer: "HTTPS", choices: ["HTTPS", "FTP", "PNG", "CPU"] },
    { minClass: 8, question: "Which address identifies a device on a network?", answer: "IP address", choices: ["IP address", "Font name", "File icon", "Screen size"] },
    { minClass: 9, question: "Which HTML element links a CSS file?", answer: "link", choices: ["link", "style", "script", "meta"] },
    { minClass: 9, question: "Which CSS property changes text color?", answer: "color", choices: ["color", "font-size", "display", "margin"] },
    { minClass: 10, question: "Which programming idea repeats code while a condition is true?", answer: "Loop", choices: ["Loop", "Variable", "Comment", "Array"] },
    { minClass: 10, question: "Which data structure stores multiple values in order?", answer: "Array", choices: ["Array", "Boolean", "Pixel", "Router"] },
    { minClass: 10, question: "What does API stand for?", answer: "Application Programming Interface", choices: ["Application Programming Interface", "Automatic Program Icon", "Applied Power Input", "Advanced Page Internet"] },
    { minClass: 10, question: "Which cyber attack tries to steal passwords with fake messages?", answer: "Phishing", choices: ["Phishing", "Formatting", "Printing", "Cropping"] }
  ]
};

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

function shuffleArray(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function getNearbyClassQuestions(classNumber, level) {
  return quizBank[level].filter((item) => item.minClass <= classNumber);
}

function createGeneratedQuestion(classNumber, level, questionNumber) {
  const topicByLevel = {
    easy: [
      ["input device", "Keyboard", ["Keyboard", "Monitor", "Speaker", "Printer"]],
      ["output device", "Monitor", ["Monitor", "Keyboard", "Mouse", "Scanner"]],
      ["web browser", "Chrome", ["Chrome", "Folder", "Recycle Bin", "Paint"]]
    ],
    medium: [
      ["temporary memory", "RAM", ["RAM", "ROM", "Hard disk", "Pen drive"]],
      ["document software", "MS Word", ["MS Word", "Chrome", "Paint", "Calculator"]],
      ["computer network", "Internet", ["Internet", "Printer", "Keyboard", "Folder"]]
    ],
    hard: [
      ["secure website protocol", "HTTPS", ["HTTPS", "HTTP", "CPU", "RAM"]],
      ["web page structure language", "HTML", ["HTML", "CSS", "JavaScript", "SQL"]],
      ["interactive web language", "JavaScript", ["JavaScript", "HTML", "CSS", "Router"]]
    ]
  };
  const selected = topicByLevel[level][(classNumber + questionNumber) % topicByLevel[level].length];

  return {
    question: `Class ${classNumber}: Which answer matches ${selected[0]}?`,
    answer: selected[1],
    choices: selected[2]
  };
}

function generateQuiz(classNumber, level) {
  const bank = getNearbyClassQuestions(classNumber, level);
  const questionTarget = classNumber >= 8 || level === "hard" ? 8 : 6;
  const chosen = shuffleArray(bank).slice(0, questionTarget);

  while (chosen.length < questionTarget) {
    chosen.push(createGeneratedQuestion(classNumber, level, chosen.length));
  }

  return shuffleArray(chosen).map((item) => ({
    ...item,
    choices: shuffleArray(item.choices)
  }));
}

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

function burstAnswerSpark(target) {
  const box = target.getBoundingClientRect();
  const sparkText = ["★", "✓", "+1", "Great!"];

  sparkText.forEach((text, index) => {
    const spark = document.createElement("span");
    spark.className = "answer-spark";
    spark.textContent = text;
    spark.style.left = `${box.left + box.width / 2 + (index - 1.5) * 24}px`;
    spark.style.top = `${box.top + box.height / 2}px`;
    document.body.appendChild(spark);

    window.setTimeout(() => {
      spark.remove();
    }, 760);
  });
}

function openQuizSetup() {
  document.getElementById("quizSetup").classList.remove("hidden");
  document.getElementById("quizPlayCard").classList.add("hidden");
  document.getElementById("quizResult").classList.add("hidden");
  showScreen("quizScreen");
}

function startQuiz() {
  quizIndex = 0;
  quizScore = 0;
  quizAnswered = false;
  selectedClass = Number(document.getElementById("classSelect").value);
  selectedLevel = document.getElementById("levelSelect").value;
  activeQuizData = generateQuiz(selectedClass, selectedLevel);
  document.getElementById("quizSetup").classList.add("hidden");
  document.getElementById("quizResult").classList.add("hidden");
  document.getElementById("quizPlayCard").classList.remove("hidden");
  showScreen("quizScreen");
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const current = activeQuizData[quizIndex];
  const quizChoices = document.getElementById("quizChoices");
  const progress = ((quizIndex) / activeQuizData.length) * 100;
  const questionEl = document.getElementById("quizQuestion");

  quizAnswered = false;
  document.getElementById("quizCount").textContent = `Class ${selectedClass} • ${selectedLevel.toUpperCase()} • Question ${quizIndex + 1} of ${activeQuizData.length}`;
  document.getElementById("quizScore").textContent = quizScore;
  document.getElementById("quizProgress").style.width = `${progress}%`;
  questionEl.textContent = current.question;
  questionEl.classList.remove("question-pop");
  void questionEl.offsetWidth;
  questionEl.classList.add("question-pop");
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

  const correctAnswer = activeQuizData[quizIndex].answer;
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
    burstAnswerSpark(button);
    setFeedback(feedback, "Correct! Great job.", true);
  } else {
    button.classList.add("wrong");
    setFeedback(feedback, `Wrong! Correct answer: ${correctAnswer}`, false);
  }

  document.getElementById("nextQuizBtn").disabled = false;
}

function nextQuizQuestion() {
  quizIndex += 1;

  if (quizIndex >= activeQuizData.length) {
    finishQuiz();
    return;
  }

  renderQuizQuestion();
}

function finishQuiz() {
  document.getElementById("quizProgress").style.width = "100%";
  document.getElementById("quizPlayCard").classList.add("hidden");
  document.getElementById("quizResult").classList.remove("hidden");
  document.getElementById("quizResultText").textContent = `Class ${selectedClass} ${selectedLevel} result: ${quizScore} out of ${activeQuizData.length}. Generate again for a new quiz.`;
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
document.getElementById("startQuizBtn").addEventListener("click", openQuizSetup);
document.getElementById("generateQuizBtn").addEventListener("click", startQuiz);
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
