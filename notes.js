// ---------------- Session Check ----------------
const sessionUser = JSON.parse(localStorage.getItem('gyanuSession'));
if(!sessionUser){
  alert("You must be logged in to view notes!");
  window.location.href = "login.html";
}

// ---------------- Burger Menu ----------------
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
burger.addEventListener('click', () => { nav.classList.toggle('active'); });

// ---------------- Dummy Notes Data ----------------
const notes = [
  {title:'Math Notes', desc:'Calculus and Algebra notes'},
  {title:'Physics Notes', desc:'Mechanics and Thermodynamics'},
  {title:'Chemistry Notes', desc:'Organic and Inorganic chemistry'},
  {title:'Biology Notes', desc:'Human anatomy and genetics'},
  {title:'Computer Notes', desc:'Programming and Algorithms'},
  {title:'English Notes', desc:'Grammar and Literature'},
  {title:'History Notes', desc:'World History and Culture'}
];

// ---------------- Display Notes ----------------
const notesContainer = document.getElementById('notesContainerNotes');
function displayNotes(arr){
  notesContainer.innerHTML = '';
  arr.forEach(note => {
    const card = document.createElement('div');
    card.className = 'note-card';
    card.innerHTML = `<h3>${note.title}</h3><p>${note.desc}</p>`;
    notesContainer.appendChild(card);
  });
}
displayNotes(notes);

// ---------------- Search Notes ----------------
const searchInput = document.getElementById('searchInputNotes');
const searchBtn = document.getElementById('searchBtnNotes');

searchBtn.addEventListener('click', () => {
  const query = searchInput.value.toLowerCase();
  const filtered = notes.filter(note => 
    note.title.toLowerCase().includes(query) || note.desc.toLowerCase().includes(query)
  );
  displayNotes(filtered);
});

searchInput.addEventListener('keypress', (e) => {
  if(e.key === 'Enter'){
    searchBtn.click();
  }
});

// ---------------- Logged-in User Info ----------------
const userInfo = document.createElement('p');
userInfo.style.color = "#0ff";
userInfo.style.textAlign = "center";
userInfo.style.marginBottom = "20px";
userInfo.innerHTML = `Logged in as: <strong>${sessionUser.name}</strong> | <a href="#" onclick="logout()" style="color:#0cc;">Logout</a>`;
document.querySelector('.notes-section').prepend(userInfo);

// ---------------- Logout Function ----------------
function logout() {
  localStorage.removeItem('gyanuSession');
  alert("Logged out successfully!");
  window.location.href = "login.html";
}