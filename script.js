// DOM elements
const canvas = document.getElementById("flappyCanvas");
const ctx = canvas.getContext("2d");
const retryBtn = document.getElementById("retryBtn");
const jumpSound = document.getElementById("jumpSound");
const hitSound = document.getElementById("hitSound");
const bgMusic = document.getElementById("bgMusic");

let gravity = 0.6;
let lift = -10;
let frame = 0;
let interval;
let gameOverShown = false;

// Rocket sprite setup
const rocketImg = new Image();
rocketImg.src = "rocket-sprite.png"; // Sprite sheet: multiple frames of rocket
const SPRITE_WIDTH = 64;
const SPRITE_HEIGHT = 64;
const TOTAL_FRAMES = 4;

// Player
let player = {
  x: 50,
  y: 150,
  width: SPRITE_WIDTH,
  height: SPRITE_HEIGHT,
  velocity: 0,
  spriteFrame: 0
};

// Obstacle array
let pipes = [];

function resetGame() {
  player.y = 150;
  player.velocity = 0;
  pipes = [];
  frame = 0;
  gameOverShown = false;
  retryBtn.style.display = "none";
  bgMusic.currentTime = 0;
  bgMusic.play();
  if (interval) clearInterval(interval);
  interval = setInterval(draw, 1000 / 60);
}

function drawRocket() {
  const frameX = player.spriteFrame * SPRITE_WIDTH;
  ctx.drawImage(
    rocketImg,
    frameX,
    0,
    SPRITE_WIDTH,
    SPRITE_HEIGHT,
    player.x,
    player.y,
    SPRITE_WIDTH,
    SPRITE_HEIGHT
  );
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  frame++;

  // Background
  ctx.fillStyle = "#080808";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Player
  player.velocity += gravity;
  player.y += player.velocity;

  // Animate sprite
  if (frame % 5 === 0) {
    player.spriteFrame = (player.spriteFrame + 1) % TOTAL_FRAMES;
  }
  drawRocket();

  // Prevent going off top
  if (player.y < 0) player.y = 0;

  // Pipes
  if (frame % 90 === 0) {
    let height = Math.random() * 200 + 100;
    pipes.push({
      x: canvas.width,
      y: height,
      width: 50,
      gap: 140
    });
  }

  for (let i = 0; i < pipes.length; i++) {
    let p = pipes[i];
    p.x -= 2;

    // Top pipe
    ctx.fillStyle = "#444";
    ctx.fillRect(p.x, 0, p.width, p.y);

    // Bottom pipe
    ctx.fillStyle = "#444";
    ctx.fillRect(p.x, p.y + p.gap, p.width, canvas.height);

    // Collision detection
    if (
      player.x + player.width > p.x &&
      player.x < p.x + p.width &&
      (player.y < p.y || player.y + player.height > p.y + p.gap)
    ) {
      endGame();
    }
  }

  // Remove off-screen pipes
  pipes = pipes.filter(p => p.x + p.width > 0);

  // Ground collision
  if (player.y + player.height > canvas.height) {
    endGame();
  }
}

function endGame() {
  clearInterval(interval);
  if (!gameOverShown) {
    hitSound.play();
    bgMusic.pause();
    ctx.fillStyle = "white";
    ctx.font = "28px Inter";
    ctx.fillText("Game Over", 140, 250);
    retryBtn.style.display = "inline-block";
    gameOverShown = true;
  }
}

function jump() {
  player.velocity = lift;
  jumpSound.play();
}

// Controls
document.addEventListener("keydown", e => {
  if (e.code === "Space" || e.code === "ArrowUp") {
    jump();
  }
});

retryBtn.addEventListener("click", () => {
  resetGame();
});

// Start game when sprite is ready
rocketImg.onload = () => {
  resetGame();
};

// Scroll to top button
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.onscroll = function () {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
};
scrollTopBtn.onclick = function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Cursor effect
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", e => {
  cursor.style.left = e.pageX + "px";
  cursor.style.top = e.pageY + "px";
});
