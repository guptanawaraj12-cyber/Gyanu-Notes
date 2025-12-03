// ===== FIREBASE AUTHENTICATION SYSTEM =====

import { 
  auth, 
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where
} from './firebase-config.js';

// Current user
let currentUser = null;

// ===== CHECK AUTHENTICATION STATE =====
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User is signed in
    currentUser = user;
    
    // Load user data from Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      currentUser = { ...user, ...userData };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    
    updateNavigation();
  } else {
    // User is signed out
    currentUser = null;
    localStorage.removeItem('currentUser');
  }
  
  checkAuth();
});

// ===== CHECK IF USER IS LOGGED IN =====
function checkAuth() {
  const publicPages = ['index.html', 'notes.html', 'books.html', 'about.html', 'contact.html', 'login.html', 'admin.html', ''];
  const currentPage = window.location.pathname.split('/').pop();
  
  if (!currentUser && !publicPages.includes(currentPage)) {
    window.location.href = 'login.html';
  }
  
  if (currentUser) {
    updateNavigation();
  }
}

// ===== UPDATE NAVIGATION FOR LOGGED IN USERS =====
function updateNavigation() {
  const navLinks = document.querySelector('.nav-links');
  if (!navLinks) return;
  
  // Remove login link if exists
  const loginLink = navLinks.querySelector('a[href="login.html"]');
  if (loginLink) {
    loginLink.parentElement.remove();
  }
  
  // Add dashboard link if not exists
  if (!navLinks.querySelector('a[href="dashboard.html"]')) {
    const dashboardLi = document.createElement('li');
    dashboardLi.innerHTML = '<a href="dashboard.html"><i class="fas fa-tachometer-alt"></i> Dashboard</a>';
    navLinks.appendChild(dashboardLi);
  }
}

// ===== SHOW LOGIN/SIGNUP FORMS =====
function showLogin() {
  document.getElementById('loginBox').style.display = 'block';
  document.getElementById('signupBox').style.display = 'none';
}

function showSignup() {
  document.getElementById('loginBox').style.display = 'none';
  document.getElementById('signupBox').style.display = 'block';
}

// ===== TOGGLE PASSWORD VISIBILITY =====
function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  const button = input.nextElementSibling;
  const icon = button.querySelector('i');
  
  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
}

// ===== SIGNUP WITH FIREBASE =====
const signupForm = document.getElementById('signupForm');
const signupMessage = document.getElementById('signupMessage');

if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const firstName = document.getElementById('signupFirstName').value.trim();
    const lastName = document.getElementById('signupLastName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const studentClass = document.getElementById('signupClass').value;
    const password = document.getElementById('signupPassword').value.trim();
    const confirmPassword = document.getElementById('signupConfirmPassword').value.trim();
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    // Validation
    if (!firstName || !lastName || !email || !studentClass || !password || !confirmPassword) {
      showAuthMessage(signupMessage, 'Please fill in all fields!', 'error');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showAuthMessage(signupMessage, 'Please enter a valid email address!', 'error');
      return;
    }
    
    if (password.length < 8) {
      showAuthMessage(signupMessage, 'Password must be at least 8 characters!', 'error');
      return;
    }
    
    if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
      showAuthMessage(signupMessage, 'Password must contain letters and numbers!', 'error');
      return;
    }
    
    if (password !== confirmPassword) {
      showAuthMessage(signupMessage, 'Passwords do not match!', 'error');
      return;
    }
    
    if (!agreeTerms) {
      showAuthMessage(signupMessage, 'Please agree to the Terms & Conditions!', 'error');
      return;
    }
    
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Save additional user data to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        firstName,
        lastName,
        email,
        class: studentClass,
        phone: '',
        school: '',
        bio: '',
        joinedDate: new Date().toISOString(),
        bookmarks: [],
        downloads: [],
        points: 0
      });
      
      showAuthMessage(signupMessage, 'Account created successfully! Redirecting...', 'success');
      
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1500);
      
    } catch (error) {
      console.error('Signup error:', error);
      
      if (error.code === 'auth/email-already-in-use') {
        showAuthMessage(signupMessage, 'An account with this email already exists!', 'error');
      } else if (error.code === 'auth/weak-password') {
        showAuthMessage(signupMessage, 'Password is too weak!', 'error');
      } else {
        showAuthMessage(signupMessage, 'Error creating account: ' + error.message, 'error');
      }
    }
  });
}

