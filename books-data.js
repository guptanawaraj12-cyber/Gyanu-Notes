// ==================== BOOKS DATABASE ====================
// All books with Google Drive download links

const booksDatabase = {
    // Class 8 Books
    '8': {
        science: [
            {
                id: 'b8s1',
                title: 'Science Book - Class 8',
                author: 'CDC Nepal',
                type: 'textbook',
                subject: 'science',
                pages: 250,
                coverImage: 'images/books/class-8-science.jpg',
                downloadLink: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_HERE',
                previewLink: 'https://drive.google.com/file/d/YOUR_FILE_ID_HERE/view',
                description: 'Official Science textbook for Class 8'
            },
            {
                id: 'b8s2',
                title: 'Science Guide - Class 8',
                author: 'Asmita Publication',
                type: 'guide',
                subject: 'science',
                pages: 320,
                coverImage: 'images/books/class-8-science-guide.jpg',
                downloadLink: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_HERE',
                previewLink: 'https://drive.google.com/file/d/YOUR_FILE_ID_HERE/view',
                description: 'Complete guide with solutions for Class 8 Science'
            }
        ],
        math: [
            {
                id: 'b8m1',
                title: 'Mathematics Book - Class 8',
                author: 'CDC Nepal',
                type: 'textbook',
                subject: 'math',
                pages: 280,
                coverImage: 'images/books/class-8-math.jpg',
                downloadLink: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_HERE',
                previewLink: 'https://drive.google.com/file/d/YOUR_FILE_ID_HERE/view',
                description: 'Official Mathematics textbook for Class 8'
            },
            {
                id: 'b8m2',
                title: 'Mathematics Guide - Class 8',
                author: 'Sukunda Publication',
                type: 'guide',
                subject: 'math',
                pages: 350,
                coverImage: 'images/books/class-8-math-guide.jpg',
                downloadLink: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_HERE',
                previewLink: 'https://drive.google.com/file/d/YOUR_FILE_ID_HERE/view',
                description: 'Complete Mathematics guide with detailed solutions'
            }
        ],
        english: [
            {
                id: 'b8e1',
                title: 'English Book - Class 8',
                author: 'CDC Nepal',
                type: 'textbook',
                subject: 'english',
                pages: 200,
                coverImage: 'images/books/class-8-english.jpg',
                downloadLink: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_HERE',
                previewLink: 'https://drive.google.com/file/d/YOUR_FILE_ID_HERE/view',
                description: 'Official English textbook for Class 8'
            }
        ],
        nepali: [
            {
                id: 'b8n1',
                title: 'Nepali Book - Class 8',
                author: 'CDC Nepal',
                type: 'textbook',
                subject: 'nepali',
                pages: 220,
                coverImage: 'images/books/class-8-nepali.jpg',
                downloadLink: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_HERE',
                previewLink: 'https://drive.google.com/file/d/YOUR_FILE_ID_HERE/view',
                description: 'कक्षा ८ को नेपाली पाठ्यपुस्तक'
            }
        ],
        social: [
            {
                id: 'b8so1',
                title: 'Social Studies Book - Class 8',
                author: 'CDC Nepal',
                type: 'textbook',
                subject: 'social',
                pages: 240,
                coverImage: 'images/books/class-8-social.jpg',
                downloadLink: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_HERE',
                previewLink: 'https://drive.google.com/file/d/YOUR_FILE_ID_HERE/view',
                description: 'Official Social Studies textbook for Class 8'
            }
        ]
    },

    // Class 9 Books
    '9': {
        science: [
            {
                id: 'b9s1',
                title: 'Science Book - Class 9',
                author: 'CDC Nepal',
                type: 'textbook',
                subject: 'science',
                pages: 280,
                coverImage: 'images/books/class-9-science.jpg',
                downloadLink: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_HERE',
                previewLink: 'https://drive.google.com/file/d/YOUR_FILE_ID_HERE/view',
                description: 'Official Science textbook for Class 9'
            },
            {
                id: 'b9s2',
                title: 'Science Guide - Class 9',
                author: 'Asmita Publication',
                type: 'guide',
                subject: 'science',
                pages: 380,
                coverImage: 'images/books/class-9-science-guide.jpg',
                downloadLink: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_HERE',
                previewLink: 'https://drive.google.com/file/d/YOUR_FILE_ID_HERE/view',
                description: 'Complete guide with solutions for Class 9 Science'
            }
        ],
        math: [
            {
                id: 'b9m1',
                title: 'Mathematics Book - Class 9',
                author: 'CDC Nepal',
                type: 'textbook',
                subject: 'math',
                pages: 300,
                coverImage: 'images/books/class-9-math.jpg',
                downloadLink: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_HERE',
                previewLink: 'https://drive.google.com/file/d/YOUR_FILE_ID_HERE/view',
                description: 'Official Mathematics textbook for Class 9'
            },
            {
                id: 'b9m2',
                title: 'Mathematics Guide - Class 9',
                author: 'Sukunda Publication',
                type: 'guide',
                subject: 'math',
                pages: 400,
                coverImage: 'images/books/class-9-math-guide.jpg',
                downloadLink: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_HERE',
                previewLink: 'https://drive.google.com/file/d/YOUR_FILE_ID_HERE/view',
                description: 'Complete Mathematics guide with detailed solutions'
            }
        ],
        english: [
            {
                id: 'b9e1',
                title: 'English Book - Class 9',
                author: 'CDC Nepal',
                type: 'textbook',
                subject: 'english',
                pages: 220,
                coverImage: 'images/books/class-9-english.jpg',
                downloadLink: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_HERE',
                previewLink: 'https://drive.google.com/file/d/YOUR_FILE_ID_HERE/view',
                description: 'Official English textbook for Class 9'
            }
        ]
    },

    // Class 10 Books
    '10': {
        science: [
            {
                id: 'b10s1',
                title: 'Science Book - Class 10',
                author: 'CDC Nepal',
                type: 'textbook',
                subject: 'science',
                pages: 320,
                coverImage: 'images/books/class-10-science.jpg',
                downloadLink: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_HERE',
                previewLink: 'https://drive.google.com/file/d/YOUR_FILE_ID_HERE/view',
                description: 'Official Science textbook for Class 10 SEE'
            },
            {
                id: 'b10s2',
                title: 'Science Guide - Class 10',
                author: 'Asmita Publication',
                type: 'guide',
                subject: 'science',
                pages: 450,
                coverImage: 'images/books/class-10-science-guide.jpg',
                downloadLink: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_HERE',
                previewLink: 'https://drive.google.com/file/d/YOUR_FILE_ID_HERE/view',
                description: 'Complete SEE preparation guide for Science'
            }
        ],
        math: [
            {
                id: 'b10m1',
                title: 'Mathematics Book - Class 10',
                author: 'CDC Nepal',
                type: 'textbook',
                subject: 'math',
                pages: 350,
                coverImage: 'images/books/class-10-math.jpg',
                downloadLink: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_HERE',
                previewLink: 'https://drive.google.com/file/d/YOUR_FILE_ID_HERE/view',
                description: 'Official Mathematics textbook for Class 10 SEE'
            },
            {
                id: 'b10m2',
                title: 'Mathematics Guide - Class 10',
                author: 'Sukunda Publication',
                type: 'guide',
                subject: 'math',
                pages: 480,
                coverImage: 'images/books/class-10-math-guide.jpg',
                downloadLink: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_HERE',
                previewLink: 'https://drive.google.com/file/d/YOUR_FILE_ID_HERE/view',
                description: 'Complete SEE preparation guide for Mathematics'
            }
        ],
        english: [
            {
                id: 'b10e1',
                title: 'English Book - Class 10',
                author: 'CDC Nepal',
                type: 'textbook',
                subject: 'english',
                pages: 250,
                coverImage: 'images/books/class-10-english.jpg',
                downloadLink: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_HERE',
                previewLink: 'https://drive.google.com/file/d/YOUR_FILE_ID_HERE/view',
                description: 'Official English textbook for Class 10 SEE'
            }
        ]
    },

    // Class 11 Books
    '11': {
        physics: [
            {
                id: 'b11p1',
                title: 'Physics Book - Class 11',
                author: 'NEB Nepal',
                type: 'textbook',
                subject: 'physics',
                pages: 400,
                coverImage: 'images/books/class-11-physics.jpg',
                downloadLink: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_HERE',
                previewLink: 'https://drive.google.com/file/d/YOUR_FILE_ID_HERE/view',
                description: 'Official Physics textbook for Class 11 NEB'
            },
            {
                id: 'b11p2',
                title: 'Physics Guide - Class 11',
                author: 'Asmita Publication',
                type: 'guide',
                subject: 'physics',
                pages: 520,
                coverImage: 'images/books/class-11-physics-guide.jpg',
                downloadLink: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_HERE',
                previewLink: 'https://drive.google.com/file/d/YOUR_FILE_ID_HERE/view',
                description: 'Complete Physics guide with detailed solutions'
            }
        ],
        chemistry: [
            {
                id: 'b11c1',
                title: 'Chemistry Book - Class 11',
                author: 'NEB Nepal',
                type: 'textbook',
                subject: 'chemistry',
                pages: 380,
                coverImage: 'images/books/class-11-chemistry.jpg',
                downloadLink: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_HERE',
                previewLink: 'https://drive.google.com/file/d/YOUR_FILE_ID_HERE/view',
                description: 'Official Chemistry textbook for Class 11 NEB'
            },
            {
                id: 'b11c2',
                title: 'Chemistry Guide - Class 11',
                author: 'Heritage Publication',
                type: 'guide',
                subject: 'chemistry',
                pages: 500,
                coverImage: 'images/books/class-11-chemistry-guide.jpg',
                downloadLink: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_HERE',
                previewLink: 'https://drive.google.com/file/d/YOUR_FILE_ID_HERE/view',
                description: 'Complete Chemistry guide with detailed solutions'
            }
        ],
        math: [
            {
                id: 'b11m1',
                title: 'Mathematics Book - Class 11',
                author: 'NEB Nepal',
                type: 'textbook',
                subject: 'math',
                pages: 420,
                coverImage: 'images/books/class-11-math.jpg',
                downloadLink: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_HERE',
                previewLink: 'https://drive.google.com/file/d/YOUR_FILE_ID_HERE/view',
                description: 'Official Mathematics textbook for Class 11 NEB'
            },
            {
                id: 'b11m2',
                title: 'Mathematics Guide - Class 11',
                author: 'Sukunda Publication',
                type: 'guide',
                subject: 'math',
                pages: 550,
                coverImage: 'images/books/class-11-math-guide.jpg',
                downloadLink: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_HERE',
                previewLink: 'https://drive.google.com/file/d/YOUR_FILE_ID_HERE/view',
                description: 'Complete Mathematics guide with detailed solutions'
            }
        ],
        biology: [
            {
                id: 'b11b1',
                title: 'Biology Book - Class 11',
                author: 'NEB Nepal',
                type: 'textbook',
                subject: 'biology',
                pages: 390,
                coverImage: 'images/books/class-11-biology.jpg',
                downloadLink: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_HERE',
                previewLink: 'https://drive.google.com/file/d/YOUR_FILE_ID_HERE/view',
                description: 'Official Biology textbook for Class 11 NEB'
            },
            {
                id: 'b11b2',
                title: 'Biology Guide - Class 11',
                author: 'Asmita Publication',
                type: 'guide',
                subject: 'biology',
                pages: 510,
                coverImage: 'images/books/class-11-biology-guide.jpg',
                downloadLink: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_HERE',
                previewLink: 'https://drive.google.com/file/d/YOUR_FILE_ID_HERE/view',
                description: 'Complete Biology guide with detailed solutions'
            }
        ]
    },

    // Class 12 Books
    '12': {
        physics: [
            {
                id: 'b12p1',
                title: 'Physics Book - Class 12',
                author: 'NEB Nepal',
                type: 'textbook',
                subject: 'physics',
                pages: 450,
                coverImage: 'images/books/class-12-physics.jpg',
                downloadLink: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_HERE',
                previewLink: 'https://drive.google.com/file/d/YOUR_FILE_ID_HERE/view',
                description: 'Official Physics textbook for Class 12 NEB'
            },
            {
                id: 'b12p2',
                title: 'Physics Guide - Class 12',
                author: 'Asmita Publication',
                type: 'guide',
                subject: 'physics',
                pages: 580,
                coverImage: 'images/books/class-12-physics-guide.jpg',
                downloadLink: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_HERE',
                previewLink: 'https://drive.google.com/file/d/YOUR_FILE_ID_HERE/view',
                description: 'Complete board exam preparation guide for Physics'
            }
        ],
        chemistry: [
            {
                id: 'b12c1',
                title: 'Chemistry Book - Class 12',
                author: 'NEB Nepal',
                type: 'textbook',
                subject: 'chemistry',
                pages: 420,
                coverImage: 'images/books/class-12-chemistry.jpg',
                downloadLink: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_HERE',
                previewLink: 'https://drive.google.com/file/d/YOUR_FILE_ID_HERE/view',
                description: 'Official Chemistry textbook for Class 12 NEB'
            },
            {
                id: 'b12c2',
                title: 'Chemistry Guide - Class 12',
                author: 'Heritage Publication',
                type: 'guide',
                subject: 'chemistry',
                pages: 560,
                coverImage: 'images/books/class-12-chemistry-guide.jpg',
                downloadLink: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_HERE',
                previewLink: 'https://drive.google.com/file/d/YOUR_FILE_ID_HERE/view',
                description: 'Complete board exam preparation guide for Chemistry'
            }
        ],
        math: [
            {
                id: 'b12m1',
                title: 'Mathematics Book - Class 12',
                author: 'NEB Nepal',
                type: 'textbook',
                subject: 'math',
                pages: 480,
                coverImage: 'images/books/class-12-math.jpg',
                downloadLink: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_HERE',
                previewLink: 'https://drive.google.com/file/d/YOUR_FILE_ID_HERE/view',
                description: 'Official Mathematics textbook for Class 12 NEB'
            },
            {
                id: 'b12m2',
                title: 'Mathematics Guide - Class 12',
                author: 'Sukunda Publication',
                type: 'guide',
                subject: 'math',
                pages: 620,
                coverImage: 'images/books/class-12-math-guide.jpg',
                downloadLink: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_HERE',
                previewLink: 'https://drive.google.com/file/d/YOUR_FILE_ID_HERE/view',
                description: 'Complete board exam preparation guide for Mathematics'
            }
        ],
        biology: [
            {
                id: 'b12b1',
                title: 'Biology Book - Class 12',
                author: 'NEB Nepal',
                type: 'textbook',
                subject: 'biology',
                pages: 440,
                coverImage: 'images/books/class-12-biology.jpg',
                downloadLink: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_HERE',
                previewLink: 'https://drive.google.com/file/d/YOUR_FILE_ID_HERE/view',
                description: 'Official Biology textbook for Class 12 NEB'
            },
            {
                id: 'b12b2',
                title: 'Biology Guide - Class 12',
                author: 'Asmita Publication',
                type: 'guide',
                subject: 'biology',
                pages: 570,
                coverImage: 'images/books/class-12-biology-guide.jpg',
                downloadLink: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_HERE',
                previewLink: 'https://drive.google.com/file/d/YOUR_FILE_ID_HERE/view',
                description: 'Complete board exam preparation guide for Biology'
            }
        ]
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = booksDatabase;
}