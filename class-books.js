// ==================== CLASS BOOKS PAGE JAVASCRIPT ====================

// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const classNumber = urlParams.get('class');

// DOM Elements
const pageTitle = document.getElementById('pageTitle');
const pageDescription = document.getElementById('pageDescription');
const className = document.getElementById('className');
const booksGrid = document.getElementById('booksGrid');
const booksCount = document.getElementById('booksCount');
const noBooksFound = document.getElementById('noBooksFound');
const subjectFilter = document.getElementById('subjectFilter');
const typeFilter = document.getElementById('typeFilter');
const searchBooks = document.getElementById('searchBooks');
const ctaNotesLink = document.getElementById('ctaNotesLink');

// Store all books and filtered books
let allBooks = [];
let filteredBooks = [];

// Initialize page
function initializePage() {
    if (!classNumber) {
        showError('No class specified. Please select a class.');
        return;
    }

    // Update page title and breadcrumb
    updatePageInfo();

    // Load books for the class
    loadBooks();

    // Setup event listeners
    setupEventListeners();

    // Update CTA link
    if (ctaNotesLink) {
        ctaNotesLink.href = `class-notes.html?class=${classNumber}`;
    }
}

// Update page information
function updatePageInfo() {
    const classInfo = getClassInfo(classNumber);
    
    if (pageTitle) {
        pageTitle.textContent = `Class ${classNumber} Books`;
    }
    
    if (pageDescription) {
        pageDescription.textContent = classInfo.description;
    }
    
    if (className) {
        className.textContent = `Class ${classNumber}`;
    }

    // Update page title
    document.title = `Class ${classNumber} Books - Gyanu Note`;
}

// Get class information
function getClassInfo(classNum) {
    const classInfoMap = {
        '8': { description: 'Textbooks and guide books for Class 8' },
        '9': { description: 'Comprehensive study materials for Class 9' },
        '10': { description: 'Complete SEE preparation materials' },
        '11': { description: 'NEB curriculum textbooks and guides' },
        '12': { description: 'Complete board exam preparation materials' }
    };
    
    return classInfoMap[classNum] || { description: 'Books for all subjects' };
}

// Load books from database
function loadBooks() {
    if (typeof booksDatabase === 'undefined') {
        showError('Books database not loaded. Please refresh the page.');
        return;
    }

    // Get books for the class
    const classBooks = booksDatabase[classNumber];
    
    if (!classBooks) {
        showError(`No books available for Class ${classNumber} yet.`);
        return;
    }

    // Flatten all books from all subjects
    allBooks = [];
    for (const subject in classBooks) {
        const subjectBooks = classBooks[subject];
        subjectBooks.forEach(book => {
            allBooks.push({
                ...book,
                subject: subject,
                subjectName: getSubjectName(subject),
                class: classNumber
            });
        });
    }

    // Populate subject filter
    populateSubjectFilter();

    // Initial display
    filteredBooks = [...allBooks];
    displayBooks(filteredBooks);
}

// Get subject display name
function getSubjectName(subject) {
    const subjectNames = {
        science: 'Science',
        math: 'Mathematics',
        english: 'English',
        nepali: 'Nepali',
        social: 'Social Studies',
        computer: 'Computer',
        physics: 'Physics',
        chemistry: 'Chemistry',
        biology: 'Biology',
        economics: 'Economics',
        accountancy: 'Accountancy'
    };
    
    return subjectNames[subject] || subject;
}

// Populate subject filter dropdown
function populateSubjectFilter() {
    if (!subjectFilter) return;

    // Get unique subjects
    const subjects = [...new Set(allBooks.map(book => book.subject))];
    
    // Clear existing options (except "All Subjects")
    subjectFilter.innerHTML = '<option value="all">All Subjects</option>';
    
    // Add subject options
    subjects.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject;
        option.textContent = getSubjectName(subject);
        subjectFilter.appendChild(option);
    });
}

