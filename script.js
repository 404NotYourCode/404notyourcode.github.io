// ----- Typing Effect -----
const typingText = document.getElementById("typing-text");
const phrases = [
  "Hi, I'm Syed Sameer.",
  "Cybersecurity Enthusiast.",
  "Creative Developer.",
  "Driven by Purpose."
];
let i = 0, j = 0, isDeleting = false;

function type() {
  const currentPhrase = phrases[i];
  const speed = isDeleting ? 40 : 100;

  typingText.textContent = currentPhrase.slice(0, j);

  if (!isDeleting && j < currentPhrase.length) {
    j++;
  } else if (isDeleting && j > 0) {
    j--;
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) i = (i + 1) % phrases.length;
  }

  setTimeout(type, speed);
}
type();

// ----- Starry Background -----
const canvas = document.getElementById("star-bg");
const ctx = canvas.getContext("2d");

let stars = [], numStars = 150;

function initStars() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = Array.from({ length: numStars }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.2,
    speed: Math.random() * 0.5 + 0.2
  }));
}
function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });
  requestAnimationFrame(drawStars);
}
window.addEventListener("resize", initStars);
initStars();
drawStars();

// ----- Scroll to Top Button -----
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.onscroll = () => {
  scrollTopBtn.style.display = window.scrollY > 500 ? "block" : "none";
};
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ----- Custom Cursor -----
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", e => {
  cursor.style.left = e.pageX + "px";
  cursor.style.top = e.pageY + "px";
});

// ----- Rock Paper Scissors -----
const rpsButtons = document.querySelectorAll(".rps-btn");
const rpsResult = document.getElementById("rps-result");

rpsButtons.forEach(btn =>
  btn.addEventListener("click", () => {
    const userChoice = btn.dataset.choice;
    const choices = ["rock", "paper", "scissors"];
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    let result = "";
    if (userChoice === computerChoice) result = "It's a draw!";
    else if (
      (userChoice === "rock" && computerChoice === "scissors") ||
      (userChoice === "scissors" && computerChoice === "paper") ||
      (userChoice === "paper" && computerChoice === "rock")
    ) {
      result = `You Win! ${userChoice} beats ${computerChoice}`;
    } else {
      result = `You Lose! ${computerChoice} beats ${userChoice}`;
    }

    rpsResult.textContent = result;
  })
);

// ----- Optional: Dark/Light Mode Toggle (future expansion) -----
// const toggleBtn = document.getElementById("theme-toggle");
// toggleBtn.addEventListener("click", () => {
//   document.body.classList.toggle("light-theme");
// });
