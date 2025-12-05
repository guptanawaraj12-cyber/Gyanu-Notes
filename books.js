// ==================== BOOKS PAGE JAVASCRIPT ====================
// This file handles filtering and displaying books from books-data.js

// Get filter elements
const bookClassFilter = document.getElementById('bookClassFilter');
const bookSubjectFilter = document.getElementById('bookSubjectFilter');
const bookSearch = document.getElementById('bookSearch');

// Function to display books on page load
function displayAllBooks() {
    const container = document.querySelector('.books-section .container');
    
    // Clear existing content except filters
    const filterSection = document.querySelector('.books-filter');
    container.innerHTML = '';
    container.appendChild(filterSection);
    
    // Display books by class
    displayBooksByClass('11', 'Class 11 Books');
    displayBooksByClass('12', 'Class 12 Books');
    displayBooksByClass('bachelor', "Bachelor's Level Books");
    displayBooksByClass('master', "Master's Level Books");
}

// Function to display books for a specific class
function displayBooksByClass(classLevel, title) {
    const container = document.querySelector('.books-section .container');
    
    // Create category section
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'books-category';
    categoryDiv.setAttribute('data-class', classLevel);
    
    // Add category title
    const categoryTitle = document.createElement('h2');
    categoryTitle.className = 'category-title';
    categoryTitle.textContent = title;
    categoryDiv.appendChild(categoryTitle);
    
    // Get books for this class
    let classBooks;
    if (classLevel === '11') {
        classBooks = booksDatabase.class11;
    } else if (classLevel === '12') {
        classBooks = booksDatabase.class12;
    } else if (classLevel === 'bachelor') {
        classBooks = booksDatabase.bachelor;
    } else if (classLevel === 'master') {
        classBooks = booksDatabase.master;
    }
    
    // Display books by subject
    if (classBooks) {
        Object.keys(classBooks).forEach(subject => {
            const books = classBooks[subject];
            
            if (books && books.length > 0) {
                // Add subject heading
                const subjectHeading = document.createElement('h3');
                subjectHeading.className = 'subject-heading';
                subjectHeading.textContent = capitalizeFirst(subject);
                categoryDiv.appendChild(subjectHeading);
                
                // Create books grid
                const booksGrid = document.createElement('div');
                booksGrid.className = 'books-grid';
                
                // Add each book
                books.forEach(book => {
                    const bookCard = createBookCard(book);
                    booksGrid.appendChild(bookCard);
                });
                
                categoryDiv.appendChild(booksGrid);
            }
        });
    }
    
    container.appendChild(categoryDiv);
}

// Function to create a book card
// Function to create a book card
function createBookCard(book) {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.setAttribute('data-subject', book.subject);
    card.setAttribute('data-class', book.class);
    
    // Create gradient colors based on subject
    const gradients = {
        physics: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        chemistry: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        biology: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        mathematics: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        computer: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        accountancy: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
        economics: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        business: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        english: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    };
    
    const gradient = gradients[book.subject] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    
    card.innerHTML = `
        <div class="book-image" style="background: ${gradient};">
            <i class="fas fa-book"></i>
        </div>
        <div class="book-info">
            <h4>${book.title}</h4>
            <p class="author"><i class="fas fa-user"></i> ${book.author}</p>
            <p class="publisher"><i class="fas fa-building"></i> ${book.publisher}</p>
            <div class="book-meta">
                <span class="badge-subject">${capitalizeFirst(book.subject)}</span>
                <span class="badge-class">${book.class === 'bachelor' ? "Bachelor's" : book.class === 'master' ? "Master's" : 'Class ' + book.class}</span>
            </div>
            <p class="description">${book.description}</p>
            ${book.isbn ? `<p class="isbn"><strong>ISBN:</strong> ${book.isbn}</p>` : ''}
            ${book.pages ? `<p class="pages"><strong>Pages:</strong> ${book.pages}</p>` : ''}
            <div class="book-links">
                <a href="${book.downloadLink}" class="btn-book"><i class="fas fa-download"></i> Download</a>
                <a href="${book.previewLink}" class="btn-book-secondary"><i class="fas fa-eye"></i> Preview</a>
            </div>
        </div>
    `;
    
    return card;
}

// Helper function to capitalize first letter
function capitalizeFirst(str) {
    const words = {
        'physics': 'Physics',
        'chemistry': 'Chemistry',
        'biology': 'Biology',
        'mathematics': 'Mathematics',
        'computer': 'Computer Science',
        'accountancy': 'Accountancy',
        'economics': 'Economics',
        'business': 'Business Studies',
        'english': 'English'
    };
    return words[str] || str.charAt(0).toUpperCase() + str.slice(1);
}

// Filter books function
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
                const cardDescription = card.querySelector('.description').textContent.toLowerCase();
                
                // Check all filters
                const matchesSubject = subjectValue === 'all' || cardSubject === subjectValue;
                const matchesSearch = searchValue === '' || 
                                     cardTitle.includes(searchValue) || 
                                     cardAuthor.includes(searchValue) ||
                                     cardDescription.includes(searchValue);
                
                if (matchesSubject && matchesSearch) {
                    card.style.display = 'flex';
                    categoryVisible = true;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show/hide subject headings
            const subjectHeadings = category.querySelectorAll('.subject-heading');
            subjectHeadings.forEach(heading => {
                const nextGrid = heading.nextElementSibling;
                if (nextGrid && nextGrid.classList.contains('books-grid')) {
                    const visibleCards = nextGrid.querySelectorAll('.book-card[style="display: flex;"], .book-card:not([style*="display"])');
                    if (visibleCards.length === 0) {
                        heading.style.display = 'none';
                        nextGrid.style.display = 'none';
                    } else {
                        heading.style.display = 'block';
                        nextGrid.style.display = 'grid';
                    }
                }
            });
            
            // Show/hide category based on visible cards
            category.style.display = categoryVisible ? 'block' : 'none';
        } else {
            category.style.display = 'none';
        }
    });
}

// Event listeners for filters
if (bookClassFilter) {
    bookClassFilter.addEventListener('change', filterBooks);
}

if (bookSubjectFilter) {
    bookSubjectFilter.addEventListener('change', filterBooks);
}

if (bookSearch) {
    bookSearch.addEventListener('input', filterBooks);
}

// Display books on page load
document.addEventListener('DOMContentLoaded', function() {
    displayAllBooks();
});

// Mobile menu (if needed)
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}