// Typing Effect
const typingText = document.getElementById("typing-text");
const text = "Syed Sameer | Developer | Designer | Dreamer";
let index = 0;

function typeWriter() {
  if (index < text.length) {
    typingText.innerHTML += text.charAt(index);
    index++;
    setTimeout(typeWriter, 100);
  }
}
typeWriter();

// Scroll to Top Button
const scrollBtn = document.getElementById("scrollTopBtn");
window.onscroll = () => {
  scrollBtn.style.display = window.scrollY > 400 ? "block" : "none";
};
scrollBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Starry Background
const canvas = document.getElementById("star-bg");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for (let i = 0; i < 250; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.5,
    d: Math.random() * 0.5 + 0.05,
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  for (let i = 0; i < stars.length; i++) {
    let s = stars[i];
    ctx.moveTo(s.x, s.y);
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2, true);
  }
  ctx.fill();
  updateStars();
}

function updateStars() {
  for (let i = 0; i < stars.length; i++) {
    let s = stars[i];
    s.y += s.d;
    if (s.y > canvas.height) {
      s.y = 0;
      s.x = Math.random() * canvas.width;
    }
  }
}

function animateStars() {
  drawStars();
  requestAnimationFrame(animateStars);
}
animateStars();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Background Music Control
const bgMusic = document.getElementById("bgMusic");
document.body.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.volume = 0.5;
    bgMusic.play();
  }
}, { once: true });
