// Complete notes database with all subjects and classes
const notesDatabase = {
    // Physics Notes
    physics: [
        {
            id: 1,
            title: "Mechanics - Motion in a Straight Line",
            description: "Complete notes on kinematics, equations of motion, and graphs",
            class: "11",
            date: "2024-01-15",
            views: 2450,
            tags: ["mechanics", "motion", "kinematics"]
        },
        {
            id: 2,
            title: "Newton's Laws of Motion",
            description: "Detailed explanation of three laws with examples and problems",
            class: "11",
            date: "2024-01-20",
            views: 2100,
            tags: ["newton", "laws", "force"]
        },
        {
            id: 3,
            title: "Electricity and Magnetism",
            description: "Electric field, magnetic field, and electromagnetic induction",
            class: "12",
            date: "2024-02-01",
            views: 1890,
            tags: ["electricity", "magnetism", "induction"]
        },
        {
            id: 4,
            title: "Modern Physics - Quantum Mechanics",
            description: "Photoelectric effect, wave-particle duality, and atomic models",
            class: "12",
            date: "2024-02-10",
            views: 1650,
            tags: ["quantum", "modern physics", "atoms"]
        },
        {
            id: 5,
            title: "Thermodynamics Laws",
            description: "First, second, and third laws of thermodynamics with applications",
            class: "11",
            date: "2024-02-15",
            views: 1420,
            tags: ["thermodynamics", "heat", "energy"]
        }
    ],

    // Chemistry Notes
    chemistry: [
        {
            id: 6,
            title: "Organic Chemistry - Hydrocarbons",
            description: "Alkanes, alkenes, alkynes - nomenclature and reactions",
            class: "12",
            date: "2024-01-18",
            views: 2200,
            tags: ["organic", "hydrocarbons", "reactions"]
        },
        {
            id: 7,
            title: "Chemical Bonding",
            description: "Ionic, covalent, and metallic bonds with examples",
            class: "11",
            date: "2024-01-25",
            views: 1980,
            tags: ["bonding", "ionic", "covalent"]
        },
        {
            id: 8,
            title: "Periodic Table and Trends",
            description: "Periodic properties, trends, and element classification",
            class: "11",
            date: "2024-02-05",
            views: 2350,
            tags: ["periodic table", "trends", "elements"]
        },
        {
            id: 9,
            title: "Chemical Kinetics",
            description: "Rate of reaction, order, and reaction mechanisms",
            class: "12",
            date: "2024-02-12",
            views: 1560,
            tags: ["kinetics", "rate", "reaction"]
        },
        {
            id: 10,
            title: "Electrochemistry",
            description: "Redox reactions, electrochemical cells, and batteries",
            class: "12",
            date: "2024-02-18",
            views: 1720,
            tags: ["electrochemistry", "redox", "cells"]
        }
    ],

    // Biology Notes
    biology: [
        {
            id: 11,
            title: "Cell Biology - Structure and Function",
            description: "Cell organelles, membrane structure, and cell division",
            class: "11",
            date: "2024-01-22",
            views: 2100,
            tags: ["cell", "organelles", "mitosis"]
        },
        {
            id: 12,
            title: "Genetics and Heredity",
            description: "Mendelian genetics, DNA structure, and inheritance patterns",
            class: "12",
            date: "2024-02-08",
            views: 1890,
            tags: ["genetics", "DNA", "heredity"]
        },
        {
            id: 13,
            title: "Plant Physiology",
            description: "Photosynthesis, respiration, and plant hormones",
            class: "11",
            date: "2024-02-14",
            views: 1650,
            tags: ["plants", "photosynthesis", "hormones"]
        },
        {
            id: 14,
            title: "Human Physiology - Circulatory System",
            description: "Heart structure, blood circulation, and cardiovascular diseases",
            class: "12",
            date: "2024-02-20",
            views: 1780,
            tags: ["human", "heart", "circulation"]
        },
        {
            id: 15,
            title: "Ecology and Environment",
            description: "Ecosystems, food chains, and environmental conservation",
            class: "12",
            date: "2024-02-25",
            views: 1520,
            tags: ["ecology", "ecosystem", "environment"]
        }
    ],

    // Mathematics Notes
    mathematics: [
        {
            id: 16,
            title: "Calculus - Limits and Continuity",
            description: "Complete guide to limits, continuity, and derivatives",
            class: "11",
            date: "2024-01-12",
            views: 3200,
            tags: ["calculus", "limits", "derivatives"]
        },
        {
            id: 17,
            title: "Trigonometry - Functions and Identities",
            description: "All trigonometric functions, identities, and equations",
            class: "11",
            date: "2024-01-28",
            views: 2850,
            tags: ["trigonometry", "functions", "identities"]
        },
        {
            id: 18,
            title: "Vectors and 3D Geometry",
            description: "Vector operations, dot product, cross product, and 3D geometry",
            class: "12",
            date: "2024-02-06",
            views: 2450,
            tags: ["vectors", "3d geometry", "operations"]
        },
        {
            id: 19,
            title: "Probability and Statistics",
            description: "Probability theory, distributions, and statistical analysis",
            class: "12",
            date: "2024-02-16",
            views: 2120,
            tags: ["probability", "statistics", "distributions"]
        },
        {
            id: 20,
            title: "Linear Algebra - Matrices",
            description: "Matrix operations, determinants, and linear transformations",
            class: "bachelor",
            date: "2024-02-22",
            views: 1890,
            tags: ["matrices", "linear algebra", "determinants"]
        }
    ],

    // Computer Science Notes
    computer: [
        {
            id: 21,
            title: "Data Structures and Algorithms",
            description: "Arrays, linked lists, stacks, queues, trees, and sorting algorithms",
            class: "bachelor",
            date: "2024-01-10",
            views: 3500,
            tags: ["dsa", "algorithms", "data structures"]
        },
        {
            id: 22,
            title: "Object-Oriented Programming in C++",
            description: "Classes, objects, inheritance, polymorphism, and encapsulation",
            class: "11",
            date: "2024-01-24",
            views: 2980,
            tags: ["oop", "cpp", "programming"]
        },
        {
            id: 23,
            title: "Database Management Systems",
            description: "SQL, normalization, ER diagrams, and database design",
            class: "12",
            date: "2024-02-04",
            views: 2650,
            tags: ["dbms", "sql", "database"]
        },
        {
            id: 24,
            title: "Web Technology - HTML, CSS, JavaScript",
            description: "Complete web development guide with practical examples",
            class: "12",
            date: "2024-02-11",
            views: 3120,
            tags: ["web", "html", "css", "javascript"]
        },
        {
            id: 25,
            title: "Computer Networks",
            description: "OSI model, TCP/IP, routing, and network protocols",
            class: "bachelor",
            date: "2024-02-19",
            views: 2340,
            tags: ["networks", "tcp/ip", "protocols"]
        }
    ],

    // English Notes
    english: [
        {
            id: 26,
            title: "Grammar Essentials - Tenses",
            description: "Complete guide to all English tenses with examples",
            class: "11",
            date: "2024-01-16",
            views: 2450,
            tags: ["grammar", "tenses", "english"]
        },
        {
            id: 27,
            title: "Essay Writing Techniques",
            description: "How to write effective essays, paragraphs, and compositions",
            class: "12",
            date: "2024-02-03",
            views: 2180,
            tags: ["essay", "writing", "composition"]
        },
        {
            id: 28,
            title: "English Literature - Poetry Analysis",
            description: "Analysis of famous poems and poetic devices",
            class: "12",
            date: "2024-02-13",
            views: 1890,
            tags: ["literature", "poetry", "analysis"]
        },
        {
            id: 29,
            title: "Business Communication",
            description: "Professional writing, emails, reports, and presentations",
            class: "bachelor",
            date: "2024-02-21",
            views: 2020,
            tags: ["business", "communication", "professional"]
        }
    ],

    // Nepali Notes
    nepali: [
        {
            id: 30,
            title: "नेपाली व्याकरण - संज्ञा र सर्वनाम",
            description: "संज्ञा र सर्वनामका प्रकार र प्रयोग",
            class: "11",
            date: "2024-01-19",
            views: 1980,
            tags: ["व्याकरण", "संज्ञा", "सर्वनाम"]
        },
        {
            id: 31,
            title: "नेपाली साहित्य - कविता विश्लेषण",
            description: "प्रसिद्ध कविताहरूको विश्लेषण र व्याख्या",
            class: "12",
            date: "2024-02-07",
            views: 1750,
            tags: ["साहित्य", "कविता", "विश्लेषण"]
        },
        {
            id: 32,
            title: "निबन्ध लेखन",
            description: "प्रभावकारी निबन्ध लेख्ने तरिका",
            class: "11",
            date: "2024-02-17",
            views: 1620,
            tags: ["निबन्ध", "लेखन"]
        }
    ],

    // Accountancy Notes
    accountancy: [
        {
            id: 33,
            title: "Financial Accounting - Journal Entries",
            description: "Complete guide to journal entries and ledger posting",
            class: "11",
            date: "2024-01-14",
            views: 2650,
            tags: ["accounting", "journal", "ledger"]
        },
        {
            id: 34,
            title: "Final Accounts Preparation",
            description: "Trading account, P&L account, and balance sheet",
            class: "12",
            date: "2024-02-02",
            views: 2420,
            tags: ["final accounts", "balance sheet", "p&l"]
        },
        {
            id: 35,
            title: "Cost Accounting",
            description: "Material costing, labor costing, and overhead allocation",
            class: "bachelor",
            date: "2024-02-15",
            views: 2180,
            tags: ["cost accounting", "costing", "overhead"]
        },
        {
            id: 36,
            title: "Company Accounts",
            description: "Share capital, debentures, and company final accounts",
            class: "12",
            date: "2024-02-23",
            views: 1950,
            tags: ["company", "shares", "debentures"]
        }
    ],

    // Economics Notes
    economics: [
        {
            id: 37,
            title: "Microeconomics - Demand and Supply",
            description: "Law of demand, supply, and market equilibrium",
            class: "11",
            date: "2024-01-17",
            views: 2320,
            tags: ["microeconomics", "demand", "supply"]
        },
        {
            id: 38,
            title: "Macroeconomics - National Income",
            description: "GDP, GNP, NNP, and national income calculation",
            class: "12",
            date: "2024-02-09",
            views: 2050,
            tags: ["macroeconomics", "gdp", "national income"]
        },
        {
            id: 39,
            title: "Money and Banking",
            description: "Functions of money, banking system, and central bank",
            class: "12",
            date: "2024-02-18",
            views: 1880,
            tags: ["money", "banking", "central bank"]
        },
        {
            id: 40,
            title: "Development Economics",
            description: "Economic development, growth theories, and planning",
            class: "bachelor",
            date: "2024-02-24",
            views: 1720,
            tags: ["development", "growth", "planning"]
        }
    ],

    // Business Studies Notes
    business: [
        {
            id: 41,
            title: "Principles of Management",
            description: "Planning, organizing, staffing, directing, and controlling",
            class: "bachelor",
            date: "2024-01-11",
            views: 2580,
            tags: ["management", "principles", "functions"]
        },
        {
            id: 42,
            title: "Marketing Management",
            description: "Marketing mix, segmentation, targeting, and positioning",
            class: "bachelor",
            date: "2024-01-26",
            views: 2340,
            tags: ["marketing", "4p", "segmentation"]
        },
        {
            id: 43,
            title: "Human Resource Management",
            description: "Recruitment, training, performance appraisal, and compensation",
            class: "bachelor",
            date: "2024-02-12",
            views: 2120,
            tags: ["hrm", "recruitment", "training"]
        },
        {
            id: 44,
            title: "Strategic Management",
            description: "Strategy formulation, implementation, and evaluation",
            class: "master",
            date: "2024-02-20",
            views: 1890,
            tags: ["strategy", "strategic management", "planning"]
        }
    ],

    // Statistics Notes
    statistics: [
        {
            id: 45,
            title: "Descriptive Statistics",
            description: "Mean, median, mode, variance, and standard deviation",
            class: "11",
            date: "2024-01-21",
            views: 2180,
            tags: ["statistics", "mean", "median", "mode"]
        },
        {
            id: 46,
            title: "Probability Theory",
            description: "Basic probability, conditional probability, and Bayes theorem",
            class: "12",
            date: "2024-02-05",
            views: 1950,
            tags: ["probability", "bayes", "conditional"]
        },
        {
            id: 47,
            title: "Inferential Statistics",
            description: "Hypothesis testing, confidence intervals, and t-tests",
            class: "bachelor",
            date: "2024-02-16",
            views: 1780,
            tags: ["inferential", "hypothesis", "testing"]
        }
    ],

    // Social Studies Notes
    social: [
        {
            id: 48,
            title: "Ancient History of Nepal",
            description: "Kirat, Lichhavi, and Malla periods",
            class: "11",
            date: "2024-01-23",
            views: 1650,
            tags: ["history", "nepal", "ancient"]
        },
        {
            id: 49,
            title: "Geography - Climate and Vegetation",
            description: "Climate zones, vegetation types, and natural resources",
            class: "11",
            date: "2024-02-10",
            views: 1520,
            tags: ["geography", "climate", "vegetation"]
        },
        {
            id: 50,
            title: "Civics - Constitution of Nepal",
            description: "Fundamental rights, duties, and government structure",
            class: "12",
            date: "2024-02-19",
            views: 1420,
            tags: ["civics", "constitution", "rights"]
        }
    ]
};

// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const subject = urlParams.get('subject') || 'all';
const classLevel = urlParams.get('class') || 'all';
const searchQuery = urlParams.get('search') || '';

// Subject names mapping
const subjectNames = {
    physics: 'Physics',
    chemistry: 'Chemistry',
    biology: 'Biology',
    mathematics: 'Mathematics',
    computer: 'Computer Science',
    english: 'English',
    nepali: 'Nepali',
    accountancy: 'Accountancy',
    economics: 'Economics',
    business: 'Business Studies',
    statistics: 'Statistics',
    social: 'Social Studies'
};

// Class names mapping
const classNames = {
    '11': 'Class 11',
    '12': 'Class 12',
    'bachelor': "Bachelor's Level",
    'master': "Master's Level"
};

// Update page title and breadcrumb
function updatePageInfo() {
    const subjectTitle = document.getElementById('subjectTitle');
    const currentSubject = document.getElementById('currentSubject');

    let title = 'All Notes';
    
    if (searchQuery) {
        title = `Search Results for "${searchQuery}"`;
    } else if (subject !== 'all' && classLevel !== 'all') {
        title = `${subjectNames[subject]} - ${classNames[classLevel]}`;
    } else if (subject !== 'all') {
        title = `${subjectNames[subject]} Notes`;
    } else if (classLevel !== 'all') {
        title = `${classNames[classLevel]} Notes`;
    }

    subjectTitle.textContent = title;
    currentSubject.textContent = title;
    document.title = `${title} - Gyanu Note`;
}

