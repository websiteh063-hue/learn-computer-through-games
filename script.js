// Learn Through Games - all logic works without external libraries.
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

const dragTopicBank = {
  easy: [
    { minClass: 1, name: "Keyboard", category: "input", icon: "⌨️" },
    { minClass: 1, name: "Mouse", category: "input", icon: "🖱️" },
    { minClass: 1, name: "Microphone", category: "input", icon: "🎙️" },
    { minClass: 1, name: "Monitor", category: "output", icon: "🖥️" },
    { minClass: 1, name: "Speaker", category: "output", icon: "🔊" },
    { minClass: 2, name: "Printer", category: "output", icon: "🖨️" },
    { minClass: 2, name: "Scanner", category: "input", icon: "📠" },
    { minClass: 3, name: "Webcam", category: "input", icon: "📷" },
    { minClass: 4, name: "Projector", category: "output", icon: "📽️" },
    { minClass: 5, name: "Touchpad", category: "input", icon: "👆" },
    { minClass: 6, name: "Headphones", category: "output", icon: "🎧" },
    { minClass: 7, name: "Barcode Scanner", category: "input", icon: "▥" },
    { minClass: 8, name: "Plotter", category: "output", icon: "📈" },
    { minClass: 9, name: "Joystick", category: "input", icon: "🕹️" },
    { minClass: 10, name: "Braille Display", category: "output", icon: "⠿" }
  ],
  medium: [
    { minClass: 1, name: "Touchscreen Tap", category: "input", icon: "👆" },
    { minClass: 2, name: "Printed Page", category: "output", icon: "📄" },
    { minClass: 3, name: "Voice Command", category: "input", icon: "🎙️" },
    { minClass: 3, name: "Music Playback", category: "output", icon: "🎵" },
    { minClass: 4, name: "Drawing Tablet", category: "input", icon: "✍️" },
    { minClass: 4, name: "Screen Message", category: "output", icon: "💬" },
    { minClass: 5, name: "Game Controller", category: "input", icon: "🎮" },
    { minClass: 5, name: "LED Display", category: "output", icon: "🔆" },
    { minClass: 6, name: "Fingerprint Scan", category: "input", icon: "☝️" },
    { minClass: 6, name: "3D Printed Model", category: "output", icon: "🧊" },
    { minClass: 7, name: "QR Code Scan", category: "input", icon: "▦" },
    { minClass: 8, name: "Notification Sound", category: "output", icon: "🔔" },
    { minClass: 9, name: "Sensor Reading", category: "input", icon: "🌡️" },
    { minClass: 10, name: "Dashboard Chart", category: "output", icon: "📊" }
  ],
  hard: [
    { minClass: 1, name: "Mouse Click Signal", category: "input", icon: "🖱️" },
    { minClass: 2, name: "Screen Pixel Color", category: "output", icon: "🟩" },
    { minClass: 3, name: "Scanned Image Data", category: "input", icon: "🖼️" },
    { minClass: 4, name: "Audio Wave From Speaker", category: "output", icon: "〰️" },
    { minClass: 5, name: "Stylus Stroke", category: "input", icon: "🖊️" },
    { minClass: 6, name: "Printed Report", category: "output", icon: "📑" },
    { minClass: 7, name: "Biometric Face Scan", category: "input", icon: "🙂" },
    { minClass: 7, name: "Haptic Vibration", category: "output", icon: "📳" },
    { minClass: 8, name: "GPS Sensor Data", category: "input", icon: "📍" },
    { minClass: 8, name: "Projected Slide", category: "output", icon: "📽️" },
    { minClass: 9, name: "RFID Tag Read", category: "input", icon: "🏷️" },
    { minClass: 9, name: "Status LED Blink", category: "output", icon: "💡" },
    { minClass: 10, name: "API Request Payload", category: "input", icon: "📨" },
    { minClass: 10, name: "API Response Display", category: "output", icon: "📬" }
  ]
};

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
let selectedDragClass = 1;
let selectedDragLevel = "easy";
let activeDragItems = [];

let pictureIndex = 0;
let pictureScore = 0;
let pictureAnswered = false;

