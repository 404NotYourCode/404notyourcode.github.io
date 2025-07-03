// Dark/Light Mode & Menu Toggle
const body = document.body;
const modeToggle = document.getElementById('mode-toggle');
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

// Set theme based on localStorage or system preference
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(saved);
});

function applyTheme(theme) {
  if (theme === 'dark') {
    body.classList.add('dark-mode');
    modeToggle.textContent = '☀️';
  } else {
    body.classList.remove('dark-mode');
    modeToggle.textContent = '🌙';
  }
  localStorage.setItem('theme', theme);
}

modeToggle.addEventListener('click', () => {
  const current = body.classList.contains('dark-mode') ? 'dark' : 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Typing Animation
const target = document.getElementById('typed-text');
const phrases = ['Cybersecurity Enthusiast', 'Python Developer', 'Network Analyst', 'Ethical Hacker'];
let pIndex = 0, cIndex = 0, deleting = false;

function typeLoop() {
  const current = phrases[pIndex];
  let displayed = current.substring(0, cIndex);
  target.textContent = displayed;

  if (!deleting && cIndex < current.length) {
    cIndex++;
  } else if (deleting && cIndex > 0) {
    cIndex--;
  } else if (cIndex === current.length) {
    deleting = true;
    setTimeout(typeLoop, 1000);
    return;
  } else if (deleting && cIndex === 0) {
    deleting = false;
    pIndex = (pIndex + 1) % phrases.length;
  }
  setTimeout(typeLoop, deleting ? 50 : 100);
}

document.addEventListener('DOMContentLoaded', typeLoop);

// AOS Init & Fade-in Observer
AOS.init({ duration: 800, once: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Active Nav Link on Scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let currentId = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (pageYOffset >= top) currentId = sec.getAttribute('id');
  });
  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === `#${currentId}`) item.classList.add('active');
  });
});
