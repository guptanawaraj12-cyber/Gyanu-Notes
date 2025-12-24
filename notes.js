// ==================== NOTES PAGE FUNCTIONALITY ====================

let currentNoteData = {};

document.addEventListener('DOMContentLoaded', function() {
    initializeNotesPage();
});

function initializeNotesPage() {
    setupSmartSearch();
    setupFilters();
    animateNoteCards();
    checkURLParams();
}

// ==================== SMART SEARCH FUNCTIONALITY ====================
function setupSmartSearch() {
    const searchInput = document.getElementById('searchInput');
    const clearSearch = document.getElementById('clearSearch');
    
    if (!searchInput) return;

    // Real-time search
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        if (searchTerm.length > 0) {
            clearSearch.style.display = 'block';
            performSmartSearch(searchTerm);
        } else {
            clearSearch.style.display = 'none';
            resetSearch();
        }
    });

    // Clear search button
    if (clearSearch) {
        clearSearch.addEventListener('click', function() {
            searchInput.value = '';
            this.style.display = 'none';
            resetSearch();
            searchInput.focus();
        });
    }
}

function performSmartSearch(searchTerm) {
    const noteCards = document.querySelectorAll('.note-card');
    const classGroups = document.querySelectorAll('.class-group');
    const searchResultsInfo = document.getElementById('searchResultsInfo');
    const noResults = document.getElementById('noResults');
    let visibleCount = 0;

    // Hide all class groups first
    classGroups.forEach(group => {
        group.style.display = 'none';
    });

    // Search through all note cards
    noteCards.forEach(card => {
        const subject = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        const keywords = card.getAttribute('data-keywords').toLowerCase();
        const classGroup = card.closest('.class-group');
        const classNumber = classGroup.getAttribute('data-class');
        const className = `class ${classNumber}`;
        
        // Smart matching
        const matchesSubject = subject.includes(searchTerm);
        const matchesDescription = description.includes(searchTerm);
        const matchesKeywords = keywords.includes(searchTerm);
        const matchesClass = className.includes(searchTerm) || classNumber === searchTerm;
        
        // Check for "class 10" type searches
        const classMatch = searchTerm.match(/class\s*(\d+)/i);
        const matchesClassSearch = classMatch && classMatch[1] === classNumber;

        if (matchesSubject || matchesDescription || matchesKeywords || matchesClass || matchesClassSearch) {
            card.style.display = 'block';
            classGroup.style.display = 'block';
            visibleCount++;
            
            // Highlight animation
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = 'highlightCard 0.6s ease';
            }, 10);
        } else {
            card.style.display = 'none';
        }
    });

    // Show/hide empty class groups
    classGroups.forEach(group => {
        const visibleCards = group.querySelectorAll('.note-card[style*="display: block"]');
        if (visibleCards.length === 0) {
            group.style.display = 'none';
        }
    });

    // Update search results info
    if (visibleCount > 0) {
        searchResultsInfo.style.display = 'block';
        document.getElementById('resultsCount').textContent = visibleCount;
        noResults.style.display = 'none';
    } else {
        searchResultsInfo.style.display = 'none';
        noResults.style.display = 'block';
    }

    // Scroll to results
    const notesSection = document.querySelector('.notes-section');
    if (notesSection && visibleCount > 0) {
        notesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function resetSearch() {
    const noteCards = document.querySelectorAll('.note-card');
    const classGroups = document.querySelectorAll('.class-group');
    const searchResultsInfo = document.getElementById('searchResultsInfo');
    const noResults = document.getElementById('noResults');

    // Show all cards and groups
    noteCards.forEach(card => {
        card.style.display = 'block';
        card.style.animation = 'none';
    });

    classGroups.forEach(group => {
        group.style.display = 'block';
    });

    searchResultsInfo.style.display = 'none';
    noResults.style.display = 'none';

    // Reset filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector('.filter-btn[data-class="all"]').classList.add('active');
}

// ==================== FILTER FUNCTIONALITY ====================
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Clear search when using filters
            const searchInput = document.getElementById('searchInput');
            const clearSearch = document.getElementById('clearSearch');
            if (searchInput) {
                searchInput.value = '';
                clearSearch.style.display = 'none';
            }

            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get selected class
            const selectedClass = this.getAttribute('data-class');
            filterByClass(selectedClass);
        });
    });
}

function filterByClass(classNumber) {
    const classGroups = document.querySelectorAll('.class-group');
    const searchResultsInfo = document.getElementById('searchResultsInfo');
    const noResults = document.getElementById('noResults');
    
    searchResultsInfo.style.display = 'none';
    noResults.style.display = 'none';

    classGroups.forEach(group => {
        const groupClass = group.getAttribute('data-class');
        
        if (classNumber === 'all' || groupClass === classNumber) {
            group.style.display = 'block';
            // Animate cards
            const cards = group.querySelectorAll('.note-card');
            cards.forEach((card, index) => {
                card.style.display = 'block';
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 50);
            });
        } else {
            group.style.display = 'none';
        }
    });

    // Scroll to notes section
    const notesSection = document.querySelector('.notes-section');
    if (notesSection) {
        notesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ==================== CHECK URL PARAMETERS ====================
function checkURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const classParam = urlParams.get('class');
    
    if (classParam) {
        // Activate the corresponding filter button
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            if (btn.getAttribute('data-class') === classParam) {
                btn.click();
            }
        });
    }
}

