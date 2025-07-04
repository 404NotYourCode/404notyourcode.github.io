// Game Logic
const box = document.getElementById("box");
const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");
let score = 0;

function moveBox() {
  const containerWidth = gameContainer.clientWidth - box.clientWidth;
  const containerHeight = gameContainer.clientHeight - box.clientHeight;

  const randomX = Math.floor(Math.random() * containerWidth);
  const randomY = Math.floor(Math.random() * containerHeight);

  box.style.left = `${randomX}px`;
  box.style.top = `${randomY}px`;
}

box.addEventListener("click", () => {
  score++;
  scoreDisplay.textContent = `Score: ${score}`;
  moveBox();
});

function startGame() {
  box.style.display = "block";
  moveBox();
}

document.addEventListener("DOMContentLoaded", startGame);

// Optional Typing Animation (for quotes or name)
function typeEffect(element, text, speed = 50) {
  let i = 0;
  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }
  typing();
}

// Example: Uncomment if you want typing effect on tagline or quote
// const heading = document.querySelector(".big-heading");
// heading.innerHTML = ""; 
// typeEffect(heading, "Built with purpose. Driven by passion.", 80);

// Optional Form Submission Feedback
const form = document.getElementById("contact-form");
form.addEventListener("submit", function () {
  setTimeout(() => {
    alert("Thanks for reaching out! I’ll get back to you soon.");
  }, 500);
});
