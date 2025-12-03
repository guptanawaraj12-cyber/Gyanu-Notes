// Class subjects data
const classSubjects = {
    '11': {
        title: 'Class 11 Notes',
        subtitle: 'NEB Curriculum - Grade XI',
        subjects: [
            { id: 'physics', name: 'Physics', icon: '⚛️', description: 'Mechanics, Heat, Optics', units: 8 },
            { id: 'chemistry', name: 'Chemistry', icon: '🧪', description: 'General & Physical Chemistry', units: 10 },
            { id: 'biology', name: 'Biology', icon: '🧬', description: 'Botany & Zoology', units: 12 },
            { id: 'mathematics', name: 'Mathematics', icon: '📐', description: 'Algebra, Trigonometry, Calculus', units: 15 },
            { id: 'english', name: 'English', icon: '📖', description: 'Grammar & Literature', units: 8 },
            { id: 'nepali', name: 'Nepali', icon: '📝', description: 'व्याकरण र साहित्य', units: 8 },
            { id: 'computer', name: 'Computer Science', icon: '💻', description: 'Programming & Database', units: 10 },
            { id: 'accountancy', name: 'Accountancy', icon: '💰', description: 'Financial Accounting', units: 12 },
            { id: 'economics', name: 'Economics', icon: '📊', description: 'Microeconomics', units: 10 },
            { id: 'social', name: 'Social Studies', icon: '🌍', description: 'History & Geography', units: 8 },
            { id: 'business', name: 'Business Studies', icon: '💼', description: 'Business Fundamentals', units: 10 },
            { id: 'statistics', name: 'Statistics', icon: '📈', description: 'Descriptive Statistics', units: 8 }
        ]
    },
    '12': {
        title: 'Class 12 Notes',
        subtitle: 'NEB Curriculum - Grade XII',
        subjects: [
            { id: 'physics', name: 'Physics', icon: '⚛️', description: 'Electricity, Magnetism, Modern Physics', units: 10 },
            { id: 'chemistry', name: 'Chemistry', icon: '🧪', description: 'Organic & Inorganic Chemistry', units: 12 },
            { id: 'biology', name: 'Biology', icon: '🧬', description: 'Genetics, Evolution, Ecology', units: 14 },
            { id: 'mathematics', name: 'Mathematics', icon: '📐', description: 'Calculus, Vectors, Statistics', units: 16 },
            { id: 'english', name: 'English', icon: '📖', description: 'Advanced Grammar & Literature', units: 10 },
            { id: 'nepali', name: 'Nepali', icon: '📝', description: 'उच्च व्याकरण र साहित्य', units: 10 },
            { id: 'computer', name: 'Computer Science', icon: '💻', description: 'Web Technology & Networking', units: 12 },
            { id: 'accountancy', name: 'Accountancy', icon: '💰', description: 'Advanced Accounting', units: 14 },
            { id: 'economics', name: 'Economics', icon: '📊', description: 'Macroeconomics', units: 12 },
            { id: 'social', name: 'Social Studies', icon: '🌍', description: 'Contemporary World', units: 10 },
            { id: 'business', name: 'Business Studies', icon: '💼', description: 'Business Management', units: 12 },
            { id: 'statistics', name: 'Statistics', icon: '📈', description: 'Inferential Statistics', units: 10 }
        ]
    },
    'bachelor': {
        title: "Bachelor's Level Notes",
        subtitle: 'BBS, BBA, BSc, BA, BIT Programs',
        subjects: [
            { id: 'accountancy', name: 'Accountancy', icon: '💰', description: 'Financial & Management Accounting', units: 20 },
            { id: 'business', name: 'Business Studies', icon: '💼', description: 'Management, Marketing, Finance', units: 25 },
            { id: 'economics', name: 'Economics', icon: '📊', description: 'Micro, Macro, Development Economics', units: 18 },
            { id: 'statistics', name: 'Statistics', icon: '📈', description: 'Applied Statistics & Research', units: 16 },
            { id: 'mathematics', name: 'Mathematics', icon: '📐', description: 'Advanced Mathematics', units: 20 },
            { id: 'computer', name: 'Computer Science', icon: '💻', description: 'Programming, DSA, DBMS', units: 30 },
            { id: 'english', name: 'English', icon: '📖', description: 'Business English & Communication', units: 12 },
            { id: 'nepali', name: 'Nepali', icon: '📝', description: 'नेपाली साहित्य', units: 10 },
            { id: 'finance', name: 'Finance', icon: '💵', description: 'Corporate Finance & Investment', units: 15 },
            { id: 'marketing', name: 'Marketing', icon: '📢', description: 'Marketing Management', units: 14 },
            { id: 'hrm', name: 'Human Resource', icon: '👥', description: 'HRM & Organizational Behavior', units: 12 },
            { id: 'law', name: 'Business Law', icon: '⚖️', description: 'Commercial & Corporate Law', units: 10 }
        ]
    },
    'master': {
        title: "Master's Level Notes",
        subtitle: 'MBS, MBA, MSc, MA Programs',
        subjects: [
            { id: 'business', name: 'Business Administration', icon: '💼', description: 'Strategic Management', units: 20 },
            { id: 'finance', name: 'Finance', icon: '💵', description: 'Financial Management & Analysis', units: 18 },
            { id: 'marketing', name: 'Marketing', icon: '📢', description: 'Advanced Marketing Strategies', units: 16 },
            { id: 'hrm', name: 'Human Resource', icon: '👥', description: 'Strategic HRM', units: 15 },
            { id: 'economics', name: 'Economics', icon: '📊', description: 'Advanced Economic Theory', units: 20 },
            { id: 'accountancy', name: 'Accountancy', icon: '💰', description: 'Advanced Accounting & Auditing', units: 18 },
            { id: 'statistics', name: 'Statistics', icon: '📈', description: 'Advanced Statistical Methods', units: 16 },
            { id: 'computer', name: 'Computer Science', icon: '💻', description: 'Advanced Computing', units: 25 },
            { id: 'research', name: 'Research Methods', icon: '🔬', description: 'Research Methodology', units: 12 },
            { id: 'operations', name: 'Operations Management', icon: '⚙️', description: 'Operations & Supply Chain', units: 14 }
        ]
    }
};

// Get class from URL
const urlParams = new URLSearchParams(window.location.search);
const classLevel = urlParams.get('class');

// Load class details
function loadClassDetails() {
    const classData = classSubjects[classLevel];
    
    if (!classData) {
        document.getElementById('classTitle').textContent = 'Class Not Found';
        document.getElementById('classSubtitle').textContent = 'Please select a valid class';
        return;
    }

    // Update page content
    document.getElementById('classTitle').textContent = classData.title;
    document.getElementById('classSubtitle').textContent = classData.subtitle;
    document.getElementById('currentClass').textContent = classData.title;
    document.title = `${classData.title} - Gyanu Note`;

    // Load subjects
    const subjectsContainer = document.getElementById('classSubjects');
    subjectsContainer.innerHTML = classData.subjects.map(subject => `
        <div class="subject-card">
            <div class="subject-icon">${subject.icon}</div>
            <h3>${subject.name}</h3>
            <p>${subject.description}</p>
            <p style="color: var(--primary-color); font-weight: 600; margin: 0.5rem 0;">
                ${subject.units} Units Available
            </p>
            <a href="notes.html?subject=${subject.id}&class=${classLevel}" class="btn">View Notes</a>
        </div>
    `).join('');
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
    loadClassDetails();
});