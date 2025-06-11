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

// Initialize mode based on localStorage or system preference
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

// Responsive Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// Highlight active nav link on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
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
});// Dark/Light Mode Toggle
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

// Initialize mode based on localStorage or system preference
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

// Responsive Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// Highlight active nav link on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
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
});
