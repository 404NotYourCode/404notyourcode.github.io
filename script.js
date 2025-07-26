// === Cybersecurity Word Guess Game ===
const words = [
  { word: "firewall", hint: "Blocks unauthorized access" },
  { word: "phishing", hint: "Fake emails tricking users" },
  { word: "malware", hint: "Malicious software" },
  { word: "encryption", hint: "Converts data into unreadable form" },
  { word: "vpn", hint: "Secure private network tunnel" },
  { word: "password", hint: "Basic security authentication" },
  { word: "hacking", hint: "Unauthorized access to systems" },
  { word: "botnet", hint: "Network of infected devices" },
];

let selectedWord = "";
let hint = "";
let displayWord = [];
let lives = 6;
let guessedLetters = [];

function startGame() {
  const random = words[Math.floor(Math.random() * words.length)];
  selectedWord = random.word.toLowerCase();
  hint = random.hint;
  displayWord = Array(selectedWord.length).fill("_");
  lives = 6;
  guessedLetters = [];
  updateDisplay();
}

function updateDisplay() {
  document.getElementById("word-display").textContent = displayWord.join(" ");
  document.getElementById("hint").textContent = `Hint: ${hint}`;
  document.getElementById("lives").textContent = lives;
  document.getElementById("message").textContent = "";
  document.getElementById("guess-input").value = "";
}

function submitGuess() {
  const input = document.getElementById("guess-input");
  const guess = input.value.toLowerCase();

  if (!guess || guess.length !== 1 || guessedLetters.includes(guess)) {
    return;
  }

  guessedLetters.push(guess);
  let correct = false;

  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i] === guess) {
      displayWord[i] = guess;
      correct = true;
    }
  }

  if (!correct) lives--;

  updateDisplay();

  if (!displayWord.includes("_")) {
    document.getElementById("message").textContent = "🎉 You guessed it right!";
    setTimeout(startGame, 3000);
  } else if (lives === 0) {
    document.getElementById("message").textContent = `❌ Game over! Word was: ${selectedWord}`;
    setTimeout(startGame, 3000);
  }
}

document.getElementById("guess-input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") submitGuess();
});

startGame();


// === Scroll to Top Button ===
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.onscroll = function () {
  scrollTopBtn.style.display = window.scrollY > 100 ? "block" : "none";
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}


// === Animated Starry Background ===
const canvas = document.getElementById("star-bg");
const ctx = canvas.getContext("2d");

let stars = [];
const starCount = 100;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createStars() {
  stars = [];
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      speed: Math.random() * 0.5 + 0.1,
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00bcd4";
  for (const star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
    ctx.fill();
  }
}

function updateStars() {
  for (const star of stars) {
    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  }
}

function animateStars() {
  drawStars();
  updateStars();
  requestAnimationFrame(animateStars);
}

window.addEventListener("resize", () => {
  resizeCanvas();
  createStars();
});

resizeCanvas();
createStars();
animateStars();