// ==================== NOTE READER FUNCTIONALITY ====================
function openNoteReader(className, subject, noteId) {
    const modal = document.getElementById('noteReaderModal');
    const readerTitle = document.getElementById('readerTitle');
    const readerSubtitle = document.getElementById('readerSubtitle');
    const readerBody = document.getElementById('readerBody');

    // Store current note data
    currentNoteData = {
        className: className,
        subject: subject,
        noteId: noteId
    };

    // Set title
    readerTitle.textContent = subject;
    readerSubtitle.textContent = className;

    // Load note content
    loadNoteContent(noteId, readerBody);

    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Add animation
    const content = modal.querySelector('.note-reader-content');
    content.style.animation = 'slideUp 0.4s ease';
}

function closeNoteReader() {
    const modal = document.getElementById('noteReaderModal');
    const content = modal.querySelector('.note-reader-content');
    
    content.style.animation = 'slideDown 0.3s ease';
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Close modal on outside click
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('noteReaderModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeNoteReader();
            }
        });
    }
});

// Close modal on ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('noteReaderModal');
        if (modal && modal.style.display === 'flex') {
            closeNoteReader();
        }
    }
});

// ==================== LOAD NOTE CONTENT ====================
function loadNoteContent(noteId, container) {
    // Show loading
    container.innerHTML = `
        <div class="loading-content">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading notes...</p>
        </div>
    `;

    // Simulate loading (replace with actual content loading)
    setTimeout(() => {
        container.innerHTML = generateNoteContent(noteId);
        
        // Add smooth scroll to sections
        const tocLinks = container.querySelectorAll('.toc-link');
        tocLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }, 800);
}