// ===== LOGIN WITH FIREBASE =====
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const rememberMe = document.getElementById('rememberMe').checked;
    
    try {
      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }
      
      showAuthMessage(loginMessage, 'Login successful! Redirecting...', 'success');
      
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1500);
      
    } catch (error) {
      console.error('Login error:', error);
      
      if (error.code === 'auth/user-not-found') {
        showAuthMessage(loginMessage, 'No account found with this email!', 'error');
      } else if (error.code === 'auth/wrong-password') {
        showAuthMessage(loginMessage, 'Incorrect password!', 'error');
      } else if (error.code === 'auth/invalid-credential') {
        showAuthMessage(loginMessage, 'Invalid email or password!', 'error');
      } else {
        showAuthMessage(loginMessage, 'Error logging in: ' + error.message, 'error');
      }
    }
  });
}

// ===== GOOGLE SIGN IN =====
async function socialLogin(provider) {
  if (provider === 'google') {
    try {
      const googleProvider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Check if user document exists
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (!userDoc.exists()) {
        // Create new user document
        await setDoc(doc(db, 'users', user.uid), {
          firstName: user.displayName?.split(' ')[0] || 'User',
          lastName: user.displayName?.split(' ')[1] || '',
          email: user.email,
          class: '10', // Default class
          phone: '',
          school: '',
          bio: '',
          joinedDate: new Date().toISOString(),
          bookmarks: [],
          downloads: [],
          points: 0
        });
      }
      
      window.location.href = 'dashboard.html';
      
    } catch (error) {
      console.error('Google sign-in error:', error);
      alert('Error signing in with Google: ' + error.message);
    }
  } else {
    alert(`${provider} login is not yet implemented.`);
  }
}

// ===== LOGOUT =====
async function logoutUser() {
  if (confirm('Are you sure you want to logout?')) {
    try {
      await signOut(auth);
      localStorage.removeItem('rememberMe');
      window.location.href = 'index.html';
    } catch (error) {
      console.error('Logout error:', error);
      alert('Error logging out: ' + error.message);
    }
  }
}

// ===== LOAD USER DASHBOARD =====
async function loadUserDashboard() {
  if (!currentUser) {
    window.location.href = 'login.html';
    return;
  }
  
  // Get user data from Firestore
  const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
  
  if (userDoc.exists()) {
    const userData = userDoc.data();
    
    // Update user name
    const userName = document.getElementById('userName');
    if (userName) {
      userName.textContent = userData.firstName;
    }
    
    // Update profile info
    const profileName = document.getElementById('profileName');
    const profileClass = document.getElementById('profileClass');
    const profileEmail = document.getElementById('profileEmail');
    const profileJoined = document.getElementById('profileJoined');
    
    if (profileName) {
      profileName.textContent = `${userData.firstName} ${userData.lastName}`;
    }
    if (profileClass) {
      profileClass.textContent = `Class ${userData.class}`;
    }
    if (profileEmail) {
      profileEmail.textContent = userData.email;
    }
    if (profileJoined) {
      const joinDate = new Date(userData.joinedDate);
      profileJoined.textContent = `Joined ${joinDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`;
    }
    
    // Load user stats
    loadUserStats(userData);
  }
}

// ===== LOAD USER STATS =====
function loadUserStats(userData) {
  // Bookmarks
  const bookmarksCount = userData.bookmarks ? userData.bookmarks.length : 0;
  const userBookmarks = document.getElementById('userBookmarks');
  const profileBookmarks = document.getElementById('profileBookmarks');
  if (userBookmarks) userBookmarks.textContent = bookmarksCount;
  if (profileBookmarks) profileBookmarks.textContent = bookmarksCount;
  
  // Downloads
  const downloadsCount = userData.downloads ? userData.downloads.length : 0;
  const userDownloads = document.getElementById('userDownloads');
  const profileDownloads = document.getElementById('profileDownloads');
  if (userDownloads) userDownloads.textContent = downloadsCount;
  if (profileDownloads) profileDownloads.textContent = downloadsCount;
  
  // Points
  const points = userData.points || 0;
  const userPoints = document.getElementById('userPoints');
  const profilePoints = document.getElementById('profilePoints');
  if (userPoints) userPoints.textContent = points;
  if (profilePoints) profilePoints.textContent = points;
  
  // Study time (demo)
  const studyTime = document.getElementById('studyTime');
  if (studyTime) studyTime.textContent = '12h';
}

