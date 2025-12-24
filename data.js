// Data structure for classes and subjects
const classData = {
    8: ['Nepali', 'English', 'Maths', 'Computer', 'Science', 'Opt. Maths'],
    9: ['Nepali', 'English', 'Maths', 'Computer', 'Science', 'Opt. Maths', 'Account', 'Economics'],
    10: ['Nepali', 'English', 'Maths', 'Computer', 'Science', 'Opt. Maths', 'Account', 'Economics'],
    11: ['Nepali', 'English', 'Chemistry', 'Physics', 'Maths', 'Computer', 'Biology'],
    12: ['Nepali', 'English', 'Chemistry', 'Physics', 'Maths', 'Computer', 'Biology']
};

// Sample notes data for each class and subject
const notesData = {
    8: {
        'Nepali': [
            'Chapter 1: व्याकरण - Grammar Basics',
            'Chapter 2: कविता - Poetry Collection',
            'Chapter 3: निबन्ध - Essay Writing',
            'Chapter 4: कथा - Short Stories',
            'Chapter 5: पत्र लेखन - Letter Writing'
        ],
        'English': [
            'Chapter 1: Grammar Fundamentals',
            'Chapter 2: Reading Comprehension',
            'Chapter 3: Writing Skills',
            'Chapter 4: Poetry Analysis',
            'Chapter 5: Vocabulary Building'
        ],
        'Maths': [
            'Chapter 1: Algebra Basics',
            'Chapter 2: Geometry',
            'Chapter 3: Mensuration',
            'Chapter 4: Statistics',
            'Chapter 5: Probability'
        ],
        'Computer': [
            'Chapter 1: Introduction to Computer',
            'Chapter 2: MS Office Suite',
            'Chapter 3: Internet & Email',
            'Chapter 4: Programming Basics',
            'Chapter 5: Computer Security'
        ],
        'Science': [
            'Chapter 1: Physics - Motion & Force',
            'Chapter 2: Chemistry - Matter',
            'Chapter 3: Biology - Cell Structure',
            'Chapter 4: Environment & Ecology',
            'Chapter 5: Natural Resources'
        ],
        'Opt. Maths': [
            'Chapter 1: Set Theory',
            'Chapter 2: Advanced Algebra',
            'Chapter 3: Geometry Theorems',
            'Chapter 4: Trigonometry Basics',
            'Chapter 5: Coordinate Geometry'
        ]
    },
    9: {
        'Nepali': [
            'Chapter 1: व्याकरण - Advanced Grammar',
            'Chapter 2: कविता - Modern Poetry',
            'Chapter 3: निबन्ध - Essay Composition',
            'Chapter 4: कथा - Story Analysis',
            'Chapter 5: नाटक - Drama Study'
        ],
        'English': [
            'Chapter 1: Advanced Grammar',
            'Chapter 2: Comprehension Skills',
            'Chapter 3: Creative Writing',
            'Chapter 4: Literature Study',
            'Chapter 5: Communication Skills'
        ],
        'Maths': [
            'Chapter 1: Algebra',
            'Chapter 2: Geometry',
            'Chapter 3: Trigonometry',
            'Chapter 4: Statistics',
            'Chapter 5: Mensuration'
        ],
        'Computer': [
            'Chapter 1: Computer System',
            'Chapter 2: Software Applications',
            'Chapter 3: Internet Technology',
            'Chapter 4: Programming in QBASIC',
            'Chapter 5: Database Basics'
        ],
        'Science': [
            'Chapter 1: Motion & Force',
            'Chapter 2: Work & Energy',
            'Chapter 3: Chemical Reactions',
            'Chapter 4: Cell Biology',
            'Chapter 5: Genetics Basics'
        ],
        'Opt. Maths': [
            'Chapter 1: Advanced Algebra',
            'Chapter 2: Geometry',
            'Chapter 3: Trigonometry',
            'Chapter 4: Calculus Introduction',
            'Chapter 5: Coordinate Geometry'
        ],
        'Account': [
            'Chapter 1: Introduction to Accounting',
            'Chapter 2: Journal Entries',
            'Chapter 3: Ledger Posting',
            'Chapter 4: Trial Balance',
            'Chapter 5: Final Accounts'
        ],
        'Economics': [
            'Chapter 1: Basic Economic Concepts',
            'Chapter 2: Demand & Supply',
            'Chapter 3: Market Structure',
            'Chapter 4: Money & Banking',
            'Chapter 5: National Income'
        ]
    },
    10: {
        'Nepali': [
            'Chapter 1: व्याकरण - Complete Grammar',
            'Chapter 2: कविता - Poetry Anthology',
            'Chapter 3: निबन्ध - Advanced Essays',
            'Chapter 4: कथा - Story Collection',
            'Chapter 5: नाटक - Drama Analysis'
        ],
        'English': [
            'Chapter 1: Grammar Mastery',
            'Chapter 2: Reading & Analysis',
            'Chapter 3: Writing Excellence',
            'Chapter 4: Literature Appreciation',
            'Chapter 5: Language Skills'
        ],
        'Maths': [
            'Chapter 1: Algebra',
            'Chapter 2: Geometry',
            'Chapter 3: Trigonometry',
            'Chapter 4: Statistics',
            'Chapter 5: Probability'
        ],
        'Computer': [
            'Chapter 1: Database Management',
            'Chapter 2: Web Design HTML/CSS',
            'Chapter 3: Programming in C',
            'Chapter 4: Networking Basics',
            'Chapter 5: Cyber Security'
        ],
        'Science': [
            'Chapter 1: Physics - Laws of Motion',
            'Chapter 2: Chemistry - Acids & Bases',
            'Chapter 3: Biology - Life Processes',
            'Chapter 4: Environment Science',
            'Chapter 5: Natural Resources'
        ],
        'Opt. Maths': [
            'Chapter 1: Advanced Algebra',
            'Chapter 2: Geometry Proofs',
            'Chapter 3: Trigonometry',
            'Chapter 4: Calculus',
            'Chapter 5: Vectors'
        ],
        'Account': [
            'Chapter 1: Accounting Principles',
            'Chapter 2: Final Accounts',
            'Chapter 3: Partnership Accounts',
            'Chapter 4: Company Accounts',
            'Chapter 5: Financial Statements'
        ],
        'Economics': [
            'Chapter 1: Microeconomics',
            'Chapter 2: Macroeconomics',
            'Chapter 3: National Income',
            'Chapter 4: Money & Banking',
            'Chapter 5: International Trade'
        ]
    },
    11: {
        'Nepali': [
            'Chapter 1: आधुनिक साहित्य',
            'Chapter 2: कविता संग्रह',
            'Chapter 3: निबन्ध विश्लेषण',
            'Chapter 4: कथा अध्ययन',
            'Chapter 5: नाटक समीक्षा'
        ],
        'English': [
            'Chapter 1: Advanced Grammar',
            'Chapter 2: Literature Study',
            'Chapter 3: Essay Writing',
            'Chapter 4: Poetry Analysis',
            'Chapter 5: Critical Thinking'
        ],
        'Chemistry': [
            'Chapter 1: Atomic Structure',
            'Chapter 2: Chemical Bonding',
            'Chapter 3: States of Matter',
            'Chapter 4: Thermodynamics',
            'Chapter 5: Chemical Equilibrium'
        ],
        'Physics': [
            'Chapter 1: Mechanics',
            'Chapter 2: Heat & Thermodynamics',
            'Chapter 3: Waves & Oscillations',
            'Chapter 4: Optics',
            'Chapter 5: Electrostatics'
        ],
        'Maths': [
            'Chapter 1: Calculus',
            'Chapter 2: Algebra',
            'Chapter 3: Trigonometry',
            'Chapter 4: Vectors',
            'Chapter 5: Coordinate Geometry'
        ],
        'Computer': [
            'Chapter 1: Programming in C',
            'Chapter 2: Data Structures',
            'Chapter 3: Database Management',
            'Chapter 4: Web Technology',
            'Chapter 5: Software Engineering'
        ],
        'Biology': [
            'Chapter 1: Cell Biology',
            'Chapter 2: Genetics',
            'Chapter 3: Evolution',
            'Chapter 4: Ecology',
            'Chapter 5: Plant Physiology'
        ]
    },
    12: {
        'Nepali': [
            'Chapter 1: समकालीन साहित्य',
            'Chapter 2: आधुनिक कविता',
            'Chapter 3: निबन्ध लेखन',
            'Chapter 4: कथा विश्लेषण',
            'Chapter 5: नाटक अध्ययन'
        ],
        'English': [
            'Chapter 1: Advanced Grammar',
            'Chapter 2: Literature Masterpieces',
            'Chapter 3: Critical Analysis',
            'Chapter 4: Creative Writing',
            'Chapter 5: Communication Excellence'
        ],
        'Chemistry': [
            'Chapter 1: Organic Chemistry',
            'Chapter 2: Inorganic Chemistry',
            'Chapter 3: Physical Chemistry',
            'Chapter 4: Environmental Chemistry',
            'Chapter 5: Applied Chemistry'
        ],
        'Physics': [
            'Chapter 1: Modern Physics',
            'Chapter 2: Electromagnetism',
            'Chapter 3: Nuclear Physics',
            'Chapter 4: Electronics',
            'Chapter 5: Quantum Mechanics'
        ],
        'Maths': [
            'Chapter 1: Advanced Calculus',
            'Chapter 2: Linear Algebra',
            'Chapter 3: Probability & Statistics',
            'Chapter 4: Differential Equations',
            'Chapter 5: Complex Numbers'
        ],
        'Computer': [
            'Chapter 1: OOP Concepts',
            'Chapter 2: Data Structures & Algorithms',
            'Chapter 3: Database Systems',
            'Chapter 4: Software Engineering',
            'Chapter 5: Web Development'
        ],
        'Biology': [
            'Chapter 1: Human Physiology',
            'Chapter 2: Biotechnology',
            'Chapter 3: Molecular Biology',
            'Chapter 4: Applied Biology',
            'Chapter 5: Immunology'
        ]
    }
};

