// Typing animation
const text = "Cybersecurity | Web Developer | Designer | Innovator";
let index = 0;
const typingText = document.getElementById("typing-text");

function typeEffect() {
  if (index < text.length) {
    typingText.innerHTML += text.charAt(index);
    index++;
    setTimeout(typeEffect, 100);
  }
}
typeEffect();

// Scroll-to-top button
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  scrollTopBtn.style.display = window.scrollY > 400 ? "block" : "none";
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Rock Paper Scissors Game
const choices = ["rock", "paper", "scissors"];
const buttons = document.querySelectorAll(".rps-btn");
const result = document.getElementById("rps-result");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const userChoice = button.dataset.choice;
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    const outcome = getResult(userChoice, computerChoice);

    result.innerHTML = `
      <strong>You:</strong> ${userChoice} <br>
      <strong>Computer:</strong> ${computerChoice} <br>
      <strong>Result:</strong> ${outcome}
    `;
  });
});

function getResult(user, computer) {
  if (user === computer) return "Draw!";
  if (
    (user === "rock" && computer === "scissors") ||
    (user === "paper" && computer === "rock") ||
    (user === "scissors" && computer === "paper")
  ) {
    return "You Win! 🎉";
  }
  return "You Lose 😢";
}

// Starry animated background
const canvas = document.getElementById("star-bg");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for (let i = 0; i < 120; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.2,
    dx: Math.random() * 0.5,
    dy: Math.random() * 0.5
  });
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  stars.forEach((star) => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
    star.x += star.dx;
    star.y += star.dy;
    if (star.x > canvas.width) star.x = 0;
    if (star.y > canvas.height) star.y = 0;
  });
  requestAnimationFrame(animateStars);
}
animateStars();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