// ===== LOAD USER PROFILE =====
async function loadUserProfile() {
  if (!currentUser) {
    window.location.href = 'login.html';
    return;
  }
  
  const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
  
  if (userDoc.exists()) {
    const userData = userDoc.data();
    
    // Personal Info
    const editFirstName = document.getElementById('editFirstName');
    const editLastName = document.getElementById('editLastName');
    const editEmail = document.getElementById('editEmail');
    const editClass = document.getElementById('editClass');
    const editPhone = document.getElementById('editPhone');
    const editSchool = document.getElementById('editSchool');
    const editBio = document.getElementById('editBio');
    
    if (editFirstName) editFirstName.value = userData.firstName;
    if (editLastName) editLastName.value = userData.lastName;
    if (editEmail) editEmail.value = userData.email;
    if (editClass) editClass.value = userData.class;
    if (editPhone) editPhone.value = userData.phone || '';
    if (editSchool) editSchool.value = userData.school || '';
    if (editBio) editBio.value = userData.bio || '';
    
    loadUserStats(userData);
  }
}

// ===== UPDATE PERSONAL INFO =====
const personalInfoForm = document.getElementById('personalInfoForm');
const personalInfoMessage = document.getElementById('personalInfoMessage');

if (personalInfoForm) {
  personalInfoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const firstName = document.getElementById('editFirstName').value.trim();
    const lastName = document.getElementById('editLastName').value.trim();
    const studentClass = document.getElementById('editClass').value;
    const phone = document.getElementById('editPhone').value.trim();
    const school = document.getElementById('editSchool').value.trim();
    const bio = document.getElementById('editBio').value.trim();
    
    try {
      // Update user data in Firestore
      await updateDoc(doc(db, 'users', currentUser.uid), {
        firstName,
        lastName,
        class: studentClass,
        phone,
        school,
        bio
      });
      
      showAuthMessage(personalInfoMessage, 'Profile updated successfully! ✅', 'success');
      
    } catch (error) {
      console.error('Update error:', error);
      showAuthMessage(personalInfoMessage, 'Error updating profile: ' + error.message, 'error');
    }
  });
}

// ===== BOOKMARK FUNCTIONS =====
async function toggleBookmark(noteId) {
  if (!currentUser) {
    alert('Please login to bookmark notes!');
    window.location.href = 'login.html';
    return;
  }
  
  try {
    const userRef = doc(db, 'users', currentUser.uid);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    
    let bookmarks = userData.bookmarks || [];
    const index = bookmarks.indexOf(noteId);
    
    if (index > -1) {
      // Remove bookmark
      bookmarks.splice(index, 1);
      showNotification('Bookmark removed! 🔖', 'info');
    } else {
      // Add bookmark
      bookmarks.push(noteId);
      showNotification('Bookmarked! ⭐', 'success');
    }
    
    // Update in Firestore
    await updateDoc(userRef, { bookmarks });
    
    // Update UI
    const bookmarkBtn = document.querySelector(`[data-note-id="${noteId}"] .btn-bookmark`);
    if (bookmarkBtn) {
      if (index > -1) {
        bookmarkBtn.classList.remove('active');
        bookmarkBtn.innerHTML = '<i class="far fa-bookmark"></i>';
      } else {
        bookmarkBtn.classList.add('active');
        bookmarkBtn.innerHTML = '<i class="fas fa-bookmark"></i>';
      }
    }
    
  } catch (error) {
    console.error('Bookmark error:', error);
    showNotification('Error updating bookmark!', 'error');
  }
}

