// Use the centralized notes database
const noteDetailsDatabase = {};

// Flatten all notes into single object with IDs as keys
Object.values(notesDatabase).forEach(subjectNotes => {
    subjectNotes.forEach(note => {
        noteDetailsDatabase[note.id] = note;
    });
});

// Rest of your note-detail.js code remains the same...
// Get note ID from URL
const urlParams = new URLSearchParams(window.location.search);
const noteId = parseInt(urlParams.get('id'));
const subject = urlParams.get('subject');
const classLevel = urlParams.get('class');

// Class names mapping
const classNames = {
    '11': 'Class 11',
    '12': 'Class 12',
    'bachelor': "Bachelor's Level",
    'master': "Master's Level"
};

// Load note details
function loadNoteDetail() {
    const note = noteDetailsDatabase[noteId];
    
    if (!note) {
        document.getElementById('noteTitle').textContent = 'Note Not Found';
        document.getElementById('noteContent').innerHTML = '<p>Sorry, this note could not be found. <a href="index.html">Go back to home</a></p>';
        return;
    }

    // Update page content
    document.getElementById('noteTitle').textContent = note.title;
    document.getElementById('noteClass').textContent = `📚 ${classNames[note.class]}`;
    document.getElementById('noteDate').textContent = `📅 ${formatDate(note.date)}`;
    document.getElementById('noteViews').textContent = `👁️ ${note.views} views`;
    document.getElementById('noteCategory').textContent = `📂 ${note.category}`;
    document.getElementById('noteContent').innerHTML = note.content;
    
    // Update breadcrumb
    document.getElementById('breadcrumbClass').textContent = classNames[note.class];
    document.getElementById('breadcrumbClass').href = `class.html?class=${note.class}`;
    document.getElementById('breadcrumbSubject').textContent = note.category;
    document.getElementById('breadcrumbSubject').href = `notes.html?subject=${note.subject}&class=${note.class}`;
    document.getElementById('breadcrumbNote').textContent = note.title;
    
    // Load tags
    const tagsContainer = document.getElementById('noteTags');
    tagsContainer.innerHTML = note.tags.map(tag => 
        `<span class="tag">#${tag}</span>`
    ).join('');
    
    // Update page title
    document.title = `${note.title} - Gyanu Note`;
    
    // Load related notes
    loadRelatedNotes(note.subject, note.class, noteId);
    
    // Increment view count
    note.views++;
    document.getElementById('noteViews').textContent = `👁️ ${note.views} views`;
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Load related notes from same class and subject
function loadRelatedNotes(subject, classLevel, currentNoteId) {
    const relatedContainer = document.getElementById('relatedNotes');
    
    // Get notes from same subject and class
    const related = Object.entries(noteDetailsDatabase)
        .filter(([id, note]) => 
            note.subject === subject && 
            note.class === classLevel && 
            parseInt(id) !== currentNoteId
        )
        .slice(0, 3)
        .map(([id, note]) => ({ id, ...note }));
    
    if (related.length === 0) {
        relatedContainer.innerHTML = '<p style="color: #64748b;">No related notes found.</p>';
        return;
    }
    
    relatedContainer.innerHTML = related.map(note => `
        <div class="note-card">
            <div class="note-card-header">
                <h3>${note.title}</h3>
            </div>
            <div class="note-card-body">
                <p style="font-size: 0.9rem; color: #64748b; margin-bottom: 1rem;">
                    ${note.description || note.title}
                </p>
                <a href="note-detail.html?id=${note.id}&subject=${subject}&class=${classLevel}" class="btn">Read More</a>
            </div>
        </div>
    `).join('');
}

// Download PDF functionality
document.getElementById('downloadBtn').addEventListener('click', () => {
    alert('PDF download functionality: You can integrate libraries like jsPDF or html2pdf.js to generate PDFs from the note content.');
});

// Share functionality
document.getElementById('shareBtn').addEventListener('click', () => {
    const title = document.getElementById('noteTitle').textContent;
    const url = window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: title,
            text: `Check out this note: ${title}`,
            url: url
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback - copy to clipboard
        navigator.clipboard.writeText(url).then(() => {
            alert('Link copied to clipboard!');
        });
    }
});

// Bookmark functionality
document.getElementById('bookmarkBtn').addEventListener('click', function() {
    const noteId = urlParams.get('id');
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    
    if (bookmarks.includes(noteId)) {
        bookmarks = bookmarks.filter(id => id !== noteId);
        this.textContent = '⭐ Bookmark';
        alert('Removed from bookmarks');
    } else {
        bookmarks.push(noteId);
        this.textContent = '⭐ Bookmarked';
        alert('Added to bookmarks');
    }
    
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
});

// Check if already bookmarked
function checkBookmark() {
    const noteId = urlParams.get('id');
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    
    if (bookmarks.includes(noteId)) {
        document.getElementById('bookmarkBtn').textContent = '⭐ Bookmarked';
    }
}

// Mobile menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadNoteDetail();
    checkBookmark();
});
// PDF Download using html2pdf.js
document.getElementById('downloadBtn').addEventListener('click', function() {
    const noteTitle = document.getElementById('noteTitle').textContent;
    const noteContent = document.getElementById('noteContent');

    // Show loading
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
    this.disabled = true;

    // Create a clean version for PDF
    const printContent = document.createElement('div');
    printContent.innerHTML = `
        <div style="padding: 20px; font-family: Arial, sans-serif;">
            <h1 style="color: #2563eb; margin-bottom: 20px;">${noteTitle}</h1>
            <div style="border-top: 3px solid #2563eb; padding-top: 20px;">
                ${noteContent.innerHTML}
            </div>
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ccc; text-align: center; color: #666;">
                <p>Downloaded from Gyanu Note - www.nawarajgupta.com.np</p>
            </div>
        </div>
    `;

    // PDF options
    const opt = {
        margin: 10,
        filename: `${noteTitle.replace(/[^a-z0-9]/gi, '_')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Generate PDF
    html2pdf().set(opt).from(printContent).save().then(() => {
        this.innerHTML = '<i class="fas fa-download"></i> Download PDF';
        this.disabled = false;
    });
});
