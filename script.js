// Typing Effect
const typingText = "Hey, I'm Syed Sameer — Web Developer | Designer | Thinker";
let i = 0;
function typeWriter() {
  if (i < typingText.length) {
    document.getElementById("typing-text").innerHTML += typingText.charAt(i);
    i++;
    setTimeout(typeWriter, 75);
  }
}
document.addEventListener("DOMContentLoaded", typeWriter);

// Scroll to Top Button
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Starry Background Canvas
const starCanvas = document.getElementById("star-bg");
const starCtx = starCanvas.getContext("2d");
let stars = [];

function resizeCanvas() {
  starCanvas.width = window.innerWidth;
  starCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createStars(count) {
  stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * starCanvas.width,
      y: Math.random() * starCanvas.height,
      radius: Math.random() * 1.5,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5
    });
  }
}
createStars(200);

function animateStars() {
  starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
  starCtx.fillStyle = "#ffffff";
  stars.forEach(star => {
    starCtx.beginPath();
    starCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    starCtx.fill();
    star.x += star.dx;
    star.y += star.dy;
    if (star.x < 0 || star.x > starCanvas.width) star.dx *= -1;
    if (star.y < 0 || star.y > starCanvas.height) star.dy *= -1;
  });
  requestAnimationFrame(animateStars);
}
animateStars();

// Mini Game: Red Box with Score + Collectibles
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let box = { x: 140, y: 140, size: 20, speed: 5 };
let score = 0;
let timer = 30;
let gameInterval;
let dot = { x: 50, y: 50, size: 10 };

function drawBox() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw box
  ctx.fillStyle = "#ff3c3c";
  ctx.fillRect(box.x, box.y, box.size, box.size);

  // Draw dot
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
  ctx.fill();

  // Draw score/timer
  ctx.fillStyle = "#fff";
  ctx.font = "14px Inter";
  ctx.fillText(`Score: ${score}`, 10, 20);
  ctx.fillText(`Time: ${timer}s`, 220, 20);
}

function moveDot() {
  dot.x = Math.random() * (canvas.width - dot.size * 2) + dot.size;
  dot.y = Math.random() * (canvas.height - dot.size * 2) + dot.size;
}

function checkCollision() {
  const dx = box.x + box.size / 2 - dot.x;
  const dy = box.y + box.size / 2 - dot.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  if (distance < box.size / 2 + dot.size) {
    score++;
    moveDot();
  }
}

function startGame() {
  moveDot();
  drawBox();
  gameInterval = setInterval(() => {
    timer--;
    if (timer <= 0) {
      clearInterval(gameInterval);
      alert(`Time's up! Final Score: ${score}`);
    }
    drawBox();
  }, 1000);
}
startGame();

function updateGame() {
  checkCollision();
  drawBox();
}

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      box.y = Math.max(0, box.y - box.speed);
      break;
    case "ArrowDown":
      box.y = Math.min(canvas.height - box.size, box.y + box.speed);
      break;
    case "ArrowLeft":
      box.x = Math.max(0, box.x - box.speed);
      break;
    case "ArrowRight":
      box.x = Math.min(canvas.width - box.size, box.x + box.speed);
      break;
  }
  updateGame();
});
