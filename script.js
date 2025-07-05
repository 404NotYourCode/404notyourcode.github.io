// === Custom Cursor ===
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

// === Typing Text Effect ===
const text = "Hi, I'm Syed Sameer.";
let i = 0;
const speed = 100;
function typeWriter() {
  if (i < text.length) {
    document.getElementById("typing-text").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
window.onload = () => {
  typeWriter();
};

// === Scroll to Top Button ===
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// === Star Background ===
const canvas = document.getElementById("star-bg");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let stars = [];

for (let i = 0; i < 100; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2,
    d: Math.random() + 0.5
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  ctx.shadowBlur = 2;
  ctx.shadowColor = "#fff";
  for (let i = 0; i < stars.length; i++) {
    const s = stars[i];
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
    s.y += s.d;
    if (s.y > canvas.height) {
      s.y = 0;
      s.x = Math.random() * canvas.width;
    }
  }
}
setInterval(drawStars, 50);

// === Mini Snake Game ===
const gameCanvas = document.getElementById("gameCanvas");
const gctx = gameCanvas.getContext("2d");
const box = 20;
let snake = [{ x: 5 * box, y: 5 * box }];
let direction = "RIGHT";
let food = {
  x: Math.floor(Math.random() * 15) * box,
  y: Math.floor(Math.random() * 15) * box,
};

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

function drawGame() {
  gctx.fillStyle = "#222";
  gctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

  for (let i = 0; i < snake.length; i++) {
    gctx.fillStyle = i === 0 ? "red" : "#ccc";
    gctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  gctx.fillStyle = "white";
  gctx.fillRect(food.x, food.y, box, box);

  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "LEFT") headX -= box;
  if (direction === "RIGHT") headX += box;
  if (direction === "UP") headY -= box;
  if (direction === "DOWN") headY += box;

  if (
    headX < 0 || headY < 0 ||
    headX >= gameCanvas.width ||
    headY >= gameCanvas.height ||
    collision(headX, headY, snake)
  ) {
    clearInterval(game);
    alert("Game Over!");
    snake = [{ x: 5 * box, y: 5 * box }];
    direction = "RIGHT";
    game = setInterval(drawGame, 150);
    return;
  }

  if (headX === food.x && headY === food.y) {
    food = {
      x: Math.floor(Math.random() * 15) * box,
      y: Math.floor(Math.random() * 15) * box,
    };
  } else {
    snake.pop();
  }

  const newHead = { x: headX, y: headY };
  snake.unshift(newHead);
}

function collision(x, y, array) {
  return array.some((cell) => cell.x === x && cell.y === y);
}

let game = setInterval(drawGame, 150);

// === Random Quote Generator (Optional Feature) ===
const quotes = [
  "Built with purpose. Driven by passion. Defined by originality.",
  "I came from silence, walked through storms, and now I speak with purpose — not to prove, but to inspire.",
  "I wasn't born to follow footsteps—I carve new paths where none exist.",
  "My name doesn't echo yet—but when it does, the world will listen.",
  "I build quietly, I rise loudly.",
];

const displayQuote = () => {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  const quoteBox = document.getElementById("quoteDisplay");
  if (quoteBox) quoteBox.textContent = quote;
};

if (document.getElementById("newQuoteBtn")) {
  document.getElementById("newQuoteBtn").addEventListener("click", displayQuote);
}
