// Typing Text Animation
const texts = ["Syed Sameer", "Developer", "Designer", "Innovator"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type() {
  if (count === texts.length) count = 0;
  currentText = texts[count];
  letter = currentText.slice(0, ++index);
  document.getElementById("typing-text").textContent = letter;

  if (letter.length === currentText.length) {
    count++;
    index = 0;
    setTimeout(type, 1000);
  } else {
    setTimeout(type, 120);
  }
})();

// Custom Cursor
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.onscroll = () => {
  scrollTopBtn.style.display = window.scrollY > 200 ? "block" : "none";
};
scrollTopBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Rock Paper Scissors Game
const choices = ["rock", "paper", "scissors"];
const buttons = document.querySelectorAll(".rps-btn");
const result = document.getElementById("rps-result");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const player = button.dataset.choice;
    const computer = choices[Math.floor(Math.random() * choices.length)];
    const outcome = getWinner(player, computer);
    result.innerHTML = `
      <p>You chose: ${emoji(player)}</p>
      <p>Computer chose: ${emoji(computer)}</p>
      <strong>${outcome}</strong>
    `;
  });
});

function getWinner(player, comp) {
  if (player === comp) return "It's a draw!";
  if (
    (player === "rock" && comp === "scissors") ||
    (player === "paper" && comp === "rock") ||
    (player === "scissors" && comp === "paper")
  ) return "You win!";
  return "You lose!";
}

function emoji(choice) {
  return {
    rock: "🪨",
    paper: "📄",
    scissors: "✂️"
  }[choice];
}

// Star Background Animation
const canvas = document.getElementById("star-bg");
const ctx = canvas.getContext("2d");
let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createStars(count) {
  stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      speed: Math.random() * 0.5 + 0.2
    });
  }
}
createStars(150);

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
    ctx.fill();
    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });
  requestAnimationFrame(animateStars);
}
animateStars();

// Background Music Control
const bgMusic = document.getElementById("bgMusic");
window.addEventListener("click", () => {
  if (bgMusic.paused) bgMusic.play();
}, { once: true });

