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

// Fade-in on scroll (sections + social icons)
const fadeEls = document.querySelectorAll(
  ".hero-box, .notes-section, .about-section, .contact-section, .social-buttons"
);

function showOnScroll() {
  fadeEls.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
}

window.addEventListener("scroll", showOnScroll);
showOnScroll();