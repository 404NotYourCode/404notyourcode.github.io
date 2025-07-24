// Star background animation
const canvas = document.getElementById('star-bg');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for (let i = 0; i < 150; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
    star.x += star.dx;
    star.y += star.dy;

    if (star.x < 0 || star.x > canvas.width) star.dx *= -1;
    if (star.y < 0 || star.y > canvas.height) star.dy *= -1;
  });
  requestAnimationFrame(drawStars);
}
drawStars();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Typing effect
const texts = ['Cybersecurity Enthusiast', 'Web Developer', 'Lifelong Learner'];
let index = 0, charIndex = 0;
const typingElement = document.getElementById('typing-text');

function type() {
  if (charIndex < texts[index].length) {
    typingElement.textContent += texts[index].charAt(charIndex);
    charIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(() => {
      typingElement.textContent = '';
      charIndex = 0;
      index = (index + 1) % texts.length;
      type();
    }, 2000);
  }
}
type();

// Rock Paper Scissors Game
const rpsButtons = document.querySelectorAll('.rps-btn');
const rpsResult = document.getElementById('rps-result');

rpsButtons.forEach(button => {
  button.addEventListener('click', () => {
    const userChoice = button.dataset.choice;
    const choices = ['rock', 'paper', 'scissors'];
    const compChoice = choices[Math.floor(Math.random() * 3)];
    let result;

    if (userChoice === compChoice) result = "It's a draw!";
    else if (
      (userChoice === 'rock' && compChoice === 'scissors') ||
      (userChoice === 'scissors' && compChoice === 'paper') ||
      (userChoice === 'paper' && compChoice === 'rock')
    ) {
      result = `You Win! 🏆 ${userChoice} beats ${compChoice}`;
    } else {
      result = `You Lose 😢 ${compChoice} beats ${userChoice}`;
    }

    rpsResult.textContent = result;
  });
});

// Scroll to Top Button
const scrollBtn = document.getElementById("scrollTopBtn");

window.onscroll = function () {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
};

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