// ===== DOWNLOAD NOTE =====
async function downloadNote(noteId) {
  if (!currentUser) {
    alert('Please login to download notes!');
    window.location.href = 'login.html';
    return;
  }
  
  try {
    const userRef = doc(db, 'users', currentUser.uid);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    
    let downloads = userData.downloads || [];
    
    // Add download record
    downloads.push({
      noteId,
      timestamp: new Date().toISOString()
    });
    
    // Update points
    const points = (userData.points || 0) + 10;
    
    // Update in Firestore
    await updateDoc(userRef, { 
      downloads,
      points
    });
    
    // Update download count for the note
    const noteRef = doc(db, 'notes', noteId.toString());
    const noteDoc = await getDoc(noteRef);
    
    if (noteDoc.exists()) {
      const noteData = noteDoc.data();
      await updateDoc(noteRef, {
        downloadCount: (noteData.downloadCount || 0) + 1
      });
    } else {
      // Create note document if doesn't exist
      await setDoc(noteRef, {
        downloadCount: 1
      });
    }
    
    showNotification('Download started! 📥 (+10 points)', 'success');
    
  } catch (error) {
    console.error('Download error:', error);
    showNotification('Error recording download!', 'error');
  }
}

// ===== NEWSLETTER SUBSCRIPTION =====
const newsletterForm = document.getElementById('newsletterForm');
const newsletterMessage = document.getElementById('newsletterMessage');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('newsletterEmail').value.trim();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showMessage(newsletterMessage, 'Please enter a valid email address.', 'error');
      return;
    }
    
    try {
      // Check if already subscribed
      const subscribersRef = collection(db, 'subscribers');
      const q = query(subscribersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        showMessage(newsletterMessage, 'You are already subscribed!', 'error');
        return;
      }
      
      // Add to subscribers
      await addDoc(subscribersRef, {
        email,
        subscribedDate: new Date().toISOString(),
        status: 'active'
      });
      
      showMessage(newsletterMessage, 'Thank you for subscribing! 🎉', 'success');
      newsletterForm.reset();
      
    } catch (error) {
      console.error('Newsletter error:', error);
      showMessage(newsletterMessage, 'Error subscribing. Please try again.', 'error');
    }
  });
}

// ===== UTILITY FUNCTIONS =====
function showAuthMessage(element, text, type) {
  if (!element) return;
  
  element.textContent = text;
  element.className = `auth-message ${type}`;
  element.style.display = 'block';
  
  setTimeout(() => {
    element.style.display = 'none';
  }, 5000);
}

function showMessage(element, text, type) {
  if (!element) return;
  
  element.textContent = text;
  element.className = `form-message ${type}`;
  element.style.display = 'block';
  
  setTimeout(() => {
    element.style.display = 'none';
  }, 5000);
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 9999;
    animation: slideInRight 0.3s ease;
    max-width: 300px;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// ===== PROFILE TABS =====
function showProfileTab(tabName) {
  document.querySelectorAll('.profile-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  
  document.querySelectorAll('.profile-menu-item').forEach(item => {
    item.classList.remove('active');
  });
  
  document.getElementById(tabName + 'Tab').classList.add('active');
  event.target.classList.add('active');
}

// ===== CHANGE AVATAR =====
function changeAvatar() {
  alert('Avatar upload feature coming soon!\n\nYou will be able to upload your profile picture.');
}

// ===== DELETE ACCOUNT =====
async function deleteAccount() {
  const confirmation = prompt('This action cannot be undone!\n\nType "DELETE" to confirm:');
  
  if (confirmation === 'DELETE') {
    try {
      // Delete user document from Firestore
      await deleteDoc(doc(db, 'users', currentUser.uid));
      
      // Delete user from Authentication
      await currentUser.delete();
      
      alert('Your account has been deleted. We\'re sorry to see you go! 😢');
      window.location.href = 'index.html';
      
    } catch (error) {
      console.error('Delete account error:', error);
      alert('Error deleting account: ' + error.message);
    }
  }
}

// ===== VIEW NOTE =====
function viewNote(noteId) {
  window.location.href = `notes.html?note=${noteId}`;
}

// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', () => {
  // Wait for auth state to be determined
  setTimeout(() => {
    if (window.location.pathname.includes('dashboard.html')) {
      loadUserDashboard();
    }
    
    if (window.location.pathname.includes('profile.html')) {
      loadUserProfile();
    }
  }, 1000);
});

// ===== EXPORT FUNCTIONS =====
window.showLogin = showLogin;
window.showSignup = showSignup;
window.togglePassword = togglePassword;
window.socialLogin = socialLogin;
window.logoutUser = logoutUser;
window.showProfileTab = showProfileTab;
window.changeAvatar = changeAvatar;
window.deleteAccount = deleteAccount;
window.viewNote = viewNote;
window.toggleBookmark = toggleBookmark;
window.downloadNote = downloadNote;