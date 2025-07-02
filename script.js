// Typing Animation
const typedText = document.getElementById('typed-text');
const words = ["Cybersecurity Enthusiast", "Ethical Hacker", "Python Developer", "Network Analyst"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentWord = words[wordIndex];
  typedText.textContent = currentWord.substring(0, charIndex);

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(type, 100);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(type, 60);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, 1000);
  }
}

// Skill Bar Animation on Scroll
function animateSkillBars() {
  const skills = document.querySelectorAll('.skill-level');
  skills.forEach(bar => {
    const rect = bar.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      const targetWidth = bar.getAttribute('data-skill') || bar.style.getPropertyValue('--level');
      bar.style.width = targetWidth;
    }
  });
}

// AOS Initialization
AOS.init({
  duration: 1000,
  once: true,
});

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

if (modeToggle) {
  modeToggle.addEventListener('click', () => {
    const newMode = body.classList.contains('light') ? 'dark' : 'light';
    setMode(newMode);
  });
}

// Responsive Mobile Menu
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// Active Nav Link Highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });

  animateSkillBars(); // Trigger skill bars on scroll
});

document.addEventListener('DOMContentLoaded', () => {
  type();
  animateSkillBars();
});
