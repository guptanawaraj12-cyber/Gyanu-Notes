// ==================== BOOKS PAGE FUNCTIONALITY ====================

let currentBookData = {};
let currentZoom = 100;

document.addEventListener('DOMContentLoaded', function() {
    initializeBooksPage();
});

function initializeBooksPage() {
    setupSmartSearch();
    setupFilters();
    animateBookCards();
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
    const bookCards = document.querySelectorAll('.book-card');
    const classGroups = document.querySelectorAll('.class-group');
    const searchResultsInfo = document.getElementById('searchResultsInfo');
    const noResults = document.getElementById('noResults');
    let visibleCount = 0;

    // Hide all class groups first
    classGroups.forEach(group => {
        group.style.display = 'none';
    });

    // Search through all book cards
    bookCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const author = card.querySelector('.book-author').textContent.toLowerCase();
        const keywords = card.getAttribute('data-keywords').toLowerCase();
        const classGroup = card.closest('.class-group');
        const classNumber = classGroup.getAttribute('data-class');
        const className = `class ${classNumber}`;
        
        // Smart matching
        const matchesTitle = title.includes(searchTerm);
        const matchesAuthor = author.includes(searchTerm);
        const matchesKeywords = keywords.includes(searchTerm);
        const matchesClass = className.includes(searchTerm) || classNumber === searchTerm;
        
        // Check for "class 10" type searches
        const classMatch = searchTerm.match(/class\s*(\d+)/i);
        const matchesClassSearch = classMatch && classMatch[1] === classNumber;

        if (matchesTitle || matchesAuthor || matchesKeywords || matchesClass || matchesClassSearch) {
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
        const visibleCards = group.querySelectorAll('.book-card[style*="display: block"]');
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
    const booksSection = document.querySelector('.books-section');
    if (booksSection && visibleCount > 0) {
        booksSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function resetSearch() {
    const bookCards = document.querySelectorAll('.book-card');
    const classGroups = document.querySelectorAll('.class-group');
    const searchResultsInfo = document.getElementById('searchResultsInfo');
    const noResults = document.getElementById('noResults');

    // Show all cards and groups
    bookCards.forEach(card => {
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
            const cards = group.querySelectorAll('.book-card');
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

    // Scroll to books section
    const booksSection = document.querySelector('.books-section');
    if (booksSection) {
        booksSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ==================== CHECK URL PARAMETERS ====================
function checkURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const classParam = urlParams.get('class');
    
    if (classParam) {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            if (btn.getAttribute('data-class') === classParam) {
                btn.click();
            }
        });
    }
}

// ==================== BOOK READER FUNCTIONALITY ====================
function openBookReader(className, bookTitle, pdfFile) {
    const modal = document.getElementById('bookReaderModal');
    const readerTitle = document.getElementById('readerTitle');
    const readerSubtitle = document.getElementById('readerSubtitle');
    const pdfViewer = document.getElementById('pdfViewer');

    // Store current book data
    currentBookData = {
        className: className,
        bookTitle: bookTitle,
        pdfFile: pdfFile
    };

    // Set title
    readerTitle.textContent = bookTitle;
    readerSubtitle.textContent = className;

    // Reset zoom
    currentZoom = 100;
    document.getElementById('zoomLevel').textContent = '100%';

    // Load PDF
    loadPDF(pdfFile);

    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Add animation
    const content = modal.querySelector('.book-reader-content');
    content.style.animation = 'slideUp 0.4s ease';
}

function closeBookReader() {
    const modal = document.getElementById('bookReaderModal');
    const content = modal.querySelector('.book-reader-content');
    const pdfViewer = document.getElementById('pdfViewer');
    
    content.style.animation = 'slideDown 0.3s ease';
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        pdfViewer.src = '';
    }, 300);
}

// Close modal on outside click
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('bookReaderModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeBookReader();
            }
        });
    }
});

// Close modal on ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('bookReaderModal');
        if (modal && modal.style.display === 'flex') {
            closeBookReader();
        }
    }
});

// ==================== PDF LOADING ====================
function loadPDF(pdfFile) {
    const pdfViewer = document.getElementById('pdfViewer');
    const readerBody = document.getElementById('bookReaderBody');
    
    // Show loading
    readerBody.innerHTML = `
        <div class="loading-pdf">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading PDF...</p>
        </div>
    `;
    
    setTimeout(() => {
        // In production, replace with actual PDF path
        // For now, using PDF.js viewer
        const pdfPath = `books/${pdfFile}`;
        
        // Option 1: Use PDF.js viewer (recommended)
        pdfViewer.src = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(pdfPath)}`;
        
        // Option 2: Direct embed (if PDF is on same domain)
        // pdfViewer.src = pdfPath;
        
        readerBody.innerHTML = '';
        readerBody.appendChild(pdfViewer);
        
        // Update page info (you'll need PDF.js library for actual page count)
        document.getElementById('currentPage').textContent = '1';
        document.getElementById('totalPages').textContent = '100'; // Replace with actual count
    }, 1000);
}

// ==================== PDF CONTROLS ====================
function previousPage() {
    // Implement with PDF.js library
    showNotification('Previous page', 'info');
}

function nextPage() {
    // Implement with PDF.js library
    showNotification('Next page', 'info');
}

function zoomIn() {
    if (currentZoom < 200) {
        currentZoom += 10;
        document.getElementById('zoomLevel').textContent = currentZoom + '%';
        applyZoom();
    }
}

function zoomOut() {
    if (currentZoom > 50) {
        currentZoom -= 10;
        document.getElementById('zoomLevel').textContent = currentZoom + '%';
        applyZoom();
    }
}

function applyZoom() {
    const pdfViewer = document.getElementById('pdfViewer');
    pdfViewer.style.transform = `scale(${currentZoom / 100})`;
    pdfViewer.style.transformOrigin = 'top center';
}

function toggleFullscreen() {
    const modal = document.getElementById('bookReaderModal');
    
    if (!document.fullscreenElement) {
        modal.requestFullscreen().catch(err => {
            showNotification('Fullscreen not supported', 'error');
        });
    } else {
        document.exitFullscreen();
    }
}

// ==================== DOWNLOAD FUNCTIONALITY ====================
function downloadBook() {
    const { className, bookTitle, pdfFile } = currentBookData;
    
    showNotification('Preparing PDF for download...', 'info');
    
    // Simulate download process
    setTimeout(() => {
        showNotification(`${bookTitle} downloaded successfully!`, 'success');
        
        // In real application, trigger actual PDF download
        // Create a temporary link and trigger download
        const link = document.createElement('a');
        link.href = `books/${pdfFile}`;
        link.download = pdfFile;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log(`Downloading: books/${pdfFile}`);
    }, 1500);
}

// ==================== SHARE FUNCTIONALITY ====================
function shareBook() {
    const { className, bookTitle } = currentBookData;
    const shareUrl = window.location.href;
    const shareText = `Check out ${bookTitle} for ${className} on Gyanu Notes!`;

    if (navigator.share) {
        navigator.share({
            title: `${bookTitle} - ${className}`,
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
function printBook() {
    const pdfViewer = document.getElementById('pdfViewer');
    
    try {
        pdfViewer.contentWindow.print();
        showNotification('Opening print dialog...', 'info');
    } catch (e) {
        showNotification('Print not available for this PDF', 'error');
    }
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
function animateBookCards() {
    const bookCards = document.querySelectorAll('.book-card');
    
    bookCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

console.log('%c📖 Books Page Loaded Successfully!', 'background: #764ba2; color: white; padding: 5px 10px; border-radius: 3px;');