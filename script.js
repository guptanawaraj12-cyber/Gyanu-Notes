// ==================== MAIN JAVASCRIPT FILE ====================
// Common functionality for all pages

// ==================== THEME TOGGLE ====================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

// Update theme toggle icon
function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (html.getAttribute('data-theme') === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Initialize theme icon
if (themeToggle) {
    updateThemeIcon();
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon();
    });
}

// ==================== MOBILE NAVIGATION ====================
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// ==================== NAVBAR SCROLL EFFECT ====================
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (navbar) {
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
    }
    
    lastScroll = currentScroll;
});

// ==================== SCROLL TO TOP BUTTON ====================
const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================== SEARCH FUNCTIONALITY ====================
const searchToggle = document.getElementById('searchToggle');
const searchModal = document.getElementById('searchModal');
const searchClose = document.getElementById('searchClose');
const searchInput = document.getElementById('searchInput');

if (searchToggle && searchModal) {
    searchToggle.addEventListener('click', () => {
        searchModal.classList.add('active');
        setTimeout(() => {
            if (searchInput) searchInput.focus();
        }, 300);
    });
}

if (searchClose && searchModal) {
    searchClose.addEventListener('click', () => {
        searchModal.classList.remove('active');
    });
}

if (searchModal) {
    searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) {
            searchModal.classList.remove('active');
        }
    });
}

// Close search on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchModal) {
        searchModal.classList.remove('active');
    }
});

// ==================== HOMEPAGE UPDATES LOADING ====================
const updatesGrid = document.getElementById('updatesGrid');

if (updatesGrid && typeof updatesData !== 'undefined') {
    loadUpdates();
}

function loadUpdates() {
    const updates = getRecentUpdates(6);
    
    updatesGrid.innerHTML = '';
    
    updates.forEach((update, index) => {
        const updateCard = createUpdateCard(update, index);
        updatesGrid.appendChild(updateCard);
    });
}

function createUpdateCard(update, index) {
    const card = document.createElement('div');
    card.className = 'update-card';
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', index * 100);

    const typeClass = update.type;
    const formattedDate = formatUpdateDate(update.date);

    card.innerHTML = `
        <div class="update-header">
            <div class="update-type ${typeClass}">
                <i class="${update.icon}"></i>
                <span>${update.type.charAt(0).toUpperCase() + update.type.slice(1)}</span>
            </div>
            <span class="update-badge ${update.badgeClass}">${update.badge}</span>
        </div>
        <div class="update-content">
            <h3>${update.title}</h3>
            <p>${update.description}</p>
        </div>
        <div class="update-meta">
            <span class="update-date">
                <i class="fas fa-calendar"></i>
                ${formattedDate}
            </span>
            <a href="${update.link}" class="update-link">
                Read More
                <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    `;

    return card;
}

// ==================== COUNTER ANIMATION (About Page) ====================
const counters = document.querySelectorAll('.counter');

if (counters.length > 0) {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') return;
        
        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            
            const offsetTop = target.offsetTop - 100; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== AOS (Animate On Scroll) INITIALIZATION ====================
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100,
        delay: 100
    });
}

// ==================== LAZY LOADING IMAGES ====================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== FORM VALIDATION ====================
const forms = document.querySelectorAll('form');

forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
                
                // Remove error class on input
                input.addEventListener('input', () => {
                    input.classList.remove('error');
                }, { once: true });
            }
        });

        if (!isValid) {
            e.preventDefault();
            
            // Show error message
            const errorMsg = document.createElement('div');
            errorMsg.className = 'form-error-message';
            errorMsg.style.cssText = 'color: var(--danger-color); text-align: center; margin-top: 1rem; font-weight: 600;';
            errorMsg.textContent = 'Please fill in all required fields';
            
            // Remove existing error message if any
            const existingError = form.querySelector('.form-error-message');
            if (existingError) {
                existingError.remove();
            }
            
            form.appendChild(errorMsg);
            
            // Remove error message after 3 seconds
            setTimeout(() => {
                errorMsg.remove();
            }, 3000);
        }
    });
});

// ==================== COPY TO CLIPBOARD ====================
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Copied to clipboard!');
    }
}

// ==================== TOAST NOTIFICATION ====================
function showToast(message, duration = 3000) {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: var(--primary-gradient);
        color: var(--white);
        padding: 1rem 1.5rem;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-2xl);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        font-weight: 600;
    `;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, duration);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .form-input.error,
    .form-textarea.error,
    .form-select.error {
        border-color: var(--danger-color) !important;
    }
`;
document.head.appendChild(style);

// ==================== PREVENT CONTEXT MENU (Optional) ====================
// Uncomment if you want to disable right-click
/*
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    showToast('Right-click is disabled');
});
*/

// ==================== CONSOLE MESSAGE ====================
console.log('%c🎓 Gyanu Note', 'color: #667eea; font-size: 24px; font-weight: bold;');
console.log('%cWelcome to Gyanu Note - Your Complete Study Companion', 'color: #667eea; font-size: 14px;');
console.log('%cWebsite: https://gyanunote.com', 'color: #667eea; font-size: 12px;');
console.log('%c⚠️ Warning: Do not paste any code here unless you know what you are doing!', 'color: #ef4444; font-size: 14px; font-weight: bold;');

// ==================== PAGE LOAD COMPLETE ====================
window.addEventListener('load', () => {
    console.log('✅ Page loaded successfully');
    
    // Hide loading spinner if exists
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }
});

// ==================== ERROR HANDLING ====================
window.addEventListener('error', (e) => {
    console.error('Error occurred:', e.error);
});

// ==================== ONLINE/OFFLINE STATUS ====================
window.addEventListener('online', () => {
    showToast('✅ You are back online!');
});

window.addEventListener('offline', () => {
    showToast('⚠️ You are offline. Some features may not work.', 5000);
});

// ==================== EXPORT FUNCTIONS ====================
// Make functions available globally
window.copyToClipboard = copyToClipboard;
window.showToast = showToast;