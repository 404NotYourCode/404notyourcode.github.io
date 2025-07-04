document.addEventListener("DOMContentLoaded", () => {
  // Particles.js
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
      move: { enable: true, speed: 2 }
    }
  });

  // Typed.js effect
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

  // Scroll animation for case study steps
  const steps = document.querySelectorAll(".step");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });
  steps.forEach(step => observer.observe(step));

  // Timeline Scroll Progress
  const timeline = document.querySelector(".timeline");
  const line = document.querySelector(".timeline-line");
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY + window.innerHeight;
    const top = timeline.offsetTop;
    const height = timeline.offsetHeight;
    if (scrollY >= top) {
      const progress = Math.min(1, (scrollY - top) / height);
      line.style.height = `${progress * 100}%`;
    }
  });

  // CTF Puzzle logic (IDs now match!)
  document.getElementById("ctf-check").addEventListener("click", () => {
    const answer = document.getElementById("ctf-input").value.trim().toLowerCase();
    const output = document.getElementById("ctf-result");
    // decoded Caesar(+1): "there is a future"
    if (answer === "there is a future") {
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
});