function shuffleArray(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function getNearbyClassQuestions(classNumber, level) {
  return quizBank[level].filter((item) => item.minClass <= classNumber);
}

const generatedTopicBank = {
  easy: [
    { minClass: 1, clue: "the brain of the computer", answer: "CPU", choices: ["CPU", "Mouse", "Speaker", "Printer"] },
    { minClass: 1, clue: "a typing input device", answer: "Keyboard", choices: ["Keyboard", "Monitor", "Printer", "Speaker"] },
    { minClass: 1, clue: "a pointing input device", answer: "Mouse", choices: ["Mouse", "Monitor", "CPU", "Printer"] },
    { minClass: 1, clue: "the screen of a computer", answer: "Monitor", choices: ["Monitor", "Keyboard", "Mouse", "Scanner"] },
    { minClass: 1, clue: "a device that plays sound", answer: "Speaker", choices: ["Speaker", "Keyboard", "Scanner", "CPU"] },
    { minClass: 2, clue: "the place where deleted files go", answer: "Recycle Bin", choices: ["Recycle Bin", "Chrome", "Folder", "Paint"] },
    { minClass: 2, clue: "software used to visit websites", answer: "Chrome", choices: ["Chrome", "MS Word", "Folder", "Calculator"] },
    { minClass: 2, clue: "a place used to organize files", answer: "Folder", choices: ["Folder", "Mouse", "Monitor", "Speaker"] },
    { minClass: 3, clue: "a device that prints on paper", answer: "Printer", choices: ["Printer", "Monitor", "Keyboard", "Mouse"] },
    { minClass: 3, clue: "software used to draw simple pictures", answer: "Paint", choices: ["Paint", "Chrome", "Recycle Bin", "Speaker"] },
    { minClass: 4, clue: "the key used to make a blank space", answer: "Spacebar", choices: ["Spacebar", "Enter", "Shift", "Esc"] },
    { minClass: 4, clue: "the key used to start a new line", answer: "Enter", choices: ["Enter", "Tab", "Caps Lock", "Ctrl"] },
    { minClass: 5, clue: "the full form of AI", answer: "Artificial Intelligence", choices: ["Artificial Intelligence", "Automatic Internet", "Advanced Input", "Audio Interface"] },
    { minClass: 6, clue: "a touch device that works as input and output", answer: "Touchscreen", choices: ["Touchscreen", "Printer", "Keyboard", "Speaker"] },
    { minClass: 7, clue: "software used to make slides", answer: "PowerPoint", choices: ["PowerPoint", "Chrome", "Paint", "Recycle Bin"] },
    { minClass: 8, clue: "a device that helps connect to a network", answer: "Router", choices: ["Router", "Printer", "Keyboard", "Monitor"] },
    { minClass: 9, clue: "the language used to style websites", answer: "CSS", choices: ["CSS", "HTML", "RAM", "CPU"] },
    { minClass: 10, clue: "the main heading tag in HTML", answer: "h1", choices: ["h1", "img", "br", "link"] }
  ],
  medium: [
    { minClass: 1, clue: "a device that sends data into a computer", answer: "Input device", choices: ["Input device", "Output device", "Storage device", "Power device"] },
    { minClass: 2, clue: "a device that gives results from a computer", answer: "Output device", choices: ["Output device", "Input device", "Folder", "Cursor"] },
    { minClass: 3, clue: "temporary memory that clears when power is off", answer: "RAM", choices: ["RAM", "Hard disk", "Pen drive", "DVD"] },
    { minClass: 4, clue: "software used to write documents", answer: "MS Word", choices: ["MS Word", "Chrome", "Paint", "Recycle Bin"] },
    { minClass: 5, clue: "the shortcut used to copy", answer: "Ctrl + C", choices: ["Ctrl + C", "Ctrl + V", "Ctrl + Z", "Ctrl + P"] },
    { minClass: 5, clue: "the shortcut used to paste", answer: "Ctrl + V", choices: ["Ctrl + V", "Ctrl + C", "Ctrl + S", "Ctrl + A"] },
    { minClass: 6, clue: "software that manages computer hardware", answer: "Operating system", choices: ["Operating system", "Browser", "Keyboard", "Printer"] },
    { minClass: 6, clue: "an example of an operating system", answer: "Windows", choices: ["Windows", "Chrome", "Keyboard", "Printer"] },
    { minClass: 7, clue: "the number system that uses only 0 and 1", answer: "Binary", choices: ["Binary", "Decimal", "Roman", "Alphabet"] },
    { minClass: 7, clue: "the unit larger than MB", answer: "GB", choices: ["GB", "KB", "Byte", "Bit"] },
    { minClass: 8, clue: "the full form of URL", answer: "Uniform Resource Locator", choices: ["Uniform Resource Locator", "Universal Robot Link", "User Record Login", "Unit Resource Label"] },
    { minClass: 8, clue: "secret-code protection for data", answer: "Encryption", choices: ["Encryption", "Formatting", "Scrolling", "Printing"] },
    { minClass: 9, clue: "the language that gives web pages structure", answer: "HTML", choices: ["HTML", "CSS", "JavaScript", "SQL"] },
    { minClass: 9, clue: "the language that makes web pages interactive", answer: "JavaScript", choices: ["JavaScript", "HTML", "CSS", "PNG"] },
    { minClass: 10, clue: "the database language used to query data", answer: "SQL", choices: ["SQL", "HTML", "CSS", "HTTP"] },
    { minClass: 10, clue: "the worldwide network of computers", answer: "Internet", choices: ["Internet", "Bluetooth", "Printer", "Folder"] }
  ],
  hard: [
    { minClass: 1, clue: "a device that scans paper into a computer", answer: "Scanner", choices: ["Scanner", "Speaker", "Monitor", "CPU"] },
    { minClass: 2, clue: "the key that makes capital letters when held", answer: "Shift", choices: ["Shift", "Enter", "Esc", "Tab"] },
    { minClass: 3, clue: "a small portable storage device", answer: "Pen drive", choices: ["Pen drive", "Monitor", "Keyboard", "Speaker"] },
    { minClass: 4, clue: "the action of arranging files in folders", answer: "Organizing", choices: ["Organizing", "Printing", "Typing", "Scrolling"] },
    { minClass: 5, clue: "the part that performs calculations", answer: "Processor", choices: ["Processor", "Monitor", "Mouse", "Speaker"] },
    { minClass: 6, clue: "the full form of CPU", answer: "Central Processing Unit", choices: ["Central Processing Unit", "Computer Power Unit", "Central Program Utility", "Control Print Unit"] },
    { minClass: 7, clue: "the number of bits in one byte", answer: "8", choices: ["8", "2", "10", "16"] },
    { minClass: 7, clue: "software that helps protect from viruses", answer: "Antivirus", choices: ["Antivirus", "Browser", "Spreadsheet", "Paint"] },
    { minClass: 8, clue: "the protocol commonly used for secure websites", answer: "HTTPS", choices: ["HTTPS", "FTP", "PNG", "CPU"] },
    { minClass: 8, clue: "an address that identifies a device on a network", answer: "IP address", choices: ["IP address", "Font name", "File icon", "Screen size"] },
    { minClass: 9, clue: "the HTML element used to connect a CSS file", answer: "link", choices: ["link", "style", "script", "meta"] },
    { minClass: 9, clue: "the CSS property that changes text color", answer: "color", choices: ["color", "font-size", "display", "margin"] },
    { minClass: 10, clue: "the programming idea that repeats code", answer: "Loop", choices: ["Loop", "Variable", "Comment", "Array"] },
    { minClass: 10, clue: "a data structure that stores values in order", answer: "Array", choices: ["Array", "Boolean", "Pixel", "Router"] },
    { minClass: 10, clue: "the full form of API", answer: "Application Programming Interface", choices: ["Application Programming Interface", "Automatic Program Icon", "Applied Power Input", "Advanced Page Internet"] },
    { minClass: 10, clue: "a fake-message attack that steals passwords", answer: "Phishing", choices: ["Phishing", "Formatting", "Printing", "Cropping"] }
  ]
};

const questionForms = {
  easy: [
    "Class {class} easy #{number}: Which option means {clue}?",
    "Class {class} easy practice #{number}: Pick the correct answer for {clue}.",
    "Class {class} easy round #{number}: What is {clue}?",
    "Class {class} easy quiz #{number}: Choose the computer term for {clue}."
  ],
  medium: [
    "Class {class} medium #{number}: Identify {clue}.",
    "Class {class} medium practice #{number}: Which answer best matches {clue}?",
    "Class {class} medium round #{number}: Select the correct term for {clue}.",
    "Class {class} medium quiz #{number}: What computer concept means {clue}?"
  ],
  hard: [
    "Class {class} hard #{number}: Which technical answer describes {clue}?",
    "Class {class} hard challenge #{number}: Choose the best match for {clue}.",
    "Class {class} hard round #{number}: What is the correct concept for {clue}?",
    "Class {class} hard quiz #{number}: Solve this computer concept: {clue}."
  ]
};

function buildQuestionFromTopic(classNumber, level, questionNumber) {
  const availableTopics = generatedTopicBank[level].filter((topic) => topic.minClass <= classNumber);
  const topic = availableTopics[(questionNumber * 7 + classNumber) % availableTopics.length];
  const form = questionForms[level][(questionNumber * 3 + classNumber) % questionForms[level].length];
  const question = form
    .replace("{class}", classNumber)
    .replace("{number}", questionNumber + 1)
    .replace("{clue}", topic.clue);

  return {
    question,
    answer: topic.answer,
    choices: shuffleArray(topic.choices)
  };
}

function buildQuestionPool(classNumber, level) {
  const curatedQuestions = getNearbyClassQuestions(classNumber, level).map((item, index) => ({
    question: `Class ${classNumber} ${level} starter #${index + 1}: ${item.question}`,
    answer: item.answer,
    choices: shuffleArray(item.choices)
  }));
  const generatedQuestions = [];

  for (let index = 0; index < 1000; index += 1) {
    generatedQuestions.push(buildQuestionFromTopic(classNumber, level, index));
  }

  return shuffleArray([...generatedQuestions, ...curatedQuestions]).slice(0, 1000);
}

function generateQuiz(classNumber, level) {
  const questionPool = buildQuestionPool(classNumber, level);

  return shuffleArray(questionPool).slice(0, 10).map((item) => ({
    ...item,
    choices: shuffleArray(item.choices)
  }));
}

function buildDragItem(classNumber, level, itemNumber) {
  const availableTopics = dragTopicBank[level].filter((topic) => topic.minClass <= classNumber);
  const topic = availableTopics[(itemNumber * 5 + classNumber) % availableTopics.length];
  const labels = {
    easy: ["Device", "Computer Item", "Tool", "Basic Item"],
    medium: ["Action", "Signal", "Computer Task", "Technology Item"],
    hard: ["Data Flow", "System Event", "Technical Signal", "Digital Process"]
  };
  const label = labels[level][(itemNumber + classNumber) % labels[level].length];

  return {
    id: `drag-${classNumber}-${level}-${itemNumber}`,
    name: `${topic.icon} ${topic.name} ${label} #${itemNumber + 1}`,
    category: topic.category
  };
}

function buildDragPool(classNumber, level) {
  const pool = [];

  for (let index = 0; index < 1000; index += 1) {
    pool.push(buildDragItem(classNumber, level, index));
  }

  return pool;
}

function generateDragRound(classNumber, level) {
  return shuffleArray(buildDragPool(classNumber, level)).slice(0, 10);
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

function openDragSetup() {
  document.getElementById("dragSetup").classList.remove("hidden");
  document.getElementById("dragPlayCard").classList.add("hidden");
  document.getElementById("dragFeedback").textContent = "";
  showScreen("dragScreen");
}

function startDragGame() {
  dragScore = 0;
  placedDevices = new Set();
  selectedDragClass = Number(document.getElementById("dragClassSelect").value);
  selectedDragLevel = document.getElementById("dragLevelSelect").value;
  activeDragItems = generateDragRound(selectedDragClass, selectedDragLevel);
  document.getElementById("dragSetup").classList.add("hidden");
  document.getElementById("dragPlayCard").classList.remove("hidden");
  document.getElementById("dragScore").textContent = dragScore;
  document.getElementById("dragTotal").textContent = activeDragItems.length;
  document.getElementById("dragRoundInfo").textContent = `Class ${selectedDragClass} • ${selectedDragLevel.toUpperCase()} • Sort 10 random cards`;
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

  activeDragItems.forEach((device) => {
    const item = document.createElement("button");
    item.className = "device-item";
    item.type = "button";
    item.draggable = true;
    item.dataset.id = device.id;
    item.dataset.category = device.category;
    item.textContent = device.name;

    item.addEventListener("dragstart", (event) => {
      item.classList.add("dragging");
      event.dataTransfer.setData("text/plain", device.id);
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

      const deviceId = event.dataTransfer.getData("text/plain");
      const item = document.querySelector(`.device-item[data-id="${deviceId}"]`);

      if (!item || placedDevices.has(deviceId)) {
        return;
      }

      const isCorrect = item.dataset.category === zone.dataset.category;
      const feedback = document.getElementById("dragFeedback");

      if (isCorrect) {
        placedDevices.add(deviceId);
        dragScore += 1;
        addSessionScore(1);
        burstAnswerSpark(item);
        item.classList.add("placed");
        item.draggable = false;
        zone.appendChild(item);
        document.getElementById("dragScore").textContent = dragScore;
        setFeedback(feedback, `Correct! This card belongs in ${zone.dataset.category}.`, true);

        if (dragScore === activeDragItems.length) {
          window.setTimeout(() => {
            setFeedback(feedback, "Excellent! You sorted every device.", true);
            launchConfetti();
          }, 250);
        }
      } else {
        setFeedback(feedback, "Try again! That card does not belong there.", false);
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
  document.getElementById("pictureDisplay").innerHTML = `<img src="${current.icon}" alt="${current.name} icon">`;
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

const subjectSettings = {
  computer: {
    name: "Computer",
    minClass: 1,
    maxClass: 10,
    dragCategories: [
      { key: "input", title: "Input", hint: "Cards that send data into a computer" },
      { key: "output", title: "Output", hint: "Cards that show or play computer results" }
    ]
  },
  science: {
    name: "Science",
    minClass: 5,
    maxClass: 10,
    dragCategories: [
      { key: "living", title: "Living", hint: "Living things and life processes" },
      { key: "nonliving", title: "Non-Living", hint: "Forces, materials, objects, and non-living ideas" }
    ]
  },
  english: {
    name: "English",
    minClass: 1,
    maxClass: 10,
    dragCategories: [
      { key: "noun", title: "Noun", hint: "Names of people, places, animals, or things" },
      { key: "verb", title: "Verb", hint: "Action words" }
    ]
  },
  maths: {
    name: "Maths",
    minClass: 1,
    maxClass: 10,
    dragCategories: [
      { key: "even", title: "Even", hint: "Numbers divisible by 2" },
      { key: "odd", title: "Odd", hint: "Numbers not divisible by 2" }
    ]
  },
  evs: {
    name: "EVS",
    minClass: 1,
    maxClass: 4,
    dragCategories: [
      { key: "natural", title: "Natural", hint: "Things found in nature" },
      { key: "manmade", title: "Man-Made", hint: "Things made by people" }
    ]
  }
};

const subjectQuestionTopics = {
  computer: {
    easy: generatedTopicBank.easy,
    medium: generatedTopicBank.medium,
    hard: generatedTopicBank.hard
  },
  science: {
    easy: [
      { minClass: 5, clue: "the process by which plants make food", answer: "Photosynthesis", choices: ["Photosynthesis", "Evaporation", "Condensation", "Friction"] },
      { minClass: 5, clue: "the force that pulls objects toward Earth", answer: "Gravity", choices: ["Gravity", "Magnetism", "Light", "Sound"] },
      { minClass: 6, clue: "the basic unit of life", answer: "Cell", choices: ["Cell", "Atom", "Force", "Planet"] },
      { minClass: 7, clue: "the organ used for breathing", answer: "Lungs", choices: ["Lungs", "Heart", "Stomach", "Brain"] },
      { minClass: 8, clue: "the change from liquid to gas", answer: "Evaporation", choices: ["Evaporation", "Freezing", "Melting", "Rusting"] },
      { minClass: 9, clue: "the center of an atom", answer: "Nucleus", choices: ["Nucleus", "Orbit", "Lens", "Root"] },
      { minClass: 10, clue: "the unit of electric current", answer: "Ampere", choices: ["Ampere", "Volt", "Ohm", "Watt"] }
    ],
    medium: [
      { minClass: 5, clue: "animals that eat only plants", answer: "Herbivores", choices: ["Herbivores", "Carnivores", "Omnivores", "Producers"] },
      { minClass: 6, clue: "materials that allow heat to pass easily", answer: "Conductors", choices: ["Conductors", "Insulators", "Solvents", "Mixtures"] },
      { minClass: 7, clue: "the removal of waste from the body", answer: "Excretion", choices: ["Excretion", "Digestion", "Respiration", "Nutrition"] },
      { minClass: 8, clue: "microbes that cause diseases", answer: "Pathogens", choices: ["Pathogens", "Minerals", "Metals", "Fibres"] },
      { minClass: 9, clue: "the rate of change of velocity", answer: "Acceleration", choices: ["Acceleration", "Speed", "Force", "Momentum"] },
      { minClass: 10, clue: "a reaction in which oxidation and reduction both happen", answer: "Redox reaction", choices: ["Redox reaction", "Neutralization", "Sublimation", "Filtration"] }
    ],
    hard: [
      { minClass: 5, clue: "the transfer of pollen to stigma", answer: "Pollination", choices: ["Pollination", "Germination", "Respiration", "Transpiration"] },
      { minClass: 6, clue: "a mixture with uniform composition", answer: "Homogeneous mixture", choices: ["Homogeneous mixture", "Suspension", "Colloid", "Element"] },
      { minClass: 7, clue: "the green pigment in leaves", answer: "Chlorophyll", choices: ["Chlorophyll", "Haemoglobin", "Melanin", "Keratin"] },
      { minClass: 8, clue: "force per unit area", answer: "Pressure", choices: ["Pressure", "Work", "Power", "Energy"] },
      { minClass: 9, clue: "the SI unit of force", answer: "Newton", choices: ["Newton", "Joule", "Pascal", "Tesla"] },
      { minClass: 10, clue: "the splitting of white light into colors", answer: "Dispersion", choices: ["Dispersion", "Reflection", "Refraction", "Diffusion"] }
    ]
  },
  english: {
    easy: [
      { minClass: 1, clue: "a naming word", answer: "Noun", choices: ["Noun", "Verb", "Adjective", "Adverb"] },
      { minClass: 1, clue: "an action word", answer: "Verb", choices: ["Verb", "Noun", "Article", "Pronoun"] },
      { minClass: 2, clue: "a word used instead of a noun", answer: "Pronoun", choices: ["Pronoun", "Verb", "Adverb", "Conjunction"] },
      { minClass: 3, clue: "a describing word", answer: "Adjective", choices: ["Adjective", "Noun", "Preposition", "Article"] },
      { minClass: 4, clue: "a sentence that asks something", answer: "Question", choices: ["Question", "Statement", "Command", "Phrase"] }
    ],
    medium: [
      { minClass: 3, clue: "a word that joins words or sentences", answer: "Conjunction", choices: ["Conjunction", "Noun", "Verb", "Article"] },
      { minClass: 4, clue: "a word that shows relation to place or time", answer: "Preposition", choices: ["Preposition", "Pronoun", "Adverb", "Interjection"] },
      { minClass: 5, clue: "the past tense of go", answer: "Went", choices: ["Went", "Goed", "Going", "Gone"] },
      { minClass: 6, clue: "a comparison using like or as", answer: "Simile", choices: ["Simile", "Metaphor", "Idiom", "Clause"] },
      { minClass: 8, clue: "the main idea of a paragraph", answer: "Topic sentence", choices: ["Topic sentence", "Suffix", "Prefix", "Tense"] }
    ],
    hard: [
      { minClass: 5, clue: "a group of words with subject and verb", answer: "Clause", choices: ["Clause", "Phrase", "Prefix", "Article"] },
      { minClass: 6, clue: "a direct comparison without like or as", answer: "Metaphor", choices: ["Metaphor", "Simile", "Hyperbole", "Synonym"] },
      { minClass: 7, clue: "a word opposite in meaning", answer: "Antonym", choices: ["Antonym", "Synonym", "Pronoun", "Adverb"] },
      { minClass: 9, clue: "the voice where subject receives action", answer: "Passive voice", choices: ["Passive voice", "Active voice", "Direct speech", "Future tense"] },
      { minClass: 10, clue: "a shortened form of a word or phrase", answer: "Abbreviation", choices: ["Abbreviation", "Alliteration", "Narration", "Punctuation"] }
    ]
  },
  maths: {
    easy: [
      { minClass: 1, clue: "the result of 2 + 3", answer: "5", choices: ["5", "4", "6", "7"] },
      { minClass: 2, clue: "a shape with three sides", answer: "Triangle", choices: ["Triangle", "Square", "Circle", "Cube"] },
      { minClass: 3, clue: "the result of 6 x 2", answer: "12", choices: ["12", "8", "10", "14"] },
      { minClass: 4, clue: "the top number in a fraction", answer: "Numerator", choices: ["Numerator", "Denominator", "Factor", "Product"] },
      { minClass: 5, clue: "a number divisible by 2", answer: "Even number", choices: ["Even number", "Odd number", "Prime number", "Decimal"] }
    ],
    medium: [
      { minClass: 4, clue: "the result of 48 divided by 6", answer: "8", choices: ["8", "6", "7", "9"] },
      { minClass: 5, clue: "the perimeter of a square with side 5", answer: "20", choices: ["20", "25", "10", "15"] },
      { minClass: 6, clue: "a number with exactly two factors", answer: "Prime number", choices: ["Prime number", "Composite number", "Even number", "Mixed number"] },
      { minClass: 7, clue: "the value of 3 squared", answer: "9", choices: ["9", "6", "12", "27"] },
      { minClass: 8, clue: "the formula for area of rectangle", answer: "Length x Breadth", choices: ["Length x Breadth", "2 x Length", "Side x Side", "Base x Height"] }
    ],
    hard: [
      { minClass: 6, clue: "the HCF of 12 and 18", answer: "6", choices: ["6", "3", "9", "12"] },
      { minClass: 7, clue: "a triangle with all sides equal", answer: "Equilateral triangle", choices: ["Equilateral triangle", "Scalene triangle", "Right triangle", "Isosceles triangle"] },
      { minClass: 8, clue: "the square root of 144", answer: "12", choices: ["12", "14", "16", "10"] },
      { minClass: 9, clue: "the graph of a linear equation is a", answer: "Straight line", choices: ["Straight line", "Circle", "Curve", "Triangle"] },
      { minClass: 10, clue: "the value of sin 30 degrees", answer: "1/2", choices: ["1/2", "1", "0", "√3/2"] }
    ]
  },
  evs: {
    easy: [
      { minClass: 1, clue: "the source of light during the day", answer: "Sun", choices: ["Sun", "Moon", "Star", "Cloud"] },
      { minClass: 1, clue: "the part of plant under the soil", answer: "Root", choices: ["Root", "Leaf", "Flower", "Stem"] },
      { minClass: 2, clue: "the thing we drink to stay healthy", answer: "Water", choices: ["Water", "Smoke", "Dust", "Plastic"] },
      { minClass: 3, clue: "the home of birds", answer: "Nest", choices: ["Nest", "Kennel", "Stable", "Hive"] },
      { minClass: 4, clue: "the process of keeping surroundings clean", answer: "Sanitation", choices: ["Sanitation", "Pollution", "Crowding", "Wasting"] }
    ],
    medium: [
      { minClass: 1, clue: "things needed by plants to grow", answer: "Air, water, sunlight", choices: ["Air, water, sunlight", "Plastic, smoke, dust", "Paper, stone, glass", "Oil, paint, metal"] },
      { minClass: 2, clue: "animals that live with humans", answer: "Domestic animals", choices: ["Domestic animals", "Wild animals", "Water animals", "Insects"] },
      { minClass: 3, clue: "the practice of using less water", answer: "Water conservation", choices: ["Water conservation", "Water pollution", "Water wasting", "Water boiling"] },
      { minClass: 4, clue: "dirty air, water, or land", answer: "Pollution", choices: ["Pollution", "Nutrition", "Direction", "Rotation"] }
    ],
    hard: [
      { minClass: 2, clue: "the natural home of an animal", answer: "Habitat", choices: ["Habitat", "Shelter", "Market", "Vehicle"] },
      { minClass: 3, clue: "waste that can rot naturally", answer: "Biodegradable waste", choices: ["Biodegradable waste", "Plastic waste", "Metal waste", "Glass waste"] },
      { minClass: 4, clue: "the chain that shows who eats whom", answer: "Food chain", choices: ["Food chain", "Traffic chain", "Water cycle", "Family tree"] }
    ]
  }
};

const pictureTopicBank = {
  computer: [
    { name: "Chrome", icon: "assets/images/chrome.svg", choices: ["Chrome", "Folder", "MS Word", "Recycle Bin"], minClass: 1 },
    { name: "MS Word", icon: "assets/images/word.svg", choices: ["MS Word", "Chrome", "Folder", "Recycle Bin"], minClass: 2 },
    { name: "Folder", icon: "assets/images/folder.svg", choices: ["Folder", "Chrome", "MS Word", "Recycle Bin"], minClass: 1 },
    { name: "Recycle Bin", icon: "assets/images/recycle-bin.svg", choices: ["Recycle Bin", "Chrome", "Folder", "MS Word"], minClass: 2 }
  ],
  science: [
    { name: "Science", icon: "assets/images/science.svg", choices: ["Science", "Maths", "English", "EVS"], minClass: 5 },
    { name: "Photosynthesis", icon: "assets/images/science.svg", choices: ["Photosynthesis", "Fraction", "Noun", "Folder"], minClass: 5 },
    { name: "Gravity", icon: "assets/images/science.svg", choices: ["Gravity", "Verb", "Chrome", "Triangle"], minClass: 6 },
    { name: "Cell", icon: "assets/images/science.svg", choices: ["Cell", "Sentence", "Printer", "Odd Number"], minClass: 6 }
  ],
  english: [
    { name: "English", icon: "assets/images/book.svg", choices: ["English", "Science", "Maths", "EVS"], minClass: 1 },
    { name: "Noun", icon: "assets/images/book.svg", choices: ["Noun", "Verb", "Fraction", "Chrome"], minClass: 1 },
    { name: "Verb", icon: "assets/images/book.svg", choices: ["Verb", "Noun", "Triangle", "Plant"], minClass: 1 },
    { name: "Adjective", icon: "assets/images/book.svg", choices: ["Adjective", "Gravity", "Folder", "Even Number"], minClass: 3 }
  ],
  maths: [
    { name: "Maths", icon: "assets/images/math.svg", choices: ["Maths", "English", "Science", "EVS"], minClass: 1 },
    { name: "Addition", icon: "assets/images/math.svg", choices: ["Addition", "Noun", "Chrome", "Leaf"], minClass: 1 },
    { name: "Triangle", icon: "assets/images/math.svg", choices: ["Triangle", "Circle", "Verb", "Folder"], minClass: 2 },
    { name: "Fraction", icon: "assets/images/math.svg", choices: ["Fraction", "Sentence", "Gravity", "Recycle Bin"], minClass: 4 }
  ],
  evs: [
    { name: "EVS", icon: "assets/images/evs.svg", choices: ["EVS", "Maths", "English", "Computer"], minClass: 1 },
    { name: "Plant", icon: "assets/images/evs.svg", choices: ["Plant", "Printer", "Verb", "Fraction"], minClass: 1 },
    { name: "Water", icon: "assets/images/evs.svg", choices: ["Water", "Chrome", "Triangle", "Noun"], minClass: 1 },
    { name: "Clean Environment", icon: "assets/images/evs.svg", choices: ["Clean Environment", "MS Word", "Equation", "Adverb"], minClass: 3 }
  ]
};

let selectedSubject = "computer";
let selectedPictureSubject = "computer";
let selectedPictureClass = 1;
let selectedPictureLevel = "easy";
let activePictureData = [];

function buildSubjectQuestion(subject, classNumber, level, questionNumber) {
  const matchingTopics = subjectQuestionTopics[subject][level].filter((topic) => topic.minClass <= classNumber);
  const topics = matchingTopics.length ? matchingTopics : subjectQuestionTopics[subject][level];
  const topic = topics[(questionNumber * 7 + classNumber) % topics.length];
  const subjectName = subjectSettings[subject].name;

  return {
    question: `Class ${classNumber} ${subjectName} ${level} #${questionNumber + 1}: Which answer matches ${topic.clue}?`,
    answer: topic.answer,
    choices: shuffleArray(topic.choices)
  };
}

function generateQuiz(classNumber, level, subject = "computer") {
  const pool = [];

  for (let index = 0; index < 1000; index += 1) {
    pool.push(buildSubjectQuestion(subject, classNumber, level, index));
  }

  return shuffleArray(pool).slice(0, 10);
}

function buildSubjectDragItem(subject, classNumber, level, itemNumber) {
  if (subject === "computer") {
    return buildDragItem(classNumber, level, itemNumber);
  }

  const examples = {
    science: {
      living: ["Plant", "Human", "Bird", "Bacteria", "Fish"],
      nonliving: ["Gravity", "Rock", "Water", "Magnet", "Light"]
    },
    english: {
      noun: ["Book", "Teacher", "Garden", "River", "Computer"],
      verb: ["Read", "Write", "Jump", "Think", "Speak"]
    },
    maths: {
      even: ["2", "4", "8", "12", "20"],
      odd: ["1", "3", "7", "11", "15"]
    },
    evs: {
      natural: ["Tree", "River", "Sun", "Soil", "Bird"],
      manmade: ["Road", "House", "Bottle", "Car", "Bridge"]
    }
  };
  const categories = Object.keys(examples[subject]);
  const category = categories[(itemNumber + classNumber) % categories.length];
  const values = examples[subject][category];
  const value = values[(itemNumber * 3 + classNumber) % values.length];

  return {
    id: `drag-${subject}-${classNumber}-${level}-${itemNumber}`,
    name: `${subjectSettings[subject].name} ${level} #${itemNumber + 1}: ${value}`,
    category
  };
}

function generateDragRound(classNumber, level, subject = "computer") {
  const pool = [];

  for (let index = 0; index < 1000; index += 1) {
    pool.push(buildSubjectDragItem(subject, classNumber, level, index));
  }

  return shuffleArray(pool).slice(0, 10);
}

function buildPicturePool(subject, classNumber, level) {
  const topics = pictureTopicBank[subject].filter((topic) => topic.minClass <= classNumber);
  const pool = [];

  for (let index = 0; index < 1000; index += 1) {
    const topic = topics[(index * 5 + classNumber) % topics.length];
    pool.push({
      ...topic,
      name: topic.name,
      choices: shuffleArray(topic.choices),
      roundLabel: `${subjectSettings[subject].name} ${level} picture #${index + 1}`
    });
  }

  return pool;
}

function generatePictureRound(subject, classNumber, level) {
  return shuffleArray(buildPicturePool(subject, classNumber, level)).slice(0, 10);
}

function updateClassOptions(subjectSelectId, classSelectId) {
  const subject = document.getElementById(subjectSelectId).value;
  const classSelect = document.getElementById(classSelectId);
  const settings = subjectSettings[subject];
  classSelect.innerHTML = "";

  for (let classNumber = settings.minClass; classNumber <= settings.maxClass; classNumber += 1) {
    const option = document.createElement("option");
    option.value = classNumber;
    option.textContent = `Class ${classNumber}`;
    classSelect.appendChild(option);
  }
}

function updateDropZoneLabels(subject) {
  const [first, second] = subjectSettings[subject].dragCategories;
  document.getElementById("dropZoneA").dataset.category = first.key;
  document.getElementById("dropTitleA").textContent = first.title;
  document.getElementById("dropHintA").textContent = first.hint;
  document.getElementById("dropZoneB").dataset.category = second.key;
  document.getElementById("dropTitleB").textContent = second.title;
  document.getElementById("dropHintB").textContent = second.hint;
}

function startQuiz() {
  quizIndex = 0;
  quizScore = 0;
  quizAnswered = false;
  selectedSubject = document.getElementById("subjectSelect").value;
  selectedClass = Number(document.getElementById("classSelect").value);
  selectedLevel = document.getElementById("levelSelect").value;
  activeQuizData = generateQuiz(selectedClass, selectedLevel, selectedSubject);
  document.getElementById("quizSetup").classList.add("hidden");
  document.getElementById("quizResult").classList.add("hidden");
  document.getElementById("quizPlayCard").classList.remove("hidden");
  showScreen("quizScreen");
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const current = activeQuizData[quizIndex];
  const quizChoices = document.getElementById("quizChoices");
  const progress = (quizIndex / activeQuizData.length) * 100;
  const questionEl = document.getElementById("quizQuestion");

  quizAnswered = false;
  document.getElementById("quizCount").textContent = `${subjectSettings[selectedSubject].name} • Class ${selectedClass} • ${selectedLevel.toUpperCase()} • Question ${quizIndex + 1} of ${activeQuizData.length}`;
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

function finishQuiz() {
  document.getElementById("quizProgress").style.width = "100%";
  document.getElementById("quizPlayCard").classList.add("hidden");
  document.getElementById("quizResult").classList.remove("hidden");
  document.getElementById("quizResultText").textContent = `${subjectSettings[selectedSubject].name} Class ${selectedClass} ${selectedLevel} result: ${quizScore} out of ${activeQuizData.length}. Generate again for a new quiz.`;
  launchConfetti();
}

function startDragGame() {
  dragScore = 0;
  placedDevices = new Set();
  const subject = document.getElementById("dragSubjectSelect").value;
  selectedDragClass = Number(document.getElementById("dragClassSelect").value);
  selectedDragLevel = document.getElementById("dragLevelSelect").value;
  activeDragItems = generateDragRound(selectedDragClass, selectedDragLevel, subject);
  updateDropZoneLabels(subject);
  document.getElementById("dragSetup").classList.add("hidden");
  document.getElementById("dragPlayCard").classList.remove("hidden");
  document.getElementById("dragScore").textContent = dragScore;
  document.getElementById("dragTotal").textContent = activeDragItems.length;
  document.getElementById("dragRoundInfo").textContent = `${subjectSettings[subject].name} • Class ${selectedDragClass} • ${selectedDragLevel.toUpperCase()} • Sort 10 random cards`;
  document.getElementById("dragFeedback").textContent = "";
  document.getElementById("dragFeedback").className = "feedback";
  document.querySelectorAll(".drop-zone").forEach((zone) => {
    zone.querySelectorAll(".device-item").forEach((item) => item.remove());
  });
  renderDeviceItems();
  showScreen("dragScreen");
}

function openPictureSetup() {
  document.getElementById("pictureSetup").classList.remove("hidden");
  document.getElementById("picturePlayCard").classList.add("hidden");
  document.getElementById("pictureResult").classList.add("hidden");
  showScreen("pictureScreen");
}

function startPictureGame() {
  pictureIndex = 0;
  pictureScore = 0;
  pictureAnswered = false;
  selectedPictureSubject = document.getElementById("pictureSubjectSelect").value;
  selectedPictureClass = Number(document.getElementById("pictureClassSelect").value);
  selectedPictureLevel = document.getElementById("pictureLevelSelect").value;
  activePictureData = generatePictureRound(selectedPictureSubject, selectedPictureClass, selectedPictureLevel);
  document.getElementById("pictureSetup").classList.add("hidden");
  document.getElementById("pictureResult").classList.add("hidden");
  document.getElementById("picturePlayCard").classList.remove("hidden");
  showScreen("pictureScreen");
  renderPictureQuestion();
}

function renderPictureQuestion() {
  const current = activePictureData[pictureIndex];
  const pictureChoices = document.getElementById("pictureChoices");
  const pictureDisplay = document.getElementById("pictureDisplay");

  pictureAnswered = false;
  document.getElementById("pictureCount").textContent = `${subjectSettings[selectedPictureSubject].name} • Class ${selectedPictureClass} • ${selectedPictureLevel.toUpperCase()} • Item ${pictureIndex + 1} of ${activePictureData.length}`;
  document.getElementById("pictureScore").textContent = pictureScore;
  pictureDisplay.innerHTML = `<img src="${current.icon}" alt="${current.name} icon">`;
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

  const correctAnswer = activePictureData[pictureIndex].name;
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
    burstAnswerSpark(button);
    setFeedback(feedback, "Correct picture match!", true);
  } else {
    button.classList.add("wrong");
    setFeedback(feedback, `Wrong! This is ${correctAnswer}.`, false);
  }

  document.getElementById("nextPictureBtn").disabled = false;
}

function nextPictureQuestion() {
  pictureIndex += 1;

  if (pictureIndex >= activePictureData.length) {
    finishPictureGame();
    return;
  }

  renderPictureQuestion();
}

function finishPictureGame() {
  document.getElementById("picturePlayCard").classList.add("hidden");
  document.getElementById("pictureResult").classList.remove("hidden");
  document.getElementById("pictureResultText").textContent = `${subjectSettings[selectedPictureSubject].name} Class ${selectedPictureClass} ${selectedPictureLevel} result: ${pictureScore} out of ${activePictureData.length}.`;
  launchConfetti();
}

updateClassOptions("subjectSelect", "classSelect");
updateClassOptions("dragSubjectSelect", "dragClassSelect");
updateClassOptions("pictureSubjectSelect", "pictureClassSelect");
updateDropZoneLabels("computer");

document.getElementById("homeLogo").addEventListener("click", () => showScreen("homeScreen"));
document.getElementById("startQuizBtn").addEventListener("click", openQuizSetup);
document.getElementById("generateQuizBtn").addEventListener("click", startQuiz);
document.getElementById("dragGameBtn").addEventListener("click", openDragSetup);
document.getElementById("generateDragBtn").addEventListener("click", startDragGame);
document.getElementById("pictureGameBtn").addEventListener("click", openPictureSetup);
document.getElementById("generatePictureBtn").addEventListener("click", startPictureGame);
document.getElementById("nextQuizBtn").addEventListener("click", nextQuizQuestion);
document.getElementById("restartQuizBtn").addEventListener("click", startQuiz);
document.getElementById("resetDragBtn").addEventListener("click", startDragGame);
document.getElementById("nextPictureBtn").addEventListener("click", nextPictureQuestion);
document.getElementById("restartPictureBtn").addEventListener("click", startPictureGame);
document.getElementById("subjectSelect").addEventListener("change", () => updateClassOptions("subjectSelect", "classSelect"));
document.getElementById("dragSubjectSelect").addEventListener("change", () => updateClassOptions("dragSubjectSelect", "dragClassSelect"));
document.getElementById("pictureSubjectSelect").addEventListener("change", () => updateClassOptions("pictureSubjectSelect", "pictureClassSelect"));

document.querySelectorAll("[data-screen]").forEach((button) => {
  button.addEventListener("click", () => showScreen(button.dataset.screen));
});

setupDropZones();
updateBestScore();
