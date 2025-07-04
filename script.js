document.addEventListener('DOMContentLoaded', () => {
  // ==============================
  // Theme Toggle
  // ==============================
  const modeToggle = document.getElementById('mode-toggle');
  modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    modeToggle.innerHTML = document.body.classList.contains('light') ? '🌙' : '☀️';
  });

  // ==============================
  // Mobile Menu Toggle
  // ==============================
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // ==============================
  // Smooth Scroll Highlight Active Link
  // ==============================
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-links a');

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
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });

  // ==============================
  // Contact Form Submission Success (Optional)
  // ==============================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      setTimeout(() => {
        alert('Message sent successfully!');
      }, 500); // wait for formspree to process
    });
  }

  // ==============================
  // Mini Game: Click the Target Box
  // ==============================
  const target = document.getElementById('target-box');
  const gameArea = document.getElementById('game-area');
  const scoreDisplay = document.getElementById('score');

  let score = 0;

  function moveTarget() {
    const areaWidth = gameArea.clientWidth;
    const areaHeight = gameArea.clientHeight;
    const targetSize = target.offsetWidth;

    const maxX = areaWidth - targetSize;
    const maxY = areaHeight - targetSize;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    target.style.left = `${randomX}px`;
    target.style.top = `${randomY}px`;
  }

  if (target && gameArea && scoreDisplay) {
    target.addEventListener('click', () => {
      score++;
      scoreDisplay.textContent = score;
      moveTarget();
    });

    moveTarget();
  }
});