function generateNoteContent(noteId) {
    // This is sample content. Replace with actual note content from your database/files
    return `
        <div class="note-content">
            <div class="table-of-contents">
                <h3><i class="fas fa-list"></i> Table of Contents</h3>
                <ul>
                    <li><a href="#chapter1" class="toc-link">Chapter 1: Introduction</a></li>
                    <li><a href="#chapter2" class="toc-link">Chapter 2: Basic Concepts</a></li>
                    <li><a href="#chapter3" class="toc-link">Chapter 3: Advanced Topics</a></li>
                    <li><a href="#chapter4" class="toc-link">Chapter 4: Practice Problems</a></li>
                    <li><a href="#chapter5" class="toc-link">Chapter 5: Summary</a></li>
                </ul>
            </div>

            <div class="note-chapter" id="chapter1">
                <h2>Chapter 1: Introduction</h2>
                <p>This chapter provides a comprehensive introduction to the subject matter. Understanding the fundamentals is crucial for building a strong foundation in this topic.</p>
                
                <h3>1.1 Overview</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                
                <div class="note-box info">
                    <i class="fas fa-info-circle"></i>
                    <div>
                        <strong>Important Note:</strong>
                        <p>Pay special attention to the key concepts highlighted throughout this chapter.</p>
                    </div>
                </div>

                <h3>1.2 Key Definitions</h3>
                <ul class="styled-list">
                    <li><strong>Term 1:</strong> Definition and explanation of the first important term.</li>
                    <li><strong>Term 2:</strong> Definition and explanation of the second important term.</li>
                    <li><strong>Term 3:</strong> Definition and explanation of the third important term.</li>
                </ul>
            </div>

            <div class="note-chapter" id="chapter2">
                <h2>Chapter 2: Basic Concepts</h2>
                <p>In this chapter, we'll explore the fundamental concepts that form the basis of this subject.</p>

                <h3>2.1 Concept One</h3>
                <p>Detailed explanation of the first concept with examples and illustrations.</p>

                <div class="formula-box">
                    <p><strong>Formula:</strong></p>
                    <p class="formula">a² + b² = c²</p>
                </div>

                <h3>2.2 Concept Two</h3>
                <p>Detailed explanation of the second concept with practical applications.</p>

                <div class="example-box">
                    <h4><i class="fas fa-lightbulb"></i> Example 1</h4>
                    <p><strong>Problem:</strong> Sample problem statement goes here.</p>
                    <p><strong>Solution:</strong> Step-by-step solution with detailed explanation.</p>
                </div>
            </div>

            <div class="note-chapter" id="chapter3">
                <h2>Chapter 3: Advanced Topics</h2>
                <p>This chapter delves into more complex aspects of the subject matter.</p>

                <h3>3.1 Advanced Concept</h3>
                <p>Detailed explanation with real-world applications and case studies.</p>

                <div class="note-box warning">
                    <i class="fas fa-exclamation-triangle"></i>
                    <div>
                        <strong>Common Mistake:</strong>
                        <p>Students often confuse this concept with similar topics. Make sure to understand the key differences.</p>
                    </div>
                </div>

                <h3>3.2 Practical Applications</h3>
                <ol class="styled-list">
                    <li>First practical application with detailed explanation</li>
                    <li>Second practical application with examples</li>
                    <li>Third practical application with case studies</li>
                </ol>
            </div>

            <div class="note-chapter" id="chapter4">
                <h2>Chapter 4: Practice Problems</h2>
                <p>Test your understanding with these practice problems.</p>

                <div class="practice-problem">
                    <h4>Problem 1</h4>
                    <p>Question statement goes here with all necessary details.</p>
                    <button class="show-solution-btn" onclick="toggleSolution(this)">
                        <i class="fas fa-eye"></i> Show Solution
                    </button>
                    <div class="solution" style="display: none;">
                        <p><strong>Solution:</strong></p>
                        <p>Detailed step-by-step solution with explanations.</p>
                    </div>
                </div>

                <div class="practice-problem">
                    <h4>Problem 2</h4>
                    <p>Another practice problem with different difficulty level.</p>
                    <button class="show-solution-btn" onclick="toggleSolution(this)">
                        <i class="fas fa-eye"></i> Show Solution
                    </button>
                    <div class="solution" style="display: none;">
                        <p><strong>Solution:</strong></p>
                        <p>Detailed step-by-step solution with explanations.</p>
                    </div>
                </div>
            </div>

            <div class="note-chapter" id="chapter5">
                <h2>Chapter 5: Summary</h2>
                <p>Let's review the key points covered in this note.</p>

                <div class="summary-box">
                    <h3><i class="fas fa-check-circle"></i> Key Takeaways</h3>
                    <ul>
                        <li>First important point to remember</li>
                        <li>Second crucial concept</li>
                        <li>Third essential principle</li>
                        <li>Fourth key learning outcome</li>
                    </ul>
                </div>

                <div class="note-box success">
                    <i class="fas fa-trophy"></i>
                    <div>
                        <strong>Congratulations!</strong>
                        <p>You've completed this chapter. Practice regularly to master these concepts.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function toggleSolution(button) {
    const solution = button.nextElementSibling;
    const icon = button.querySelector('i');
    
    if (solution.style.display === 'none') {
        solution.style.display = 'block';
        button.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Solution';
        solution.style.animation = 'fadeIn 0.3s ease';
    } else {
        solution.style.display = 'none';
        button.innerHTML = '<i class="fas fa-eye"></i> Show Solution';
    }
}

// ==================== DOWNLOAD FUNCTIONALITY ====================
function downloadNote() {
    const { className, subject, noteId } = currentNoteData;
    
    showNotification('Preparing PDF for download...', 'info');
    
    // Simulate download process
    setTimeout(() => {
        showNotification(`${subject} notes for ${className} downloaded successfully!`, 'success');
        
        // In real application, trigger actual PDF download
        // window.location.href = `/downloads/${noteId}.pdf`;
        console.log(`Downloading: ${noteId}.pdf`);
    }, 1500);
}

// ==================== SHARE FUNCTIONALITY ====================
function shareNote() {
    const { className, subject } = currentNoteData;
    const shareUrl = window.location.href;
    const shareText = `Check out these ${subject} notes for ${className} on Gyanu Notes!`;

    if (navigator.share) {
        navigator.share({
            title: `${subject} - ${className}`,
            text: shareText,
            url: shareUrl
        }).then(() => {
            showNotification('Shared successfully!', 'success');
        }).catch(err => {
            if (err.name !== 'AbortError') {
                copyToClipboard(shareUrl);
            }
        });
    } else {
        copyToClipboard(shareUrl);
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Link copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy link', 'error');
    });
}

// ==================== PRINT FUNCTIONALITY ====================
function printNote() {
    const readerBody = document.getElementById('readerBody');
    const { className, subject } = currentNoteData;
    
    // Create print window
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>${subject} - ${className}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }
                h1, h2, h3 { color: #667eea; }
                .note-box, .formula-box, .example-box {
                    border: 1px solid #ddd;
                    padding: 15px;
                    margin: 15px 0;
                    border-radius: 5px;
                }
                .formula { font-size: 1.2em; text-align: center; }
                @media print {
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <h1>${subject}</h1>
            <p><strong>${className}</strong></p>
            <hr>
            ${readerBody.innerHTML}
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 250);
    
    showNotification('Opening print dialog...', 'info');
}

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
        z-index: 99999;
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
    }, 4000);
}

// ==================== CARD ANIMATIONS ====================
function animateNoteCards() {
    const noteCards = document.querySelectorAll('.note-card');
    
    noteCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

// Add animations CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes highlightCard {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.03); box-shadow: 0 15px 40px rgba(102, 126, 234, 0.3); }
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideDown {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(50px);
        }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);

console.log('%c📚 Notes Page Loaded Successfully!', 'background: #667eea; color: white; padding: 5px 10px; border-radius: 3px;');