// Display books
function displayBooks(books) {
    if (!booksGrid) return;

    // Update count
    if (booksCount) {
        booksCount.textContent = books.length;
    }

    // Clear grid
    booksGrid.innerHTML = '';

    // Show/hide no results message
    if (books.length === 0) {
        if (noBooksFound) {
            noBooksFound.style.display = 'block';
        }
        return;
    } else {
        if (noBooksFound) {
            noBooksFound.style.display = 'none';
        }
    }

    // Display each book
    books.forEach((book, index) => {
        const bookCard = createBookCard(book, index);
        booksGrid.appendChild(bookCard);
    });
}

// Create book card element
function createBookCard(book, index) {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', (index % 6) * 100);

    const typeBadgeClass = book.type === 'guide' ? 'guide' : '';
    const typeText = book.type === 'textbook' ? 'Textbook' : book.type === 'guide' ? 'Guide Book' : 'Reference';

    card.innerHTML = `
        <div class="book-cover">
            <img src="${book.coverImage || 'images/books/default-book.jpg'}" alt="${book.title}" onerror="this.src='images/books/default-book.jpg'">
            <div class="book-type-badge ${typeBadgeClass}">${typeText}</div>
        </div>
        <div class="book-info">
            <span class="book-subject">${book.subjectName}</span>
            <h3>${book.title}</h3>
            ${book.author ? `<p class="book-author"><i class="fas fa-user"></i> ${book.author}</p>` : ''}
            <div class="book-meta">
                <div class="book-meta-item">
                    <i class="fas fa-file-pdf"></i>
                    <span>PDF</span>
                </div>
                ${book.pages ? `
                <div class="book-meta-item">
                    <i class="fas fa-file-alt"></i>
                    <span>${book.pages} pages</span>
                </div>
                ` : ''}
            </div>
            <div class="book-actions">
                <a href="${book.downloadLink}" target="_blank" class="btn-download-book" onclick="trackDownload('${book.id}', '${book.title}')">
                    <i class="fas fa-download"></i>
                    <span>Download</span>
                </a>
                ${book.previewLink ? `
                <a href="${book.previewLink}" target="_blank" class="btn-view-book">
                    <i class="fas fa-eye"></i>
                    <span>Preview</span>
                </a>
                ` : ''}
            </div>
        </div>
    `;

    return card;
}

// Setup event listeners
function setupEventListeners() {
    // Subject filter
    if (subjectFilter) {
        subjectFilter.addEventListener('change', applyFilters);
    }

    // Type filter
    if (typeFilter) {
        typeFilter.addEventListener('change', applyFilters);
    }

    // Search
    if (searchBooks) {
        searchBooks.addEventListener('input', applyFilters);
    }
}

// Apply filters
function applyFilters() {
    const selectedSubject = subjectFilter ? subjectFilter.value : 'all';
    const selectedType = typeFilter ? typeFilter.value : 'all';
    const searchQuery = searchBooks ? searchBooks.value.toLowerCase().trim() : '';

    filteredBooks = allBooks.filter(book => {
        // Subject filter
        if (selectedSubject !== 'all' && book.subject !== selectedSubject) {
            return false;
        }

        // Type filter
        if (selectedType !== 'all' && book.type !== selectedType) {
            return false;
        }

        // Search filter
        if (searchQuery) {
            const searchableText = `${book.title} ${book.author || ''} ${book.subjectName}`.toLowerCase();
            if (!searchableText.includes(searchQuery)) {
                return false;
            }
        }

        return true;
    });

    displayBooks(filteredBooks);
}

// Track download (for analytics)
function trackDownload(bookId, bookTitle) {
    console.log(`Download tracked: ${bookTitle} (${bookId})`);
    // You can add analytics tracking here
}

// Show error message
function showError(message) {
    if (booksGrid) {
        booksGrid.innerHTML = `
            <div class="error-message" style="grid-column: 1 / -1;">
                <i class="fas fa-exclamation-triangle"></i>
                <h2>Oops!</h2>
                <p>${message}</p>
                <a href="books.html" class="btn-cta-primary" style="display: inline-flex; margin-top: 1rem;">
                    <i class="fas fa-arrow-left"></i>
                    <span>Back to Books</span>
                </a>
            </div>
        `;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);