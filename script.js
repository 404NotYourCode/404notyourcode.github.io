// Particles.js config
particlesJS("particles-js", {
  particles: {
    number: { value: 60 },
    color: { value: "#00ffd5" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: 3 },
    line_linked: {
      enable: true,
      distance: 120,
      color: "#00ffd5",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 2
    }
  }
});

// Typed.js for hero subtitle
document.addEventListener("DOMContentLoaded", function () {
  new Typed(".hero-subtitle", {
    strings: [
      "Cybersecurity Engineer",
      "Python Developer",
      "Network Sniffer",
      "Phishing Preventer"
    ],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true
  });
});

// Rotate quotes
const quotes = [
  {
    text: "Wasn't born to follow footsteps—I carve new paths where none exist. In silence, I build. In storms, I rise. My name doesn't echo yet—but when it does, the world will listen.",
    author: "Syed Sameer"
  },
  {
    text: "I came from silence, walked through storms, and now I speak with purpose—not to prove, but to inspire.",
    author: "Syed Sameer"
  },
  {
    text: "Built with purpose. Driven by passion. Defined by originality. — I don’t just create, I leave a mark.",
    author: "Syed Sameer"
  }
];

let quoteIndex = 0;
function rotateQuotes() {
  const quoteEl = document.getElementById("quote-text");
  const authorEl = document.getElementById("quote-author");

  quoteEl.textContent = quotes[quoteIndex].text;
  authorEl.textContent = `— ${quotes[quoteIndex].author}`;

  quoteIndex = (quoteIndex + 1) % quotes.length;
}
rotateQuotes();
setInterval(rotateQuotes, 8000);

// Show case study steps on scroll
const steps = document.querySelectorAll(".step");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.2
});
steps.forEach(step => observer.observe(step));

// Animate timeline progress
window.addEventListener("scroll", () => {
  const timeline = document.querySelector(".timeline");
  const line = document.querySelector(".timeline-line");
  const scrollY = window.scrollY + window.innerHeight;
  const timelineTop = timeline.offsetTop;
  const timelineHeight = timeline.offsetHeight;

  if (scrollY >= timelineTop) {
    const progress = Math.min(1, (scrollY - timelineTop) / timelineHeight);
    line.style.height = `${progress * 100}%`;
  }
});

// CTF Puzzle logic
document.getElementById("ctf-check")?.addEventListener("click", () => {
  const input = document.getElementById("ctf-input").value.trim().toLowerCase();
  const result = document.getElementById("ctf-result");
  if (input === "there is a future") {
    result.innerText = "✅ Correct! You’ve unlocked part of the journey.";
    result.style.color = "lime";
  } else {
    result.innerText = "❌ Try again!";
    result.style.color = "crimson";
  }
});

// Mobile nav toggle
document.getElementById("menu-toggle").addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("open");
});