// Load and display notes
function loadNotes() {
    const notesContainer = document.getElementById('notesContainer');
    let notes = [];

    // Collect all notes
    if (subject === 'all') {
        Object.values(notesDatabase).forEach(subjectNotes => {
            notes = notes.concat(subjectNotes);
        });
    } else {
        notes = notesDatabase[subject] || [];
    }

    // Filter by class
    if (classLevel !== 'all') {
        notes = notes.filter(note => note.class === classLevel);
    }

    // Filter by search query
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        notes = notes.filter(note => 
            note.title.toLowerCase().includes(query) ||
            note.description.toLowerCase().includes(query) ||
            note.tags.some(tag => tag.toLowerCase().includes(query))
        );
    }

    // Display notes
    if (notes.length === 0) {
        notesContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <h3 style="color: var(--text-color); margin-bottom: 1rem;">No notes found</h3>
                <p style="color: #64748b;">Try adjusting your filters or search query</p>
                <a href="index.html" class="btn" style="margin-top: 1rem;">Back to Home</a>
            </div>
        `;
        return;
    }

    notesContainer.innerHTML = notes.map(note => {
        const subjectKey = Object.keys(notesDatabase).find(key => 
            notesDatabase[key].includes(note)
        );
        
        return `
            <div class="note-card">
                <div class="note-card-header">
                    <span class="class-badge">${classNames[note.class]}</span>
                    <h3>${note.title}</h3>
                </div>
                <div class="note-card-body">
                    <p>${note.description}</p>
                    <div class="note-meta-info">
                        <span>📅 ${formatDate(note.date)}</span>
                        <span>👁️ ${note.views}</span>
                    </div>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
                        ${note.tags.slice(0, 3).map(tag => 
                            `<span style="background: var(--light-color); padding: 0.3rem 0.8rem; border-radius: 15px; font-size: 0.85rem;">#${tag}</span>`
                        ).join('')}
                    </div>
                    <a href="note-detail.html?id=${note.id}&subject=${subjectKey}&class=${note.class}" class="btn">Read More</a>
                </div>
            </div>
        `;
    }).join('');
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Search within notes page
const notesSearch = document.getElementById('notesSearch');
if (notesSearch) {
    notesSearch.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const noteCards = document.querySelectorAll('.note-card');
        
        noteCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(query) || description.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Class filter
const classFilter = document.getElementById('classFilter');
if (classFilter) {
    classFilter.value = classLevel;
    classFilter.addEventListener('change', (e) => {
        const newClass = e.target.value;
        const newUrl = new URL(window.location);
        if (newClass === 'all') {
            newUrl.searchParams.delete('class');
        } else {
            newUrl.searchParams.set('class', newClass);
        }
        window.location.href = newUrl.toString();
    });
}

// Sort functionality
const sortBy = document.getElementById('sortBy');
if (sortBy) {
    sortBy.addEventListener('change', (e) => {
        const sortType = e.target.value;
        const notesContainer = document.getElementById('notesContainer');
        const noteCards = Array.from(notesContainer.children);
        
        noteCards.sort((a, b) => {
            if (sortType === 'popular') {
                const viewsA = parseInt(a.querySelector('.note-meta-info span:last-child').textContent.match(/\d+/)[0]);
                const viewsB = parseInt(b.querySelector('.note-meta-info span:last-child').textContent.match(/\d+/)[0]);
                return viewsB - viewsA;
            } else if (sortType === 'title') {
                const titleA = a.querySelector('h3').textContent;
                const titleB = b.querySelector('h3').textContent;
                return titleA.localeCompare(titleB);
            }
            return 0; // recent (default order)
        });
        
        noteCards.forEach(card => notesContainer.appendChild(card));
    });
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
    updatePageInfo();
    loadNotes();
});