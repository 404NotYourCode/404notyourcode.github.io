// Typing animation
const typingText = document.getElementById("typing-text");
const texts = ["Syed Sameer", "Developer", "Designer", "Creator"];
let index = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentText = texts[index];
  if (isDeleting) {
    typingText.textContent = currentText.substring(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      index = (index + 1) % texts.length;
    }
  } else {
    typingText.textContent = currentText.substring(0, charIndex++);
    if (charIndex > currentText.length) {
      isDeleting = true;
      setTimeout(type, 1000);
      return;
    }
  }
  setTimeout(type, isDeleting ? 60 : 100);
}
type();

// Scroll to top button
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.onscroll = () => {
  scrollTopBtn.style.display = window.scrollY > 100 ? "block" : "none";
};
scrollTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

// Star background animation
const canvas = document.getElementById("star-bg");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = Array.from({ length: 100 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 1.5 + 0.5,
  dx: (Math.random() - 0.5) * 0.5,
  dy: (Math.random() - 0.5) * 0.5
}));

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
animateStars();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Rock Paper Scissors Game
const rpsButtons = document.querySelectorAll(".rps-btn");
const rpsResult = document.getElementById("rps-result");

rpsButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const userChoice = btn.getAttribute("data-choice");
    const choices = ["rock", "paper", "scissors"];
    const compChoice = choices[Math.floor(Math.random() * 3)];

    let result;
    if (userChoice === compChoice) {
      result = "It's a draw!";
    } else if (
      (userChoice === "rock" && compChoice === "scissors") ||
      (userChoice === "paper" && compChoice === "rock") ||
      (userChoice === "scissors" && compChoice === "paper")
    ) {
      result = `You win! ${userChoice} beats ${compChoice}`;
    } else {
      result = `You lose! ${compChoice} beats ${userChoice}`;
    }

    rpsResult.textContent = result;
  });
});
