// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navLinks.classList.remove('active');
        if (hamburger) {
            hamburger.classList.remove('active');
        }
    }
});

// Search functionality
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

if (searchBtn) {
    searchBtn.addEventListener('click', performSearch);
}

if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

function performSearch() {
    const query = searchInput.value.trim();
    if (query) {
        window.location.href = `notes.html?search=${encodeURIComponent(query)}`;
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking
            navLinks.classList.remove('active');
        }
    });
});

// Add animation delay to cards
const animateCards = () => {
    const classCards = document.querySelectorAll('.class-card');
    const subjectCards = document.querySelectorAll('.subject-card');
    const featureCards = document.querySelectorAll('.feature-card');
    
    classCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    subjectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.08}s`;
    });
    
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
};

// Intersection Observer for scroll animations
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.class-card, .subject-card, .feature-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
};

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    animateCards();
    observeElements();
});

// Add active state to navigation
const setActiveNav = () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.style.color = 'var(--primary-color)';
        }
    });
};

setActiveNav();
// Advanced Search Toggle
const advancedSearchToggle = document.getElementById('advancedSearchToggle');
const advancedSearchPanel = document.getElementById('advancedSearchPanel');

if (advancedSearchToggle) {
    advancedSearchToggle.addEventListener('click', () => {
        advancedSearchPanel.classList.toggle('active');
    });
}

// Apply Advanced Filters
const applyFilters = document.getElementById('applyFilters');
if (applyFilters) {
    applyFilters.addEventListener('click', () => {
        const classFilter = document.getElementById('filterClass').value;
        const subjectFilter = document.getElementById('filterSubject').value;
        const sortFilter = document.getElementById('filterSort').value;
        const searchQuery = document.getElementById('searchInput').value;
        
        // Build URL with filters
        let url = 'notes.html?';
        if (searchQuery) url += `search=${encodeURIComponent(searchQuery)}&`;
        if (classFilter) url += `class=${classFilter}&`;
        if (subjectFilter) url += `subject=${subjectFilter}&`;
        if (sortFilter) url += `sort=${sortFilter}`;
        
        window.location.href = url;
    });
}