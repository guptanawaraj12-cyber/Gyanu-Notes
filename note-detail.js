// ==================== NOTE DETAIL PAGE JAVASCRIPT ====================

// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const noteId = urlParams.get('id');

// DOM Elements
const pageTitle = document.getElementById('pageTitle');
const pageDescription = document.getElementById('pageDescription');
const noteTitle = document.getElementById('noteTitle');
const classLink = document.getElementById('classLink');
const noteDetailContent = document.getElementById('noteDetailContent');
const relatedNotesGrid = document.getElementById('relatedNotesGrid');

// Current note data
let currentNote = null;

// Initialize page
function initializePage() {
    if (!noteId) {
        showError('No note specified. Please select a note to view.');
        return;
    }

    // Load note data
    loadNoteDetail();
}

// Load note detail
function loadNoteDetail() {
    if (typeof getNoteById === 'undefined') {
        showError('Notes database not loaded. Please refresh the page.');
        return;
    }

    // Get note by ID
    currentNote = getNoteById(noteId);
    
    if (!currentNote) {
        showError(`Note not found. The note you're looking for doesn't exist.`);
        return;
    }

    // Update page information
    updatePageInfo();

    // Display note content
    displayNoteContent();

    // Load related notes
    loadRelatedNotes();
}

// Update page information
function updatePageInfo() {
    if (!currentNote) return;

    // Update page title
    if (pageTitle) {
        pageTitle.textContent = currentNote.title;
    }

    // Update page description
    if (pageDescription) {
        pageDescription.textContent = currentNote.description;
    }

    // Update breadcrumb
    if (noteTitle) {
        noteTitle.textContent = currentNote.title;
    }

    if (classLink) {
        classLink.textContent = `Class ${currentNote.class}`;
        classLink.href = `class-notes.html?class=${currentNote.class}`;
    }

    // Update document title
    document.title = `${currentNote.title} - Gyanu Note`;
}

// Display note content
function displayNoteContent() {
    if (!noteDetailContent || !currentNote) return;

    // Get subject icon
    const subjectIcon = getSubjectIcon(currentNote.subject);

    // Format date
    const formattedDate = formatDate(currentNote.lastUpdated);

    // Create topics HTML
    const topicsHTML = currentNote.topics && currentNote.topics.length > 0
        ? currentNote.topics.map(topic => `<span class="topic-tag">${topic}</span>`).join('')
        : '';

    // Build the content
    const contentHTML = `
        <div class="note-header-detail" data-aos="fade-up">
            <span class="note-subject-badge" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: var(--primary-gradient); color: var(--white); border-radius: var(--radius-full); font-weight: 600; margin-bottom: 1rem;">
                <i class="${subjectIcon}"></i>
                ${currentNote.subjectName}
            </span>
            <h1>${currentNote.title}</h1>
            <div class="note-meta-detail">
                <span>
                    <i class="fas fa-graduation-cap"></i>
                    Class ${currentNote.class}
                </span>
                <span>
                    <i class="fas fa-calendar"></i>
                    ${formattedDate}
                </span>
                ${currentNote.readTime ? `
                <span>
                    <i class="fas fa-clock"></i>
                    ${currentNote.readTime} min read
                </span>
                ` : ''}
            </div>
            ${topicsHTML ? `
            <div class="note-topics" style="margin-top: 1rem;">
                ${topicsHTML}
            </div>
            ` : ''}
            <p class="note-description-detail">${currentNote.description}</p>
        </div>

        <div class="note-content-detail" data-aos="fade-up">
            ${currentNote.content}
        </div>

        <div class="note-actions-detail" data-aos="fade-up">
            <button onclick="window.print()" class="btn-print">
                <i class="fas fa-print"></i>
                <span>Print Note</span>
            </button>
            <a href="class-notes.html?class=${currentNote.class}" class="btn-back">
                <i class="fas fa-arrow-left"></i>
                <span>Back to Notes</span>
            </a>
        </div>
    `;

    noteDetailContent.innerHTML = contentHTML;
}

// Load related notes
function loadRelatedNotes() {
    if (!relatedNotesGrid || !currentNote) return;

    // Get all notes from the same class and subject
    const classNotes = notesDatabase[currentNote.class];
    if (!classNotes) return;

    const subjectNotes = classNotes[currentNote.subject];
    if (!subjectNotes) return;

    // Filter out current note and get up to 3 related notes
    const relatedNotes = subjectNotes
        .filter(note => note.id !== currentNote.id)
        .slice(0, 3)
        .map(note => ({
            ...note,
            class: currentNote.class,
            subject: currentNote.subject,
            subjectName: currentNote.subjectName
        }));

    // Display related notes
    if (relatedNotes.length === 0) {
        relatedNotesGrid.innerHTML = `
            <p style="text-align: center; color: var(--text-secondary); grid-column: 1 / -1;">
                No related notes available at the moment.
            </p>
        `;
        return;
    }

    relatedNotesGrid.innerHTML = '';
    relatedNotes.forEach((note, index) => {
        const noteCard = createNoteCard(note, index);
        relatedNotesGrid.appendChild(noteCard);
    });
}

// Create note card element
function createNoteCard(note, index) {
    const card = document.createElement('div');
    card.className = 'note-card';
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', index * 100);

    const subjectIcon = getSubjectIcon(note.subject);
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

// Show error message
function showError(message) {
    if (noteDetailContent) {
        noteDetailContent.innerHTML = `
            <div class="error-message" data-aos="fade-up">
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