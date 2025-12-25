// ==================== CLASS NOTES PAGE JAVASCRIPT ====================

// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const classNumber = urlParams.get('class');

// DOM Elements
const pageTitle = document.getElementById('pageTitle');
const pageDescription = document.getElementById('pageDescription');
const className = document.getElementById('className');
const notesGrid = document.getElementById('notesGrid');
const notesCount = document.getElementById('notesCount');
const noNotesFound = document.getElementById('noNotesFound');
const subjectFilter = document.getElementById('subjectFilter');
const sortFilter = document.getElementById('sortFilter');
const searchNotes = document.getElementById('searchNotes');
const ctaBooksLink = document.getElementById('ctaBooksLink');

// Store all notes and filtered notes
let allNotes = [];
let filteredNotes = [];

// Initialize page
function initializePage() {
    if (!classNumber) {
        showError('No class specified. Please select a class.');
        return;
    }

    // Update page title and breadcrumb
    updatePageInfo();

    // Load notes for the class
    loadNotes();

    // Setup event listeners
    setupEventListeners();

    // Update CTA link
    if (ctaBooksLink) {
        ctaBooksLink.href = `class-books.html?class=${classNumber}`;
    }
}

// Update page information
function updatePageInfo() {
    const classInfo = getClassInfo(classNumber);
    
    if (pageTitle) {
        pageTitle.textContent = `Class ${classNumber} Notes`;
    }
    
    if (pageDescription) {
        pageDescription.textContent = classInfo.description;
    }
    
    if (className) {
        className.textContent = `Class ${classNumber}`;
    }

    // Update page title
    document.title = `Class ${classNumber} Notes - Gyanu Note`;
}

// Get class information
function getClassInfo(classNum) {
    const classInfoMap = {
        '8': { description: 'Comprehensive study notes for Class 8' },
        '9': { description: 'Detailed notes for all Class 9 subjects' },
        '10': { description: 'Complete SEE preparation notes' },
        '11': { description: 'NEB curriculum notes for Class 11' },
        '12': { description: 'Board exam preparation notes for Class 12' }
    };
    
    return classInfoMap[classNum] || { description: 'Study notes for all subjects' };
}

