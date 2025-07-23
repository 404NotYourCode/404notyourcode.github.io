// Typing effect
const typingText = document.getElementById("typing-text");
const words = ["Cybersecurity Student", "Developer", "Bug Hunter", "Lifelong Learner"];
let wordIndex = 0;
let charIndex = 0;

function typeEffect() {
  if (charIndex < words[wordIndex].length) {
    typingText.textContent += words[wordIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeEffect, 100);
  } else {
    setTimeout(() => {
      typingText.textContent = "";
      charIndex = 0;
      wordIndex = (wordIndex + 1) % words.length;
      typeEffect();
    }, 2000);
  }
}
typeEffect();

// Rock Paper Scissors game with coins
let coins = 0;
const rpsButtons = document.querySelectorAll(".rps-btn");
const rpsResult = document.getElementById("rps-result");
const rpsScore = document.getElementById("rps-score");

rpsButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const choices = ["rock", "paper", "scissors"];
    const userChoice = btn.dataset.choice;
    const botChoice = choices[Math.floor(Math.random() * choices.length)];
    let result = "";

    if (userChoice === botChoice) {
      result = `It's a tie! You both chose ${userChoice}.`;
    } else if (
      (userChoice === "rock" && botChoice === "scissors") ||
      (userChoice === "paper" && botChoice === "rock") ||
      (userChoice === "scissors" && botChoice === "paper")
    ) {
      result = `You win! ${userChoice} beats ${botChoice}. +10 coins!`;
      coins += 10;
    } else {
      result = `You lose! ${botChoice} beats ${userChoice}. -5 coins.`;
      coins = Math.max(0, coins - 5);
    }

    rpsResult.textContent = result;
    rpsScore.textContent = `Coins: ${coins}`;
  });
});

// Scroll to top button
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Starry space background animation
const canvas = document.getElementById("star-bg");
const ctx = canvas.getContext("2d");

let stars = [];
let numStars = 150;

function initStars() {
  stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.2,
      speed: Math.random() * 0.5 + 0.1,
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  stars.forEach((star) => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
  });
}

function moveStars() {
  stars.forEach((star) => {
    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });
}

function animateStars() {
  drawStars();
  moveStars();
  requestAnimationFrame(animateStars);
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initStars();
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
animateStars();
