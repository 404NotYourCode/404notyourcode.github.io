// === Typing Effect ===
const typingText = document.getElementById("typing-text");
const phrases = [
  "Cybersecurity Enthusiast",
  "Developer in Progress",
  "Building with Purpose",
  "Learning. Creating. Sharing."
];
let phraseIndex = 0;
let charIndex = 0;
let typingDelay = 100;
let erasingDelay = 50;
let newPhraseDelay = 2000;

function type() {
  if (charIndex < phrases[phraseIndex].length) {
    typingText.textContent += phrases[phraseIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newPhraseDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    typingText.textContent = phrases[phraseIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(type, typingDelay);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (phrases.length) setTimeout(type, 1000);
});

// === Rock Paper Scissors Game ===
const rpsButtons = document.querySelectorAll(".rps-btn");
const rpsResult = document.getElementById("rps-result");
const choices = ["rock", "paper", "scissors"];

rpsButtons.forEach(button => {
  button.addEventListener("click", () => {
    const userChoice = button.dataset.choice;
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
    } else {
      result = "You lose!";
    }

    rpsResult.textContent = `You chose ${userChoice} — Computer chose ${computerChoice}. ${result}`;
  });
});

// === Theme Toggle ===
const toggleBtn = document.getElementById("themeToggle");
let darkMode = true;

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  darkMode = !darkMode;
  toggleBtn.textContent = darkMode ? "Toggle Theme" : "Switch Back";
});

// === Scroll to Top Button ===
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// === Cursor Effect (Optional Visual Flair) ===
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", e => {
  cursor.style.left = e.pageX + "px";
  cursor.style.top = e.pageY + "px";
});
