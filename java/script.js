// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('nav ul');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Scroll effect for menu
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Toggle login/register forms with sliding animation
const loginCard = document.getElementById('login-card');
const registerCard = document.getElementById('register-card');
const showRegister = document.getElementById('show-register');
const showLogin = document.getElementById('show-login');

showRegister.addEventListener('click', () => {
  loginCard.classList.remove('visible');
  loginCard.classList.add('hidden-left');

  registerCard.classList.remove('hidden-right');
  registerCard.classList.add('visible');
});

showLogin.addEventListener('click', () => {
  registerCard.classList.remove('visible');
  registerCard.classList.add('hidden-right');

  loginCard.classList.remove('hidden-left');
  loginCard.classList.add('visible');
});


// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function() {

  const particlesContainer = document.getElementById('particles');

  // Make sure the container exists
  if (!particlesContainer) return;

  const particleCount = 40; // number of particles

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    // Random position
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = Math.random() * window.innerHeight + 'px';

    // Random size
    const size = 4 + Math.random() * 8;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';

    // Random animation duration & delay
    particle.style.animationDuration = 15 + Math.random() * 20 + 's';
    particle.style.animationDelay = Math.random() * 20 + 's';

    // Random gradient color (blue-teal-purple tones)
    const colors = [
      'rgba(90,103,216,0.7)',
      'rgba(32,58,67,0.5)',
      'rgba(75,192,192,0.6)',
      'rgba(106,90,205,0.5)'
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.background = `radial-gradient(circle, ${color} 0%, rgba(0,0,0,0) 100%)`;

    particlesContainer.appendChild(particle);
  }

});

