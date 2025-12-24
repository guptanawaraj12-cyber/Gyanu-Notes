// ==================== CONTACT PAGE FUNCTIONALITY ====================

document.addEventListener('DOMContentLoaded', function() {
    initializeContactPage();
});

function initializeContactPage() {
    setupFormValidation();
    setupFormSubmission();
    animateContactElements();
    setupFormEnhancements();
}

// ==================== FORM VALIDATION ====================
function setupFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        // Real-time validation
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';

    // Remove previous error
    removeError(field);

    // Required field validation
    if (field.hasAttribute('required') && value === '') {
        isValid = false;
        errorMessage = 'This field is required';
    }

    // Email validation
    if (fieldName === 'email' && value !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }

    // Phone validation
    if (fieldName === 'phone' && value !== '') {
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(value.replace(/[\s-]/g, ''))) {
            isValid = false;
            errorMessage = 'Please enter a valid 10-digit phone number';
        }
    }

    // Name validation
    if ((fieldName === 'firstName' || fieldName === 'lastName') && value !== '') {
        if (value.length < 2) {
            isValid = false;
            errorMessage = 'Name must be at least 2 characters';
        }
    }

    // Message validation
    if (fieldName === 'message' && value !== '') {
        if (value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters';
        }
    }

    if (!isValid) {
        showError(field, errorMessage);
    } else {
        showSuccess(field);
    }

    return isValid;
}

function showError(field, message) {
    field.classList.add('error');
    field.classList.remove('success');
    
    const formGroup = field.closest('.form-group');
    let errorDiv = formGroup.querySelector('.error-message');
    
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.3rem;
        `;
        formGroup.appendChild(errorDiv);
    }
    
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    field.style.borderColor = '#ef4444';
}

function showSuccess(field) {
    field.classList.remove('error');
    field.classList.add('success');
    field.style.borderColor = '#10b981';
    removeError(field);
}

function removeError(field) {
    const formGroup = field.closest('.form-group');
    const errorDiv = formGroup.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// ==================== FORM SUBMISSION ====================
function setupFormSubmission() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            submitForm(form);
        } else {
            showNotification('Please fix the errors in the form', 'error');
            // Scroll to first error
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }
    });
}

function submitForm(form) {
    const submitBtn = form.querySelector('.submit-btn');
    const originalHTML = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Simulate API call
    setTimeout(() => {
        // Success
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        
        // Reset form
        form.reset();
        
        // Remove success classes
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.classList.remove('success');
            input.style.borderColor = '#e2e8f0';
        });
        
        // Reset button
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;

        // Show success animation
        showSuccessAnimation();

        // In a real application, you would send data to server
        console.log('Form Data:', data);
    }, 2000);
}

function showSuccessAnimation() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-animation';
    successDiv.innerHTML = `
        <div class="success-checkmark">
            <i class="fas fa-check-circle"></i>
        </div>
        <h3>Thank You!</h3>
        <p>Your message has been sent successfully</p>
    `;
    
    successDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 3rem;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        text-align: center;
        z-index: 10000;
        animation: scaleIn 0.5s ease;
    `;
    
    const checkmark = successDiv.querySelector('.success-checkmark');
    checkmark.style.cssText = `
        font-size: 5rem;
        color: #10b981;
        margin-bottom: 1rem;
        animation: bounceIn 0.6s ease;
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.animation = 'scaleOut 0.5s ease';
        setTimeout(() => successDiv.remove(), 500);
    }, 3000);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes scaleIn {
        from {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
        to {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
    }
    
    @keyframes scaleOut {
        from {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        to {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes bounceIn {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.2);
        }
        100% {
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// ==================== NOTIFICATION SYSTEM ====================
function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6'
    };

    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        info: 'info-circle'
    };

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${icons[type]}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;

    document.body.appendChild(notification);

    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 1.2rem;
        padding: 0;
        margin-left: auto;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });

    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ==================== FORM ENHANCEMENTS ====================
function setupFormEnhancements() {
    // Character counter for textarea
    const textarea = document.getElementById('message');
    if (textarea) {
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.cssText = `
            text-align: right;
            font-size: 0.875rem;
            color: #718096;
            margin-top: 0.5rem;
        `;
        
        textarea.parentElement.appendChild(counter);
        
        textarea.addEventListener('input', function() {
            const length = this.value.length;
            counter.textContent = `${length} characters`;
            
            if (length < 10) {
                counter.style.color = '#ef4444';
            } else {
                counter.style.color = '#10b981';
            }
        });
    }

    // Auto-format phone number
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 10) {
                value = value.slice(0, 10);
            }
            e.target.value = value;
        });
    }

    // Capitalize first letter of names
    const nameInputs = document.querySelectorAll('#firstName, #lastName');
    nameInputs.forEach(input => {
        input.addEventListener('blur', function() {
            this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1).toLowerCase();
        });
    });
}

// ==================== ANIMATE ELEMENTS ====================
function animateContactElements() {
    const formGroups = document.querySelectorAll('.form-group');
    const infoCards = document.querySelectorAll('.info-card');
    
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateX(-30px)';
        group.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            group.style.opacity = '1';
            group.style.transform = 'translateX(0)';
        }, index * 100);
    });
    
    infoCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, index * 100 + 200);
    });
}

// ==================== SOCIAL ICONS ANIMATION ====================
document.addEventListener('DOMContentLoaded', function() {
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach((icon, index) => {
        icon.style.opacity = '0';
        icon.style.transform = 'scale(0)';
        icon.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            icon.style.opacity = '1';
            icon.style.transform = 'scale(1)';
        }, index * 100 + 500);
    });
});

console.log('%c✉️ Contact Page Loaded Successfully!', 'background: #10b981; color: white; padding: 5px 10px; border-radius: 3px;');