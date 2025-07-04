// Smooth Scroll Navigation
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.section, .hero-content, .quote');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1
});

revealElements.forEach(el => {
  el.classList.add('hidden');
  observer.observe(el);
});

// Contact Form (Formspree) Submission
const form = document.getElementById('contact-form');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  fetch(form.action, {
    method: form.method,
    body: formData,
    headers: { 'Accept': 'application/json' }
  })
    .then(response => {
      if (response.ok) {
        alert('Message sent! Thank you.');
        form.reset();
      } else {
        alert('Error sending message. Try again.');
      }
    })
    .catch(error => {
      console.error('Form Error:', error);
      alert('Something went wrong.');
    });
});

// ================== GAME LOGIC ===================
// Catch the Square Game
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let square = {
  x: Math.random() * 450,
  y: Math.random() * 250,
  size: 40,
  dx: 3,
  dy: 3,
  color: "#ff003c"
};

let score = 0;

function drawSquare() {
  ctx.fillStyle = square.color;
  ctx.fillRect(square.x, square.y, square.size, square.size);
}

function moveSquare() {
  square.x += square.dx;
  square.y += square.dy;

  // Bounce logic
  if (square.x <= 0 || square.x + square.size >= canvas.width) square.dx *= -1;
  if (square.y <= 0 || square.y + square.size >= canvas.height) square.dy *= -1;
}

function drawScore() {
  ctx.fillStyle = "#ffffff";
  ctx.font = "20px monospace";
  ctx.fillText("Score: " + score, 10, 30);
}

function clearCanvas() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const clickY = e.clientY - rect.top;

  if (
    clickX > square.x && clickX < square.x + square.size &&
    clickY > square.y && clickY < square.y + square.size
  ) {
    score++;
    square.size = Math.max(20, square.size - 1);
    square.dx *= 1.05;
    square.dy *= 1.05;
    square.x = Math.random() * (canvas.width - square.size);
    square.y = Math.random() * (canvas.height - square.size);
  }
});

function gameLoop() {
  clearCanvas();
  drawSquare();
  moveSquare();
  drawScore();
  requestAnimationFrame(gameLoop);
}

gameLoop();

// Optional: Responsive Nav Toggle (future-proofing)
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}
