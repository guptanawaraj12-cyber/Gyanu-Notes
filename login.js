// ---------------- Particles ----------------
particlesJS("particles-js", {
  "particles": {
    "number": { "value": 90 },
    "color": { "value": ["#ff007f","#ff3d00","#f6ff00","#32ff45","#00eaff","#8b00ff"] },
    "shape": { "type": "circle" },
    "opacity": { "value": 0.7, "random": true },
    "size": { "value": 4, "random": true },
    "line_linked": { "enable": true, "distance": 130, "color": "#00eaff", "opacity": 0.3, "width": 1 },
    "move": { "enable": true, "speed": 2.2, "direction": "none", "random": true, "straight": false, "out_mode": "out" }
  },
  "interactivity": { "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": false } } },
  "retina_detect": true
});

// ---------------- Toggle Forms ----------------
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginToggle = document.getElementById('loginToggle');
const registerToggle = document.getElementById('registerToggle');

loginToggle.addEventListener('click', ()=>{
  loginForm.style.display='block'; registerForm.style.display='none';
  loginToggle.classList.add('active'); registerToggle.classList.remove('active');
});
registerToggle.addEventListener('click', ()=>{
  registerForm.style.display='block'; loginForm.style.display='none';
  registerToggle.classList.add('active'); loginToggle.classList.remove('active');
});

// ---------------- Firebase Setup ----------------
const firebaseConfig = {
  apiKey: "AIzaSyD-u2H9HK9gqcMHVmcGutPquzhbmp-Wo98",
  authDomain: "gyanu-notes-b893b.firebaseapp.com",
  projectId: "gyanu-notes-b893b",
  storageBucket: "gyanu-notes-b893b.firebasestorage.app",
  messagingSenderId: "1032638926824",
  appId: "1:1032638926824:web:1022103cbd727544f3de5d",
  measurementId: "G-1HJGL57HCP"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// ---------------- Register ----------------
registerForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = document.getElementById('regName').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;
  
  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      const user = userCredential.user;
      user.updateProfile({displayName:name});
      localStorage.setItem('gyanuSession', JSON.stringify({name}));
      alert("Registered successfully!");
      window.location.href = "notes.html";
    })
    .catch(error=>alert(error.message));
});

// ---------------- Login ----------------
loginForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      const user = userCredential.user;
      localStorage.setItem('gyanuSession', JSON.stringify({name:user.displayName||"User"}));
      alert("Logged in successfully!");
      window.location.href = "notes.html";
    })
    .catch(error=>alert(error.message));
});

// ---------------- Google Login ----------------
document.getElementById('googleLogin').addEventListener('click', ()=>{
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(result=>{
      const user = result.user;
      localStorage.setItem('gyanuSession', JSON.stringify({name:user.displayName}));
      window.location.href = "notes.html";
    })
    .catch(error=>alert(error.message));
});

// ---------------- Facebook Login ----------------
document.getElementById('facebookLogin').addEventListener('click', ()=>{
  const provider = new firebase.auth.FacebookAuthProvider();
  auth.signInWithPopup(provider)
    .then(result=>{
      const user = result.user;
      localStorage.setItem('gyanuSession', JSON.stringify({name:user.displayName}));
      window.location.href = "notes.html";
    })
    .catch(error=>alert(error.message));
});