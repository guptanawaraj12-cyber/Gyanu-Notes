// ------------------------
// Section Navigation
// ------------------------
const sections = {
  home: document.getElementById("home"),
  notes: document.getElementById("notes"),
  paper: document.getElementById("paper"),
  about: document.getElementById("about"),
  contact: document.getElementById("contact")
};

// Menu links
document.getElementById("home-link").addEventListener("click", () => showSection("home"));
document.getElementById("notes-link").addEventListener("click", () => showSection("notes"));
document.getElementById("paper-link").addEventListener("click", () => showSection("paper"));
document.getElementById("about-link").addEventListener("click", () => showSection("about"));
document.getElementById("contact-link").addEventListener("click", () => showSection("contact"));

// Footer quick links
document.getElementById("footer-home").addEventListener("click", () => showSection("home"));
document.getElementById("footer-notes").addEventListener("click", () => showSection("notes"));
document.getElementById("footer-paper").addEventListener("click", () => showSection("paper"));
document.getElementById("footer-about").addEventListener("click", () => showSection("about"));
document.getElementById("footer-contact").addEventListener("click", () => showSection("contact"));

// Show section function with smooth scroll
function showSection(sectionId) {
  for (let key in sections) {
    sections[key].classList.remove("active-section");
  }
  sections[sectionId].classList.add("active-section");
  sections[sectionId].scrollIntoView({ behavior: "smooth", block: "start" });
}

// ------------------------
// Notes Section Logic
// ------------------------
const studyData = {
  8: { Math: ["Chapter 1", "Chapter 2"], Science: ["Chapter A", "Chapter B"] },
  9: { Math: ["Chapter 1", "Chapter 2"], Science: ["Chapter A", "Chapter B"] },
  10: { Math: ["Chapter 1", "Chapter 2"], Science: ["Chapter A", "Chapter B"] },
  11: { Physics: ["Chapter 1", "Chapter 2"], Chemistry: ["Chapter 1", "Chapter 2"] },
  12: { Physics: ["Chapter 1", "Chapter 2"], Chemistry: ["Chapter 1", "Chapter 2"] }
};

const classButtons = document.querySelectorAll("#class-select button");
const subjectSelect = document.querySelector("#subject-select");
const chapterSelect = document.querySelector("#chapter-select");
const noteDisplay = document.querySelector("#note-display");

classButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const selectedClass = btn.dataset.class;
    subjectSelect.querySelector(".options").innerHTML = "";
    chapterSelect.querySelector(".options").innerHTML = "";
    noteDisplay.querySelector(".note-content").textContent = "";
    chapterSelect.classList.add("hidden");
    noteDisplay.classList.add("hidden");

    for (let sub in studyData[selectedClass]) {
      const subBtn = document.createElement("button");
      subBtn.textContent = sub;
      subBtn.addEventListener("click", () => {
        chapterSelect.querySelector(".options").innerHTML = "";
        noteDisplay.querySelector(".note-content").textContent = "";
        noteDisplay.classList.add("hidden");

        studyData[selectedClass][sub].forEach(chap => {
          const chapBtn = document.createElement("button");
          chapBtn.textContent = chap;
          chapBtn.addEventListener("click", () => {
            noteDisplay.querySelector(".note-content").textContent = `Notes for Class ${selectedClass} - ${sub} - ${chap}`;
            noteDisplay.classList.remove("hidden");
          });
          chapterSelect.querySelector(".options").appendChild(chapBtn);
        });
        chapterSelect.classList.remove("hidden");
      });
      subjectSelect.querySelector(".options").appendChild(subBtn);
    }
    subjectSelect.classList.remove("hidden");
  });
});

// ------------------------
// Paper Section Logic
// ------------------------
const paperData = {
  8: { Math: ["Paper 1", "Paper 2"], Science: ["Paper A", "Paper B"] },
  9: { Math: ["Paper 1", "Paper 2"], Science: ["Paper A", "Paper B"] },
  10: { Math: ["Paper 1", "Paper 2"], Science: ["Paper A", "Paper B"] },
  11: { Physics: ["Paper 1","Paper 2"], Chemistry:["Paper 1","Paper 2"] },
  12: { Physics: ["Paper 1","Paper 2"], Chemistry:["Paper 1","Paper 2"] }
};

const paperClassButtons = document.querySelectorAll("#paper-class-select button");
const paperSubjectSelect = document.querySelector("#paper-subject-select");
const paperDisplay = document.querySelector("#paper-display");

paperClassButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const selectedClass = btn.dataset.class;
    paperSubjectSelect.querySelector(".options").innerHTML = "";
    paperDisplay.querySelector(".note-content").textContent = "";
    paperDisplay.classList.add("hidden");

    for (let sub in paperData[selectedClass]) {
      const subBtn = document.createElement("button");
      subBtn.textContent = sub;
      subBtn.addEventListener("click", () => {
        paperDisplay.querySelector(".note-content").textContent = `Papers for Class ${selectedClass} - ${sub}: ${paperData[selectedClass][sub].join(", ")}`;
        paperDisplay.classList.remove("hidden");
      });
      paperSubjectSelect.querySelector(".options").appendChild(subBtn);
    }
    paperSubjectSelect.classList.remove("hidden");
  });
});

// ------------------------
// Search Functionality
// ------------------------
document.getElementById("search-btn").addEventListener("click", () => {
  const query = document.getElementById("search-input").value.toLowerCase();
  let result = "";

  // Search Notes
  for (let cls in studyData) {
    for (let sub in studyData[cls]) {
      for (let chap of studyData[cls][sub]) {
        if (`class ${cls} ${sub} ${chap}`.toLowerCase().includes(query)) {
          result += `Note Found: Class ${cls} - ${sub} - ${chap}<br>`;
        }
      }
    }
  }

  // Search Papers
  for (let cls in paperData) {
    for (let sub in paperData[cls]) {
      for (let p of paperData[cls][sub]) {
        if (`class ${cls} ${sub} ${p}`.toLowerCase().includes(query)) {
          result += `Paper Found: Class ${cls} - ${sub} - ${p}<br>`;
        }
      }
    }
  }

  document.getElementById("search-result").innerHTML = result || "No results found!";
});

// ------------------------
// Modal Login/Register Logic
// ------------------------
const modal = document.getElementById("auth-modal");
const loginLink = document.getElementById("login-link");
const closeBtn = modal.querySelector(".close-btn");
const showRegister = document.getElementById("show-register");
const showLogin = document.getElementById("show-login");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

loginLink.addEventListener("click", () => modal.classList.remove("hidden"));
closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
showRegister.addEventListener("click", () => { loginForm.classList.add("hidden"); registerForm.classList.remove("hidden"); });
showLogin.addEventListener("click", () => { registerForm.classList.add("hidden"); loginForm.classList.remove("hidden"); });
