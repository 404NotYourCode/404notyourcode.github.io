// ===========================
// Typing Animation
// ===========================
const typingText = document.getElementById("typing-text");
const texts = ["Syed Sameer", "Web Developer", "UI/UX Designer", "Creative Coder"];
let index = 0, charIndex = 0, isDeleting = false;

function type() {
  const current = texts[index];
  typingText.textContent = current.substring(0, charIndex);
  charIndex += isDeleting ? -1 : 1;

  if (!isDeleting && charIndex === current.length + 1) {
    isDeleting = true;
    setTimeout(type, 1000);
    return;
  }
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    index = (index + 1) % texts.length;
  }

  setTimeout(type, isDeleting ? 60 : 120);
}
type();

// ===========================
// Scroll-to-Top Button
// ===========================
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  scrollTopBtn.style.display = window.scrollY > 150 ? "block" : "none";
});
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===========================
// Starfield Background
// ===========================
const canvas = document.getElementById("star-bg");
const ctx = canvas.getContext("2d");
let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = Array.from({ length: 150 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.2 + 0.4,
    dx: (Math.random() - 0.5) * 0.2,
    dy: (Math.random() - 0.5) * 0.2,
  }));
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    star.x += star.dx;
    star.y += star.dy;
    if (star.x < 0 || star.x > canvas.width) star.dx *= -1;
    if (star.y < 0 || star.y > canvas.height) star.dy *= -1;
  });
  requestAnimationFrame(animateStars);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
animateStars();

// ===========================
// Rock-Paper-Scissors Game
// ===========================
const rpsButtons = document.querySelectorAll(".rps-btn");
const rpsResult = document.getElementById("rps-result");
const rpsScore = document.getElementById("rps-score");
let wins = 0, losses = 0, draws = 0;

rpsButtons.forEach(button => {
  button.addEventListener("click", () => {
    const user = button.dataset.choice;
    const options = ["rock", "paper", "scissors"];
    const comp = options[Math.floor(Math.random() * 3)];
    let outcome = "";

    if (user === comp) {
      draws++;
      outcome = `🤝 Draw! Both chose ${user}.`;
    } else if (
      (user === "rock" && comp === "scissors") ||
      (user === "paper" && comp === "rock") ||
      (user === "scissors" && comp === "paper")
    ) {
      wins++;
      outcome = `✅ You win! ${user} beats ${comp}.`;
    } else {
      losses++;
      outcome = `❌ You lose! ${comp} beats ${user}.`;
    }

    rpsResult.textContent = outcome;
    rpsScore.textContent = `Wins: ${wins} | Losses: ${losses} | Draws: ${draws}`;
  });
});

// ===========================
// Custom Cursor
// ===========================
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", e => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

// ===========================
// GSAP Entrance Animations
// ===========================
window.addEventListener("load", () => {
  gsap.from(".hero .logo", { y: -100, opacity: 0, duration: 1 });
  gsap.from(".hero h1", { x: -200, opacity: 0, delay: 0.4, duration: 1 });
  gsap.from(".hero .subheading", { x: 200, opacity: 0, delay: 0.6, duration: 1 });
  gsap.from(".hero .btn", { scale: 0.5, opacity: 0, delay: 0.8, duration: 0.6 });
});
