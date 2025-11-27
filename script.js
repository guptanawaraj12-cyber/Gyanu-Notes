// Burger menu toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Dummy notes data
const notes = [
  {title:'Math Notes', desc:'Calculus and Algebra notes'},
  {title:'Physics Notes', desc:'Mechanics and Thermodynamics'},
  {title:'Chemistry Notes', desc:'Organic and Inorganic chemistry'},
  {title:'Biology Notes', desc:'Human anatomy and genetics'},
  {title:'Computer Notes', desc:'Programming and Algorithms'}
];

// Display notes
const notesContainer = document.getElementById('notesContainer');
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

// Search functionality
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

searchBtn.addEventListener('click', () => {
  const query = searchInput.value.toLowerCase();
  const filtered = notes.filter(note => note.title.toLowerCase().includes(query) || note.desc.toLowerCase().includes(query));
  displayNotes(filtered);
});