// ==================== CTEVT NOTES PAGE JAVASCRIPT ====================

// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const program = urlParams.get('program'); // 'ha' or 'pharmacy'
const year = urlParams.get('year'); // '1', '2', or '3'

// DOM Elements
const pageTitle = document.getElementById('pageTitle');
const pageDescription = document.getElementById('pageDescription');
const programName = document.getElementById('programName');
const yearName = document.getElementById('yearName');
const notesGrid = document.getElementById('notesGrid');
const notesCount = document.getElementById('notesCount');
const noNotesFound = document.getElementById('noNotesFound');
const subjectFilter = document.getElementById('subjectFilter');
const sortFilter = document.getElementById('sortFilter');
const searchNotes = document.getElementById('searchNotes');
const otherYearsGrid = document.getElementById('otherYearsGrid');

// Store all notes and filtered notes
let allNotes = [];
let filteredNotes = [];
let currentProgram = null;

// Initialize page
function initializePage() {
    if (!program || !year) {
        showError('Invalid program or year. Please select a valid option.');
        return;
    }

    // Load program data
    loadProgramData();

    // Update page information
    updatePageInfo();

    // Load notes
    loadNotes();

    // Setup event listeners
    setupEventListeners();

    // Load other years
    loadOtherYears();
}

// Load program data
function loadProgramData() {
    if (typeof ctevtDatabase === 'undefined') {
        showError('CTEVT database not loaded. Please refresh the page.');
        return;
    }

    currentProgram = ctevtDatabase[program];
    
    if (!currentProgram) {
        showError(`Program "${program}" not found.`);
        return;
    }
}

// Update page information
function updatePageInfo() {
    if (!currentProgram) return;

    const yearKey = `year${year}`;
    const yearData = currentProgram[yearKey];

    if (!yearData) {
        showError(`Year ${year} not found for this program.`);
        return;
    }

    // Update page title
    if (pageTitle) {
        pageTitle.textContent = `${currentProgram.programName} - ${yearData.yearName}`;
    }

    // Update page description
    if (pageDescription) {
        pageDescription.textContent = `Comprehensive study notes for ${currentProgram.programName} ${yearData.yearName}`;
    }

    // Update breadcrumb
    if (programName) {
        programName.textContent = currentProgram.programName;
    }

    if (yearName) {
        yearName.textContent = yearData.yearName;
    }

    // Update document title
    document.title = `${currentProgram.programName} ${yearData.yearName} Notes - Gyanu Note`;
}

// Load notes
function loadNotes() {
    if (!currentProgram) return;

    const yearKey = `year${year}`;
    const yearData = currentProgram[yearKey];

    if (!yearData || !yearData.subjects) {
        showError(`No notes available for ${currentProgram.programName} ${yearData.yearName} yet.`);
        return;
    }

    // Flatten all notes from all subjects
    allNotes = [];
    for (const subjectKey in yearData.subjects) {
        const subjectNotes = yearData.subjects[subjectKey];
        const subjectDisplayName = getSubjectDisplayName(subjectKey);
        
        subjectNotes.forEach(note => {
            allNotes.push({
                ...note,
                subject: subjectKey,
                subjectName: subjectDisplayName,
                program: program,
                year: year
            });
        });
    }

    // Populate subject filter
    populateSubjectFilter();

    // Initial display
    filteredNotes = [...allNotes];
    displayNotes(filteredNotes);
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
        option.textContent = getSubjectDisplayName(subject);
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
        physics: 'fas fa-atom',
        chemistry: 'fas fa-flask',
        zoology: 'fas fa-frog',
        botany: 'fas fa-leaf',
        anatomy: 'fas fa-user-injured',
        mathematics: 'fas fa-calculator',
        medicine1: 'fas fa-stethoscope',
        medicine2: 'fas fa-stethoscope',
        surgery1: 'fas fa-procedures',
        surgery2: 'fas fa-procedures',
        pathology: 'fas fa-vial',
        obstetrics: 'fas fa-baby',
        procedures: 'fas fa-first-aid',
        pharmacology: 'fas fa-pills',
        environmental: 'fas fa-tree',
        healthedu: 'fas fa-book-medical',
        primarycare: 'fas fa-home',
        management: 'fas fa-hospital',
        epidemiology: 'fas fa-chart-line',
        clinical: 'fas fa-clinic-medical',
        community: 'fas fa-users',
        pharmacognosy: 'fas fa-seedling',
        biochemistry: 'fas fa-dna',
        therapeutics: 'fas fa-capsules',
        pharmaceutics: 'fas fa-mortar-pestle',
        hospital: 'fas fa-hospital-alt',
        forensic: 'fas fa-balance-scale',
        healthcare: 'fas fa-medkit',
        practice: 'fas fa-briefcase-medical'
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

// Load other years
function loadOtherYears() {
    if (!otherYearsGrid || !currentProgram) return;

    otherYearsGrid.innerHTML = '';

    // Get all years for this program
    const years = [1, 2, 3];
    
    years.forEach((yearNum, index) => {
        if (yearNum.toString() === year) return; // Skip current year

        const yearKey = `year${yearNum}`;
        const yearData = currentProgram[yearKey];

        if (!yearData) return;

        // Count subjects
        const subjectsCount = Object.keys(yearData.subjects).length;

        const yearCard = document.createElement('a');
        yearCard.href = `ctevt-notes.html?program=${program}&year=${yearNum}`;
        yearCard.className = 'related-class-link';
        yearCard.setAttribute('data-aos', 'fade-up');
        yearCard.setAttribute('data-aos-delay', index * 100);

        yearCard.innerHTML = `
            <div class="related-class-card">
                <div class="related-class-icon">${yearNum}</div>
                <h4>${yearData.yearName}</h4>
                <p>${subjectsCount} Subjects</p>
            </div>
        `;

        otherYearsGrid.appendChild(yearCard);
    });

    // If no other years, hide the section
    if (otherYearsGrid.children.length === 0) {
        const section = document.querySelector('.related-classes-section');
        if (section) {
            section.style.display = 'none';
        }
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
                    <span>Back to Programs</span>
                </a>
            </div>
        `;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);