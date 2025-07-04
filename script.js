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

// Typed.js effect
document.addEventListener("DOMContentLoaded", function () {
  new Typed(".hero-subtitle", {
    strings: ["Cybersecurity Engineer", "Python Developer", "Network Sniffer", "Phishing Preventer"],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true
  });
});

// Scroll animation for case study steps
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

// Timeline Scroll Progress
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
document.getElementById("puzzle-submit")?.addEventListener("click", () => {
  const answer = document.getElementById("puzzle-answer").value.trim().toLowerCase();
  const output = document.getElementById("puzzle-output");
  if (answer === "syed") {
    output.innerText = "✅ Correct! You've unlocked part of my journey.";
    output.style.color = "lime";
  } else {
    output.innerText = "❌ Try again!";
    output.style.color = "crimson";
  }
});

// Nav toggle for mobile
document.getElementById("menu-toggle").addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("open");
});
