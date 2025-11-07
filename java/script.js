// Auto year
document.getElementById("year").textContent = new Date().getFullYear();

// Toggle menu
const toggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
toggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Smooth scroll active link
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (pageYOffset >= sectionTop) current = section.getAttribute("id");
  });

  navItems.forEach((a) => {
    a.classList.remove("active");
    if (a.getAttribute("href").includes(current)) {
      a.classList.add("active");
    }
  });
});

// Fade-in on scroll
const fadeEls = document.querySelectorAll(
  ".hero-box, .notes-section, .about-section, .contact-section, .social-buttons"
);
function showOnScroll() {
  fadeEls.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) el.classList.add("show");
  });
}
window.addEventListener("scroll", showOnScroll);
showOnScroll();

// ===== LOGIN & SIGNUP POPUP LOGIC =====
const loginBtn = document.getElementById("login-btn");
const loginPopup = document.getElementById("login-popup");
const closeLogin = document.getElementById("close-login");

const signupPopup = document.getElementById("signup-popup");
const closeSignup = document.getElementById("close-signup");

const openSignup = document.getElementById("open-signup");
const openLogin = document.getElementById("open-login");

// Open Login
loginBtn.addEventListener("click", () => {
  loginPopup.classList.add("show");
});

// Close Login
closeLogin.addEventListener("click", () => {
  loginPopup.classList.remove("show");
});

// Close Signup
closeSignup.addEventListener("click", () => {
  signupPopup.classList.remove("show");
});

// Open Signup from Login
openSignup.addEventListener("click", (e) => {
  e.preventDefault();
  loginPopup.classList.remove("show");
  signupPopup.classList.add("show");
});

// Back to Login from Signup
openLogin.addEventListener("click", (e) => {
  e.preventDefault();
  signupPopup.classList.remove("show");
  loginPopup.classList.add("show");
});

// Close if clicking outside
window.addEventListener("click", (e) => {
  if (e.target === loginPopup) loginPopup.classList.remove("show");
  if (e.target === signupPopup) signupPopup.classList.remove("show");
});
