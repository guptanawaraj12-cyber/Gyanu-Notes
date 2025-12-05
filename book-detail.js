// Get book ID from URL
const urlParams = new URLSearchParams(window.location.search);
const bookId = parseInt(urlParams.get('id'));

// Find book in database
let currentBook = null;

// Search through all classes and subjects
Object.values(booksDatabase).forEach(classBooks => {
    Object.values(classBooks).forEach(subjectBooks => {
        const book = subjectBooks.find(b => b.id === bookId);
        if (book) {
            currentBook = book;
        }
    });
});

// Display book details
if (currentBook) {
    document.getElementById('bookTitle').textContent = currentBook.title;
    document.getElementById('bookAuthor').innerHTML = `<i class="fas fa-user"></i> ${currentBook.author}`;
    document.getElementById('bookPublisher').innerHTML = `<i class="fas fa-building"></i> ${currentBook.publisher}`;
    document.getElementById('bookClass').innerHTML = `<i class="fas fa-graduation-cap"></i> ${currentBook.class === 'bachelor' ? "Bachelor's" : currentBook.class === 'master' ? "Master's" : 'Class ' + currentBook.class}`;
    
    document.getElementById('bookContent').innerHTML = currentBook.content;
    
    // Update page title
    document.title = `${currentBook.title} - Gyanu Note`;
} else {
    document.getElementById('bookContent').innerHTML = '<p>Book not found.</p>';
}

// Download PDF functionality
document.getElementById('downloadBtn').addEventListener('click', function() {
    const bookTitle = document.getElementById('bookTitle').textContent;
    const bookContent = document.getElementById('bookContent');
    
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
    this.disabled = true;
    
    const printContent = document.createElement('div');
    printContent.innerHTML = `
        <div style="padding: 20px; font-family: Arial, sans-serif;">
            <h1 style="color: #2563eb; margin-bottom: 20px;">${bookTitle}</h1>
            <div style="border-top: 3px solid #2563eb; padding-top: 20px;">
                ${bookContent.innerHTML}
            </div>
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ccc; text-align: center; color: #666;">
                <p>Downloaded from Gyanu Note - www.gyanunote.com</p>
            </div>
        </div>
    `;
    
    const opt = {
        margin: 10,
        filename: `${bookTitle.replace(/[^a-z0-9]/gi, '_')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(printContent).save().then(() => {
        this.innerHTML = '<i class="fas fa-download"></i> Download PDF';
        this.disabled = false;
    });
});

// Print functionality
document.getElementById('printBtn').addEventListener('click', function() {
    window.print();
});

// Share functionality
document.getElementById('shareBtn').addEventListener('click', function() {
    if (navigator.share) {
        navigator.share({
            title: currentBook.title,
            text: currentBook.description,
            url: window.location.href
        });
    } else {
        // Fallback: Copy link
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
    }
});