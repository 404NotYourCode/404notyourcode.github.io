// Typing animation
const typingText = document.getElementById("typing-text");
const phrases = ["Hello, I’m Syed Sameer.", "Developer. Designer. Creator."];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentPhrase = phrases[phraseIndex];
  if (isDeleting) {
    typingText.textContent = currentPhrase.substring(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, 1000);
    } else {
      setTimeout(type, 50);
    }
  } else {
    typingText.textContent = currentPhrase.substring(0, charIndex++);
    if (charIndex > currentPhrase.length) {
      isDeleting = true;
      setTimeout(type, 2000);
    } else {
      setTimeout(type, 100);
    }
  }
}
type();

// Flappy Box Game
const canvas = document.getElementById("flappyCanvas");
const ctx = canvas.getContext("2d");
let boxY = 200;
let velocity = 0;
let gravity = 0.6;
let isGameOver = false;
let gameStarted = false;
let showGameOver = false;
let pipes = [];

function resetGame() {
  boxY = 200;
  velocity = 0;
  isGameOver = false;
  pipes = [];
  showGameOver = false;
}

function drawBox() {
  ctx.fillStyle = "#ff3c3c";
  ctx.fillRect(50, boxY, 30, 30);
}

function drawPipes() {
  pipes.forEach(pipe => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(pipe.x, 0, 50, pipe.top);
    ctx.fillRect(pipe.x, pipe.top + pipe.gap, 50, canvas.height - pipe.top - pipe.gap);
  });
}

function updatePipes() {
  if (!gameStarted) return;
  if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 200) {
    const top = Math.random() * 200 + 50;
    pipes.push({ x: canvas.width, top: top, gap: 130 });
  }
  pipes.forEach(pipe => {
    pipe.x -= 2;
  });
  pipes = pipes.filter(pipe => pipe.x + 50 > 0);
}

function checkCollision() {
  for (let pipe of pipes) {
    if (
      50 + 30 > pipe.x &&
      50 < pipe.x + 50 &&
      (boxY < pipe.top || boxY + 30 > pipe.top + pipe.gap)
    ) {
      isGameOver = true;
    }
  }
  if (boxY + 30 > canvas.height || boxY < 0) {
    isGameOver = true;
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (isGameOver) {
    drawBox();
    drawPipes();
    if (!showGameOver) {
      ctx.fillStyle = "#ff3c3c";
      ctx.font = "30px Inter";
      ctx.fillText("Game Over", 120, 250);
      showGameOver = true;
    }
    return;
  }

  drawBox();
  drawPipes();
  updatePipes();
  velocity += gravity;
  boxY += velocity;
  checkCollision();
  requestAnimationFrame(gameLoop);
}

canvas.addEventListener("click", () => {
  velocity = -10;
  if (!gameStarted) {
    gameStarted = true;
    gameLoop();
  }
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Custom Cursor
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", (e) => {
  cursor.style.top = e.clientY + "px";
  cursor.style.left = e.clientX + "px";
});

// Star background
const starCanvas = document.getElementById("star-bg");
const starCtx = starCanvas.getContext("2d");
starCanvas.width = window.innerWidth;
starCanvas.height = window.innerHeight;

const stars = [];
for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * starCanvas.width,
    y: Math.random() * starCanvas.height,
    radius: Math.random() * 1.5,
    speed: Math.random() * 0.5 + 0.2
  });
}

function animateStars() {
  starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
  starCtx.fillStyle = "#fff";
  stars.forEach(star => {
    starCtx.beginPath();
    starCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    starCtx.fill();
    star.y += star.speed;
    if (star.y > starCanvas.height) {
      star.y = 0;
      star.x = Math.random() * starCanvas.width;
    }
  });
  requestAnimationFrame(animateStars);
}
animateStars();

window.addEventListener("resize", () => {
  starCanvas.width = window.innerWidth;
  starCanvas.height = window.innerHeight;
});