// Load notes from database
function loadNotes() {
    if (typeof notesDatabase === 'undefined') {
        showError('Notes database not loaded. Please refresh the page.');
        return;
    }

    // Get notes for the class
    const classNotes = notesDatabase[classNumber];
    
    if (!classNotes) {
        showError(`No notes available for Class ${classNumber} yet.`);
        return;
    }

    // Flatten all notes from all subjects
    allNotes = [];
    for (const subject in classNotes) {
        const subjectNotes = classNotes[subject];
        subjectNotes.forEach(note => {
            allNotes.push({
                ...note,
                subject: subject,
                subjectName: getSubjectName(subject),
                class: classNumber
            });
        });
    }

    // Populate subject filter
    populateSubjectFilter();

    // Initial display
    filteredNotes = [...allNotes];
    displayNotes(filteredNotes);
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
    const subjects = [...new Set(allNotes.map(note => note.subject))];
    
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

// Display notes
function displayNotes(notes) {
    if (!notesGrid) return;

    // Update count
    if (notesCount) {
        notesCount.textContent = notes.length;
    }

    // Clear grid
    notesGrid.innerHTML = '';

    // Show/hide no results message
    if (notes.length === 0) {
        if (noNotesFound) {
            noNotesFound.style.display = 'block';
        }
        return;
    } else {
        if (noNotesFound) {
            noNotesFound.style.display = 'none';
        }
    }

    // Display each note
    notes.forEach((note, index) => {
        const noteCard = createNoteCard(note, index);
        notesGrid.appendChild(noteCard);
    });
}

// Create note card element
function createNoteCard(note, index) {
    const card = document.createElement('div');
    card.className = 'note-card';
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', (index % 6) * 100);

    // Get subject icon
    const subjectIcon = getSubjectIcon(note.subject);

    // Format topics
    const topicsHTML = note.topics && note.topics.length > 0 
        ? note.topics.slice(0, 3).map(topic => `<span class="topic-tag">${topic}</span>`).join('')
        : '';

    card.innerHTML = `
        <div class="note-header">
            <span class="note-subject-badge">
                <i class="${subjectIcon}"></i>
                ${note.subjectName}
            </span>
        </div>
        <div class="note-content">
            <h3>${note.title}</h3>
            <p class="note-description">${note.description}</p>
            ${topicsHTML ? `<div class="note-topics">${topicsHTML}</div>` : ''}
            <div class="note-meta">
                <div class="note-meta-item">
                    <i class="fas fa-calendar"></i>
                    <span>${formatDate(note.lastUpdated)}</span>
                </div>
                ${note.readTime ? `
                <div class="note-meta-item">
                    <i class="fas fa-clock"></i>
                    <span>${note.readTime} min</span>
                </div>
                ` : ''}
            </div>
            <div class="note-actions">
                <a href="${note.viewLink}" class="btn-view-note">
                    <i class="fas fa-eye"></i>
                    <span>View Note</span>
                </a>
            </div>
        </div>
    `;

    return card;
}

// Get subject icon
function getSubjectIcon(subject) {
    const icons = {
        science: 'fas fa-flask',
        math: 'fas fa-calculator',
        english: 'fas fa-book',
        nepali: 'fas fa-language',
        social: 'fas fa-globe',
        computer: 'fas fa-laptop-code',
        physics: 'fas fa-atom',
        chemistry: 'fas fa-vial',
        biology: 'fas fa-dna',
        economics: 'fas fa-chart-line',
        accountancy: 'fas fa-file-invoice-dollar'
    };
    
    return icons[subject] || 'fas fa-book';
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Setup event listeners
function setupEventListeners() {
    // Subject filter
    if (subjectFilter) {
        subjectFilter.addEventListener('change', applyFilters);
    }

    // Sort filter
    if (sortFilter) {
        sortFilter.addEventListener('change', applyFilters);
    }

    // Search
    if (searchNotes) {
        searchNotes.addEventListener('input', applyFilters);
    }
}

// Apply filters
function applyFilters() {
    const selectedSubject = subjectFilter ? subjectFilter.value : 'all';
    const selectedSort = sortFilter ? sortFilter.value : 'newest';
    const searchQuery = searchNotes ? searchNotes.value.toLowerCase().trim() : '';

    // Filter notes
    filteredNotes = allNotes.filter(note => {
        // Subject filter
        if (selectedSubject !== 'all' && note.subject !== selectedSubject) {
            return false;
        }

        // Search filter
        if (searchQuery) {
            const searchableText = `${note.title} ${note.description} ${note.subjectName} ${note.topics ? note.topics.join(' ') : ''}`.toLowerCase();
            if (!searchableText.includes(searchQuery)) {
                return false;
            }
        }

        return true;
    });

    // Sort notes
    sortNotes(filteredNotes, selectedSort);

    // Display filtered notes
    displayNotes(filteredNotes);
}

// Sort notes
function sortNotes(notes, sortType) {
    switch (sortType) {
        case 'newest':
            notes.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
            break;
        case 'oldest':
            notes.sort((a, b) => new Date(a.lastUpdated) - new Date(b.lastUpdated));
            break;
        case 'title':
            notes.sort((a, b) => a.title.localeCompare(b.title));
            break;
    }
}

// Show error message
function showError(message) {
    if (notesGrid) {
        notesGrid.innerHTML = `
            <div class="error-message" style="grid-column: 1 / -1;">
                <i class="fas fa-exclamation-triangle"></i>
                <h2>Oops!</h2>
                <p>${message}</p>
                <a href="index.html#classes" class="btn-cta-primary" style="display: inline-flex; margin-top: 1rem;">
                    <i class="fas fa-arrow-left"></i>
                    <span>Back to Classes</span>
                </a>
            </div>
        `;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);