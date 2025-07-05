// Custom Cursor
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// Typing Text
const typingText = "Built with purpose. Driven by passion.";
const typingElement = document.getElementById("typing-text");
let typingIndex = 0;
function type() {
  if (typingIndex < typingText.length) {
    typingElement.textContent += typingText.charAt(typingIndex);
    typingIndex++;
    setTimeout(type, 80);
  }
}
type();

// Scroll to top button
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.onscroll = function () {
  scrollTopBtn.style.display =
    document.body.scrollTop > 100 || document.documentElement.scrollTop > 100
      ? "block"
      : "none";
};
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Star background animation
const canvas = document.getElementById("star-bg");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let stars = [];
for (let i = 0; i < 100; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5,
    d: Math.random() * 1
  });
}
function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.beginPath();
  for (let i = 0; i < stars.length; i++) {
    let s = stars[i];
    ctx.moveTo(s.x, s.y);
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2, true);
  }
  ctx.fill();
  updateStars();
}
function updateStars() {
  for (let i = 0; i < stars.length; i++) {
    stars[i].y += stars[i].d;
    if (stars[i].y > canvas.height) {
      stars[i].y = 0;
      stars[i].x = Math.random() * canvas.width;
    }
  }
}
setInterval(drawStars, 60);

// Typing Game
const typingGameCanvas = document.getElementById("gameCanvas");
const ctxGame = typingGameCanvas.getContext("2d");

const words = [
  "passion",
  "purpose",
  "creativity",
  "code",
  "design",
  "inspire",
  "build",
  "storm",
  "original",
  "focus"
];
let currentWord = "";
let input = "";
let score = 0;
let startTime = null;

function drawTypingGame() {
  ctxGame.clearRect(0, 0, typingGameCanvas.width, typingGameCanvas.height);
  ctxGame.fillStyle = "#fff";
  ctxGame.font = "20px Inter";
  ctxGame.fillText("Type: " + currentWord, 10, 50);
  ctxGame.fillText("Your Input: " + input, 10, 100);
  ctxGame.fillText("Score: " + score, 10, 150);
}
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}
function startTypingGame() {
  currentWord = getRandomWord();
  input = "";
  drawTypingGame();
}
document.addEventListener("keydown", (e) => {
  if (!startTime) startTime = new Date();
  if (e.key.length === 1 && input.length < currentWord.length) {
    input += e.key;
  } else if (e.key === "Backspace") {
    input = input.slice(0, -1);
  } else if (e.key === "Enter") {
    if (input === currentWord) {
      score++;
    } else {
      score = Math.max(score - 1, 0);
    }
    currentWord = getRandomWord();
    input = "";
  }
  drawTypingGame();
});

startTypingGame();
