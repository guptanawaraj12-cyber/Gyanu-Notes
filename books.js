// Books page filtering
const bookClassFilter = document.getElementById('bookClassFilter');
const bookSubjectFilter = document.getElementById('bookSubjectFilter');
const bookSearch = document.getElementById('bookSearch');

// Filter books by class
if (bookClassFilter) {
    bookClassFilter.addEventListener('change', filterBooks);
}

// Filter books by subject
if (bookSubjectFilter) {
    bookSubjectFilter.addEventListener('change', filterBooks);
}

// Search books
if (bookSearch) {
    bookSearch.addEventListener('input', filterBooks);
}

function filterBooks() {
    const classValue = bookClassFilter ? bookClassFilter.value : 'all';
    const subjectValue = bookSubjectFilter ? bookSubjectFilter.value : 'all';
    const searchValue = bookSearch ? bookSearch.value.toLowerCase() : '';
    
    const categories = document.querySelectorAll('.books-category');
    
    categories.forEach(category => {
        const categoryClass = category.getAttribute('data-class');
        let categoryVisible = false;
        
        // Check if category matches class filter
        if (classValue === 'all' || categoryClass === classValue) {
            const bookCards = category.querySelectorAll('.book-card');
            
            bookCards.forEach(card => {
                const cardSubject = card.getAttribute('data-subject');
                const cardTitle = card.querySelector('h4').textContent.toLowerCase();
                const cardAuthor = card.querySelector('.author').textContent.toLowerCase();
                
                // Check all filters
                const matchesSubject = subjectValue === 'all' || cardSubject === subjectValue;
                const matchesSearch = searchValue === '' || 
                                     cardTitle.includes(searchValue) || 
                                     cardAuthor.includes(searchValue);
                
                if (matchesSubject && matchesSearch) {
                    card.style.display = 'block';
                    categoryVisible = true;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show/hide category based on visible cards
            category.style.display = categoryVisible ? 'block' : 'none';
        } else {
            category.style.display = 'none';
        }
    });
}

// Mobile menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}