// Dark/Light Mode Toggle
const modeToggle = document.getElementById('mode-toggle');
const body = document.body;

function setMode(mode) {
  if (mode === 'light') {
    body.classList.add('light');
    modeToggle.textContent = '🌙';
    localStorage.setItem('mode', 'light');
  } else {
    body.classList.remove('light');
    modeToggle.textContent = '☀️';
    localStorage.setItem('mode', 'dark');
  }
}

const savedMode = localStorage.getItem('mode');
if (savedMode) {
  setMode(savedMode);
} else {
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  setMode(prefersLight ? 'light' : 'dark');
}

modeToggle.addEventListener('click', () => {
  if (body.classList.contains('light')) {
    setMode('dark');
  } else {
    setMode('light');
  }
});

// Responsive Menu
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// Active link on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Typewriter effect for subtitle
const text = 'Cybersecurity Engineer';
let i = 0;
const typedText = document.getElementById('typed-text');

function typeEffect() {
  if (i < text.length) {
    typedText.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeEffect, 100);
  }
}
typeEffect();
