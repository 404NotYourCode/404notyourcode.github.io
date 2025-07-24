// Starry Background Animation
const canvas = document.getElementById("star-bg");
const ctx = canvas.getContext("2d");

let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createStars(count) {
  stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00bfff";
  stars.forEach((star) => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
  });
}

function updateStars() {
  stars.forEach((star) => {
    star.x += star.dx;
    star.y += star.dy;

    if (star.x < 0 || star.x > canvas.width) star.dx *= -1;
    if (star.y < 0 || star.y > canvas.height) star.dy *= -1;
  });
}

function animateStars() {
  drawStars();
  updateStars();
  requestAnimationFrame(animateStars);
}

window.addEventListener("resize", () => {
  resizeCanvas();
  createStars(150);
});

resizeCanvas();
createStars(150);
animateStars();

// Rock Paper Scissors
let userScore = 0;
let computerScore = 0;

function playRPS(userChoice) {
  const choices = ["rock", "paper", "scissors"];
  const computerChoice = choices[Math.floor(Math.random() * 3)];

  let result = "";
  if (userChoice === computerChoice) {
    result = "It's a draw!";
  } else if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissors" && computerChoice === "paper")
  ) {
    result = "You win!";
    userScore++;
  } else {
    result = "Computer wins!";
    computerScore++;
  }

  document.getElementById("rps-result").textContent =
    `You chose ${userChoice}, computer chose ${computerChoice}. ${result}`;
  document.getElementById("rps-score").textContent =
    `Score: You ${userScore} - ${computerScore} Computer`;
}

// Scroll to Top Button
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.onscroll = function () {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