// Books data for each subject
const booksData = {
    'Nepali': [
        'नेपाली व्याकरण - Complete Grammar Guide',
        'साहित्य संग्रह - Poetry & Prose Collection',
        'निबन्ध लेखन - Essay Writing Mastery',
        'कथा संग्रह - Short Stories Anthology'
    ],
    'English': [
        'English Grammar & Composition - Complete Guide',
        'Literature Anthology - Classic & Modern',
        'Advanced English Writing - Skills Development',
        'Vocabulary Builder - Word Power'
    ],
    'Maths': [
        'Mathematics Complete Guide - All Topics',
        'Problem Solving Techniques - Step by Step',
        'Mathematics Practice Book - 1000+ Problems',
        'Advanced Mathematics - Olympiad Preparation'
    ],
    'Computer': [
        'Computer Science Fundamentals - Theory & Practice',
        'Programming Guide - C/C++/Python',
        'Web Development Handbook - HTML/CSS/JS',
        'Database Management Systems - Complete Guide'
    ],
    'Science': [
        'Integrated Science - Physics, Chemistry, Biology',
        'Physics Concepts - Theory & Applications',
        'Chemistry & Biology Guide - Comprehensive',
        'Science Experiments - Practical Manual'
    ],
    'Opt. Maths': [
        'Optional Mathematics Complete - All Chapters',
        'Advanced Problem Solving - Techniques',
        'Mathematics Olympiad Prep - Practice Book',
        'Geometry & Trigonometry - Mastery Guide'
    ],
    'Account': [
        'Principles of Accounting - Fundamentals',
        'Financial Accounting - Complete Course',
        'Advanced Accountancy - Professional Guide',
        'Accounting Practice Book - Problems & Solutions'
    ],
    'Economics': [
        'Microeconomics - Theory & Applications',
        'Macroeconomics - National & International',
        'Economics for Beginners - Easy Learning',
        'Economic Analysis - Case Studies'
    ],
    'Chemistry': [
        'Organic Chemistry - Complete Guide',
        'Inorganic Chemistry - Theory & Practice',
        'Physical Chemistry Guide - Concepts',
        'Chemistry Lab Manual - Experiments'
    ],
    'Physics': [
        'Mechanics & Thermodynamics - Fundamentals',
        'Electricity & Magnetism - Complete Course',
        'Modern Physics - Quantum & Nuclear',
        'Physics Problem Solver - 500+ Problems'
    ],
    'Biology': [
        'Cell Biology & Genetics - Comprehensive',
        'Human Physiology - Body Systems',
        'Ecology & Environment - Study Guide',
        'Biotechnology - Modern Applications'
    ]
};