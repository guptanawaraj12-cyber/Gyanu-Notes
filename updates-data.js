// ==================== UPDATES DATABASE ====================
// Latest updates, announcements, and new content

const updatesData = [
    {
        id: 'update1',
        type: 'note',
        badge: 'NEW',
        badgeClass: 'new',
        title: 'Class 10 Science - Chemical Reactions Chapter Added',
        description: 'Complete notes on chemical reactions and equations with examples, practice questions, and detailed explanations.',
        date: '2024-01-15',
        link: 'note-detail.html?id=n10s1',
        icon: 'fas fa-file-alt'
    },
    {
        id: 'update2',
        type: 'book',
        badge: 'NEW',
        badgeClass: 'new',
        title: 'Class 12 Physics Guide Book Available',
        description: 'Download the complete physics guide book for Class 12 with solved examples and practice problems.',
        date: '2024-01-20',
        link: 'class-books.html?class=12',
        icon: 'fas fa-book'
    },
    {
        id: 'update3',
        type: 'announcement',
        badge: 'IMPORTANT',
        badgeClass: 'important',
        title: 'SEE 2024 Preparation Materials Released',
        description: 'Special collection of notes and books for SEE 2024 students. Complete preparation package now available.',
        date: '2024-01-18',
        link: 'class-notes.html?class=10',
        icon: 'fas fa-bullhorn'
    },
    {
        id: 'update4',
        type: 'note',
        badge: 'UPDATED',
        badgeClass: 'updated',
        title: 'Class 11 Physics Notes Updated',
        description: 'Physical World and Measurement chapter has been updated with new examples and practice questions.',
        date: '2024-01-22',
        link: 'note-detail.html?id=n11p1',
        icon: 'fas fa-file-alt'
    },
    {
        id: 'update5',
        type: 'book',
        badge: 'NEW',
        badgeClass: 'new',
        title: 'Class 9 Mathematics Guide Added',
        description: 'Complete mathematics guide book with detailed solutions for all chapters now available for download.',
        date: '2024-01-25',
        link: 'class-books.html?class=9',
        icon: 'fas fa-book'
    },
    {
        id: 'update6',
        type: 'note',
        badge: 'NEW',
        badgeClass: 'new',
        title: 'Class 10 Acids, Bases and Salts Notes',
        description: 'Comprehensive notes on acids, bases, pH scale, and neutralization reactions with real-life examples.',
        date: '2024-01-20',
        link: 'note-detail.html?id=n10s2',
        icon: 'fas fa-file-alt'
    },
    {
        id: 'update7',
        type: 'announcement',
        badge: 'NEW',
        badgeClass: 'new',
        title: 'Mobile App Coming Soon!',
        description: 'We are working on a mobile app for Android and iOS. Stay tuned for offline access to all notes and books.',
        date: '2024-01-28',
        link: 'about.html',
        icon: 'fas fa-mobile-alt'
    },
    {
        id: 'update8',
        type: 'note',
        badge: 'NEW',
        badgeClass: 'new',
        title: 'Class 10 Metals and Non-metals Chapter',
        description: 'Detailed notes on properties, reactivity series, and uses of metals and non-metals.',
        date: '2024-01-25',
        link: 'note-detail.html?id=n10s3',
        icon: 'fas fa-file-alt'
    }
];

// Function to get recent updates (limit)
function getRecentUpdates(limit = 6) {
    return updatesData.slice(0, limit);
}

// Function to get updates by type
function getUpdatesByType(type) {
    return updatesData.filter(update => update.type === type);
}

// Function to format update date
function formatUpdateDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
        return 'Today';
    } else if (diffDays === 1) {
        return 'Yesterday';
    } else if (diffDays < 7) {
        return `${diffDays} days ago`;
    } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { updatesData, getRecentUpdates, getUpdatesByType, formatUpdateDate };
}