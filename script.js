// Dark Mode Preference Initialization
const body = document.body;
const themeToggle = document.getElementById("theme-toggle");

function setTheme(mode) {
  if (mode === "dark") {
    body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("dark-mode");
    themeToggle.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
}

const storedTheme = localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
setTheme(storedTheme);

themeToggle.addEventListener("click", () => {
  const current = body.classList.contains("dark-mode") ? "dark" : "light";
  setTheme(current === "dark" ? "light" : "dark");
});

// Typing Effect
const typedText = document.getElementById("typed-text");
const phrases = [
  "Cybersecurity Enthusiast",
  "Python Developer",
  "Network Security Analyst",
  "Ethical Hacker in Training"
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];
  const currentText = typedText.textContent;

  if (isDeleting) {
    typedText.textContent = currentText.slice(0, -1);
  } else {
    typedText.textContent = currentPhrase.slice(0, charIndex + 1);
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1000);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }

  charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
  setTimeout(typeEffect, isDeleting ? 50 : 100);
}
typeEffect();

// Scroll Animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
