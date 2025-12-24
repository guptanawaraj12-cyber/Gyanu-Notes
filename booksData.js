// Complete books data for all subjects
const booksData = {
    'Nepali': [
        {
            title: 'नेपाली व्याकरण - Complete Grammar Guide',
            author: 'Dr. Ram Prasad Sharma',
            publisher: 'Ekta Books',
            edition: '5th Edition',
            pages: 450,
            size: '15.2 MB',
            rating: 4.8,
            description: 'Comprehensive Nepali grammar covering all aspects from basics to advanced level. Perfect for students from class 8 to 12.',
            coverColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            downloadUrl: '#'
        },
        {
            title: 'साहित्य संग्रह - Poetry & Prose Collection',
            author: 'Various Authors',
            publisher: 'Ratna Pustak Bhandar',
            edition: '3rd Edition',
            pages: 380,
            size: '12.5 MB',
            rating: 4.7,
            description: 'Collection of selected poems and prose from renowned Nepali authors. Includes analysis and interpretations.',
            coverColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            downloadUrl: '#'
        },
        {
            title: 'निबन्ध लेखन - Essay Writing Mastery',
            author: 'Prof. Krishna Bahadur KC',
            publisher: 'Vidyarthi Pustak Bhandar',
            edition: '4th Edition',
            pages: 320,
            size: '10.8 MB',
            rating: 4.6,
            description: 'Master the art of essay writing in Nepali with examples, techniques, and practice exercises.',
            coverColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            downloadUrl: '#'
        },
        {
            title: 'कथा संग्रह - Short Story Anthology',
            author: 'Compiled by Bishnu Kumari Waiba',
            publisher: 'Sajha Prakashan',
            edition: '2nd Edition',
            pages: 420,
            size: '14.0 MB',
            rating: 4.9,
            description: 'Anthology of classic and modern Nepali short stories with detailed analysis and comprehension questions.',
            coverColor: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            downloadUrl: '#'
        }
    ],
    'English': [
        {
            title: 'English Grammar & Composition - Complete Guide',
            author: 'Wren & Martin (Revised)',
            publisher: 'S. Chand Publishing',
            edition: '8th Edition',
            pages: 580,
            size: '18.5 MB',
            rating: 4.9,
            description: 'The most comprehensive English grammar book covering all aspects with thousands of exercises.',
            coverColor: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            downloadUrl: '#'
        },
        {
            title: 'Literature Anthology - Classic & Modern',
            author: 'Various Authors',
            publisher: 'Oxford University Press',
            edition: '6th Edition',
            pages: 520,
            size: '16.8 MB',
            rating: 4.8,
            description: 'Collection of classic and contemporary English literature including poetry, prose, and drama.',
            coverColor: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
            downloadUrl: '#'
        },
        {
            title: 'Advanced English Writing Skills',
            author: 'Dr. Sarah Johnson',
            publisher: 'Cambridge Press',
            edition: '4th Edition',
            pages: 420,
            size: '13.5 MB',
            rating: 4.7,
            description: 'Develop advanced writing skills including essays, reports, letters, and creative writing.',
            coverColor: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            downloadUrl: '#'
        },
        {
            title: 'Vocabulary Builder - Master Edition',
            author: 'Norman Lewis',
            publisher: 'Penguin Random House',
            edition: '5th Edition',
            pages: 480,
            size: '15.0 MB',
            rating: 4.9,
            description: 'Build a powerful vocabulary with systematic approach and memory techniques.',
            coverColor: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
            downloadUrl: '#'
        }
    ],
    'Maths': [
        {
            title: 'Mathematics Complete Guide - All Topics',
            author: 'R.D. Sharma',
            publisher: 'Dhanpat Rai Publications',
            edition: '10th Edition',
            pages: 850,
            size: '28.5 MB',
            rating: 4.9,
            description: 'Complete mathematics guide covering algebra, geometry, trigonometry, calculus, and statistics.',
            coverColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            downloadUrl: '#'
        },
        {
            title: 'Problem Solving Techniques & Strategies',
            author: 'Dr. Ramesh Kumar',
            publisher: 'Arihant Publications',
            edition: '7th Edition',
            pages: 620,
            size: '20.2 MB',
            rating: 4.8,
            description: 'Master problem-solving with proven techniques and strategies for competitive exams.',
            coverColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            downloadUrl: '#'
        },
        {
            title: 'Mathematics Practice Book - 1000+ Problems',
            author: 'S.K. Goyal',
            publisher: 'Bharati Bhawan',
            edition: '5th Edition',
            pages: 720,
            size: '24.0 MB',
            rating: 4.7,
            description: 'Over 1000 practice problems with detailed solutions covering all mathematics topics.',
            coverColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            downloadUrl: '#'
        },
        {
            title: 'Advanced Mathematics - Theory & Practice',
            author: 'Prof. M.L. Khanna',
            publisher: 'Jai Prakash Nath',
            edition: '6th Edition',
            pages: 950,
            size: '32.0 MB',
            rating: 4.9,
            description: 'Advanced mathematics for higher secondary with comprehensive theory and practice.',
            coverColor: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            downloadUrl: '#'
        }
    ],
    'Computer': [
        {
            title: 'Computer Science Fundamentals',
            author: 'Dr. Pradeep K. Sinha',
            publisher: 'BPB Publications',
            edition: '9th Edition',
            pages: 680,
            size: '22.5 MB',
            rating: 4.8,
            description: 'Comprehensive computer science fundamentals covering hardware, software, and programming.',
            coverColor: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            downloadUrl: '#'
        },
        {
            title: 'Programming Guide - C/C++/Python',
            author: 'Yashavant Kanetkar',
            publisher: 'BPB Publications',
            edition: '8th Edition',
            pages: 750,
            size: '25.0 MB',
            rating: 4.9,
            description: 'Complete programming guide for C, C++, and Python with examples and projects.',
            coverColor: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
            downloadUrl: '#'
        },
        {
            title: 'Web Development Handbook',
            author: 'Jon Duckett',
            publisher: 'Wiley Publications',
            edition: '5th Edition',
            pages: 520,
            size: '18.0 MB',
            rating: 4.7,
            description: 'Learn HTML, CSS, JavaScript, and modern web development frameworks.',
            coverColor: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            downloadUrl: '#'
        },
        {
            title: 'Database Management Systems',
            author: 'Raghu Ramakrishnan',
            publisher: 'McGraw Hill',
            edition: '6th Edition',
            pages: 620,
            size: '21.0 MB',
            rating: 4.8,
            description: 'Comprehensive guide to database concepts, SQL, and database design.',
            coverColor: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
            downloadUrl: '#'
        }
    ],
    'Science': [
        {
            title: 'Integrated Science - Physics, Chemistry, Biology',
            author: 'Dr. S.K. Agarwal',
            publisher: 'S. Chand Publishing',
            edition: '7th Edition',
            pages: 780,
            size: '26.0 MB',
            rating: 4.8,
            description: 'Integrated science covering all three branches with experiments and activities.',
            coverColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            downloadUrl: '#'
        },
        {
            title: 'Physics Concepts & Applications',
            author: 'H.C. Verma',
            publisher: 'Bharati Bhawan',
            edition: '8th Edition',
            pages: 650,
            size: '22.0 MB',
            rating: 4.9,
            description: 'Conceptual physics with real-world applications and problem-solving.',
            coverColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            downloadUrl: '#'
        },
        {
            title: 'Chemistry & Biology Complete Guide',
            author: 'Dr. N.K. Verma',
            publisher: 'Pradeep Publications',
            edition: '6th Edition',
            pages: 720,
            size: '24.5 MB',
            rating: 4.7,
            description: 'Complete guide to chemistry and biology for secondary level students.',
            coverColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            downloadUrl: '#'
        },
        {
            title: 'Science Practical Manual',
            author: 'Dr. Lakhmir Singh',
            publisher: 'S. Chand Publishing',
            edition: '5th Edition',
            pages: 420,
            size: '14.0 MB',
            rating: 4.8,
            description: 'Comprehensive practical manual with experiments, observations, and viva questions.',
            coverColor: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            downloadUrl: '#'
        }
    ],
    'Opt. Maths': [
        {
            title: 'Optional Mathematics Complete Guide',
            author: 'Dr. Simkhada & Team',
            publisher: 'Sukunda Pustak Bhawan',
            edition: '8th Edition',
            pages: 920,
            size: '30.0 MB',
            rating: 4.9,
            description: 'Complete optional mathematics covering all topics with detailed solutions.',
            coverColor: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            downloadUrl: '#'
        },
        {
            title: 'Advanced Problem Solving Techniques',
            author: 'Prof. R.K. Shrestha',
            publisher: 'Asmita Books',
            edition: '6th Edition',
            pages: 680,
            size: '23.0 MB',
            rating: 4.8,
            description: 'Advanced problem-solving techniques for optional mathematics.',
            coverColor: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
            downloadUrl: '#'
        },
        {
            title: 'Mathematics Olympiad Preparation',
            author: 'Dr. Titu Andreescu',
            publisher: 'Springer',
            edition: '4th Edition',
            pages: 580,
            size: '19.5 MB',
            rating: 4.9,
            description: 'Prepare for mathematics olympiads with challenging problems and solutions.',
            coverColor: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            downloadUrl: '#'
        },
        {
            title: 'Calculus & Trigonometry Mastery',
            author: 'Prof. M.K. Jha',
            publisher: 'Ratna Sagar',
            edition: '7th Edition',
            pages: 750,
            size: '25.5 MB',
            rating: 4.8,
            description: 'Master calculus and trigonometry with comprehensive theory and practice.',
            coverColor: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
            downloadUrl: '#'
        }
    ],
    'Account': [
        {
            title: 'Principles of Accounting - Fundamentals',
            author: 'T.S. Grewal',
            publisher: 'S. Chand Publishing',
            edition: '12th Edition',
            pages: 620,
            size: '21.0 MB',
            rating: 4.9,
            description: 'Fundamental accounting principles with practical examples and exercises.',
            coverColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            downloadUrl: '#'
        },
        {
            title: 'Financial Accounting - Advanced',
            author: 'Dr. S.N. Maheshwari',
            publisher: 'Vikas Publishing',
            edition: '10th Edition',
            pages: 780,
            size: '26.5 MB',
            rating: 4.8,
            description: 'Advanced financial accounting covering partnership, company accounts, and more.',
            coverColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            downloadUrl: '#'
        },
        {
            title: 'Advanced Accountancy - Theory & Practice',
            author: 'M.C. Shukla',
            publisher: 'S. Chand Publishing',
            edition: '11th Edition',
            pages: 850,
            size: '28.0 MB',
            rating: 4.9,
            description: 'Comprehensive accountancy covering all advanced topics with solved problems.',
            coverColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            downloadUrl: '#'
        },
        {
            title: 'Accounting Standards & Practices',
            author: 'Dr. Ashok Sehgal',
            publisher: 'Taxmann Publications',
            edition: '8th Edition',
            pages: 520,
            size: '17.5 MB',
            rating: 4.7,
            description: 'Understanding accounting standards and their practical applications.',
            coverColor: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            downloadUrl: '#'
        }
    ],
    'Economics': [
        {
            title: 'Microeconomics - Complete Guide',
            author: 'Dr. Sandeep Garg',
            publisher: 'Dhanpat Rai Publications',
            edition: '9th Edition',
            pages: 580,
            size: '19.5 MB',
            rating: 4.8,
            description: 'Comprehensive microeconomics covering consumer behavior, production, and markets.',
            coverColor: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            downloadUrl: '#'
        },
        {
            title: 'Macroeconomics - Theory & Application',
            author: 'T.R. Jain',
            publisher: 'VK Publications',
            edition: '8th Edition',
            pages: 620,
            size: '21.0 MB',
            rating: 4.9,
            description: 'Macroeconomics covering national income, money, banking, and fiscal policy.',
            coverColor: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
            downloadUrl: '#'
        },
        {
            title: 'Economics for Beginners',
            author: 'Dr. Ramesh Singh',
            publisher: 'McGraw Hill',
            edition: '7th Edition',
            pages: 480,
            size: '16.0 MB',
            rating: 4.7,
            description: 'Easy-to-understand economics for beginners with real-world examples.',
            coverColor: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            downloadUrl: '#'
        },
        {
            title: 'Applied Economics - Real World Cases',
            author: 'Prof. Amartya Sen',
            publisher: 'Oxford University Press',
            edition: '5th Edition',
            pages: 550,
            size: '18.5 MB',
            rating: 4.8,
            description: 'Applied economics with case studies and real-world applications.',
            coverColor: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
            downloadUrl: '#'
        }
    ],
    'Chemistry': [
        {
            title: 'Organic Chemistry - Complete Guide',
            author: 'Morrison & Boyd',
            publisher: 'Pearson Education',
            edition: '7th Edition',
            pages: 920,
            size: '31.0 MB',
            rating: 4.9,
            description: 'Comprehensive organic chemistry covering all reactions and mechanisms.',
            coverColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            downloadUrl: '#'
        },
        {
            title: 'Inorganic Chemistry - Theory & Practice',
            author: 'J.D. Lee',
            publisher: 'Wiley Publications',
            edition: '6th Edition',
            pages: 780,
            size: '26.5 MB',
            rating: 4.8,
            description: 'Complete inorganic chemistry with coordination compounds and metallurgy.',
            coverColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            downloadUrl: '#'
        },
        {
            title: 'Physical Chemistry - Concepts & Problems',
            author: 'P.W. Atkins',
            publisher: 'Oxford University Press',
            edition: '10th Edition',
            pages: 850,
            size: '28.5 MB',
            rating: 4.9,
            description: 'Physical chemistry covering thermodynamics, kinetics, and quantum chemistry.',
            coverColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            downloadUrl: '#'
        },
        {
            title: 'Chemistry Practical Manual',
            author: 'Dr. N.K. Verma',
            publisher: 'Pradeep Publications',
            edition: '5th Edition',
            pages: 420,
            size: '14.0 MB',
            rating: 4.7,
            description: 'Complete chemistry practical manual with experiments and viva questions.',
            coverColor: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            downloadUrl: '#'
        }
    ],
    'Physics': [
        {
            title: 'Mechanics & Thermodynamics',
            author: 'H.C. Verma',
            publisher: 'Bharati Bhawan',
            edition: '8th Edition',
            pages: 720,
            size: '24.0 MB',
            rating: 4.9,
            description: 'Comprehensive mechanics and thermodynamics with conceptual problems.',
            coverColor: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            downloadUrl: '#'
        },
        {
            title: 'Electricity & Magnetism - Complete Guide',
            author: 'D.C. Pandey',
            publisher: 'Arihant Publications',
            edition: '7th Edition',
            pages: 680,
            size: '23.0 MB',
            rating: 4.8,
            description: 'Complete guide to electricity and magnetism with solved examples.',
            coverColor: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
            downloadUrl: '#'
        },
        {
            title: 'Modern Physics - Quantum & Nuclear',
            author: 'Arthur Beiser',
            publisher: 'McGraw Hill',
            edition: '6th Edition',
            pages: 620,
            size: '21.0 MB',
            rating: 4.9,
            description: 'Modern physics covering quantum mechanics and nuclear physics.',
            coverColor: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            downloadUrl: '#'
        },
        {
            title: 'Physics Problem Solver',
            author: 'Dr. I.E. Irodov',
            publisher: 'Mir Publishers',
            edition: '5th Edition',
            pages: 580,
            size: '19.5 MB',
            rating: 4.8,
            description: 'Challenging physics problems with detailed solutions for advanced students.',
            coverColor: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
            downloadUrl: '#'
        }
    ],
    'Biology': [
        {
            title: 'Cell Biology & Genetics',
            author: 'Dr. Trueman',
            publisher: 'Pradeep Publications',
            edition: '8th Edition',
            pages: 650,
            size: '22.0 MB',
            rating: 4.8,
            description: 'Comprehensive cell biology and genetics with diagrams and illustrations.',
            coverColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            downloadUrl: '#'
        },
        {
            title: 'Human Physiology - Complete Guide',
            author: 'Dr. Guyton & Hall',
            publisher: 'Elsevier',
            edition: '13th Edition',
            pages: 820,
            size: '27.5 MB',
            rating: 4.9,
            description: 'Complete human physiology covering all body systems in detail.',
            coverColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            downloadUrl: '#'
        },
        {
            title: 'Ecology & Environment',
            author: 'Dr. P.D. Sharma',
            publisher: 'Rastogi Publications',
            edition: '7th Edition',
            pages: 520,
            size: '17.5 MB',
            rating: 4.7,
            description: 'Ecology and environmental science with conservation strategies.',
            coverColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            downloadUrl: '#'
        },
        {
            title: 'Biotechnology & Molecular Biology',
            author: 'Dr. B.D. Singh',
            publisher: 'Kalyani Publishers',
            edition: '6th Edition',
            pages: 720,
            size: '24.5 MB',
            rating: 4.8,
            description: 'Modern biotechnology and molecular biology with applications.',
            coverColor: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            downloadUrl: '#'
        }
    ]
};