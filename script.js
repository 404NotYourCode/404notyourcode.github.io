// Typing effect
const text = "Syed Sameer — Portfolio";
let i = 0;
const typingSpeed = 100;
function typeText() {
  if (i < text.length) {
    document.getElementById("typing-text").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeText, typingSpeed);
  }
}
typeText();

// Custom cursor
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

// Scroll to top button
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Game logic
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let boxX = 140, boxY = 140, boxSize = 20;

function drawGameBox() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "red";
  ctx.fillRect(boxX, boxY, boxSize, boxSize);
}
drawGameBox();

document.addEventListener("keydown", (e) => {
  const step = 20;
  switch (e.key) {
    case "ArrowUp":
      if (boxY - step >= 0) boxY -= step;
      break;
    case "ArrowDown":
      if (boxY + step + boxSize <= canvas.height) boxY += step;
      break;
    case "ArrowLeft":
      if (boxX - step >= 0) boxX -= step;
      break;
    case "ArrowRight":
      if (boxX + step + boxSize <= canvas.width) boxX += step;
      break;
  }
  drawGameBox();
});

// Star background
const starCanvas = document.getElementById("star-bg");
const starCtx = starCanvas.getContext("2d");
let stars = [];

function resizeStarCanvas() {
  starCanvas.width = window.innerWidth;
  starCanvas.height = window.innerHeight;
}
resizeStarCanvas();
window.addEventListener("resize", resizeStarCanvas);

for (let i = 0; i < 150; i++) {
  stars.push({
    x: Math.random() * starCanvas.width,
    y: Math.random() * starCanvas.height,
    radius: Math.random() * 1.5,
    speed: Math.random() * 0.5 + 0.2,
  });
}

function animateStars() {
  starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
  starCtx.fillStyle = "white";
  stars.forEach((star) => {
    star.y += star.speed;
    if (star.y > starCanvas.height) {
      star.y = 0;
      star.x = Math.random() * starCanvas.width;
    }
    starCtx.beginPath();
    starCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    starCtx.fill();
  });
  requestAnimationFrame(animateStars);
}
animateStars();
