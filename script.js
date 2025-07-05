// Typing animation
const text = "Hi, I'm Syed Sameer";
let i = 0;
const typingText = document.getElementById("typing-text");
function typeWriter() {
  if (i < text.length) {
    typingText.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 100);
  }
}
typeWriter();

// Cursor glow
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = `${e.pageX}px`;
  cursor.style.top = `${e.pageY}px`;
});

// Scroll to top
const scrollBtn = document.getElementById("scrollTopBtn");
window.onscroll = function () {
  scrollBtn.style.display = window.scrollY > 200 ? "block" : "none";
};
scrollBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Background Stars
const starCanvas = document.getElementById("star-bg");
const starCtx = starCanvas.getContext("2d");
starCanvas.width = window.innerWidth;
starCanvas.height = window.innerHeight;

let stars = [];
for (let i = 0; i < 100; i++) {
  stars.push({
    x: Math.random() * starCanvas.width,
    y: Math.random() * starCanvas.height,
    radius: Math.random() * 1.5,
    speed: Math.random() * 0.5 + 0.2
  });
}
function animateStars() {
  starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
  stars.forEach(star => {
    star.y += star.speed;
    if (star.y > starCanvas.height) star.y = 0;
    starCtx.beginPath();
    starCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    starCtx.fillStyle = "white";
    starCtx.fill();
  });
  requestAnimationFrame(animateStars);
}
animateStars();

// Game
const canvas = document.getElementById("flappyCanvas");
const ctx = canvas.getContext("2d");
const jumpSound = document.getElementById("jumpSound");
const hitSound = document.getElementById("hitSound");
const bgMusic = document.getElementById("bgMusic");
const retryBtn = document.getElementById("retryBtn");

let rocketImg = new Image();
rocketImg.src = "rocket-sprite.png"; // Use a small rocket sprite sheet

let frame = 0;
let rocket = { x: 50, y: 200, width: 40, height: 40, velocity: 0, gravity: 0.6, lift: -10 };
let pipes = [];
let score = 0;
let gameRunning = true;
let gameStarted = false;
let gameOverShown = false;

function drawRocket() {
  ctx.drawImage(rocketImg, (frame % 2) * 64, 0, 64, 64, rocket.x, rocket.y, rocket.width, rocket.height);
}

function drawPipes() {
  pipes.forEach(pipe => {
    ctx.fillStyle = "lime";
    ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
    ctx.fillRect(pipe.x, pipe.top + pipe.gap, pipe.width, canvas.height);
  });
}

function updateGame() {
  if (!gameRunning) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  rocket.velocity += rocket.gravity;
  rocket.y += rocket.velocity;
  if (rocket.y + rocket.height > canvas.height || rocket.y < 0) endGame();

  if (frame % 100 === 0) {
    let top = Math.random() * (canvas.height / 2);
    pipes.push({ x: canvas.width, top, width: 40, gap: 120 });
  }

  pipes.forEach(pipe => {
    pipe.x -= 2;
    if (
      rocket.x < pipe.x + pipe.width &&
      rocket.x + rocket.width > pipe.x &&
      (rocket.y < pipe.top || rocket.y + rocket.height > pipe.top + pipe.gap)
    ) {
      endGame();
    }
  });

  pipes = pipes.filter(pipe => pipe.x + pipe.width > 0);

  drawPipes();
  drawRocket();

  ctx.fillStyle = "#fff";
  ctx.font = "20px sans-serif";
  ctx.fillText(`Score: ${score}`, 10, 20);

  if (frame % 50 === 0) score++;

  frame++;
  requestAnimationFrame(updateGame);
}

function endGame() {
  if (!gameOverShown) {
    gameRunning = false;
    hitSound.play();
    ctx.fillStyle = "red";
    ctx.font = "30px sans-serif";
    ctx.fillText("Game Over", canvas.width / 2 - 80, canvas.height / 2);
    retryBtn.style.display = "block";
    gameOverShown = true;
  }
}

function resetGame() {
  rocket.y = 200;
  rocket.velocity = 0;
  pipes = [];
  score = 0;
  frame = 0;
  gameRunning = true;
  gameOverShown = false;
  retryBtn.style.display = "none";
  updateGame();
}

function jump() {
  if (!gameStarted) {
    bgMusic.play();
    gameStarted = true;
    updateGame();
  }
  rocket.velocity = rocket.lift;
  jumpSound.play();
}

document.addEventListener("keydown", e => {
  if (e.code === "Space" || e.code === "ArrowUp") jump();
});
canvas.addEventListener("click", jump);
retryBtn.addEventListener("click", resetGame);

// Resize star background
window.addEventListener("resize", () => {
  starCanvas.width = window.innerWidth;
  starCanvas.height = window.innerHeight;
});
