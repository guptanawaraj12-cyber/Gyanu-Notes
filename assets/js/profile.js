// Gyanu Notes â€” profile settings: edit info, change password, delete account

import { auth, db } from "/assets/js/firebase-config.js?v=2";
import {
  onAuthStateChanged, updateProfile,
  EmailAuthProvider, reauthenticateWithCredential, updatePassword,
  GoogleAuthProvider, FacebookAuthProvider, reauthenticateWithPopup,
  deleteUser
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { doc, getDoc, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

var currentUser = null;
var isPasswordAccount = false;

function showMsg(elId, text, type) {
  var el = document.getElementById(elId);
  el.textContent = text;
  el.className = 'form-message ' + type;
}

onAuthStateChanged(auth, function (user) {
  if (!user) {
    window.location.href = '/login/';
    return;
  }
  currentUser = user;
  isPasswordAccount = user.providerData.some(function (p) { return p.providerId === 'password'; });

  document.getElementById('name').value = user.displayName || '';
  document.getElementById('email').value = user.email || '';

  if (!isPasswordAccount) {
    document.getElementById('password-card').style.display = 'none';
  }

  getDoc(doc(db, 'users', user.uid)).then(function (snap) {
    if (snap.exists() && snap.data().classLevel) {
      document.getElementById('class-level').value = snap.data().classLevel;
    }
  }).catch(function () { /* non-critical */ });
});

// ---- Update name / class ----
document.getElementById('profile-form').addEventListener('submit', function (e) {
  e.preventDefault();
  var submitBtn = document.getElementById('profile-submit');
  var name = document.getElementById('name').value.trim();
  var classLevel = document.getElementById('class-level').value;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Savingâ€¦';

  updateProfile(currentUser, { displayName: name })
    .then(function () {
      return setDoc(doc(db, 'users', currentUser.uid), {
        name: name,
        classLevel: classLevel,
        email: currentUser.email
      }, { merge: true });
    })
    .then(function () {
      showMsg('profile-message', 'Saved! Your changes have been updated.', 'success');
    })
    .catch(function () {
      showMsg('profile-message', 'Could not save changes. Please try again.', 'error');
    })
    .finally(function () {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Save changes';
    });
});

// ---- Change password (email/password accounts only) ----
var passwordForm = document.getElementById('password-form');
if (passwordForm) {
  passwordForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var submitBtn = document.getElementById('password-submit');
    var currentPassword = document.getElementById('current-password').value;
    var newPassword = document.getElementById('new-password').value;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Updatingâ€¦';

    var credential = EmailAuthProvider.credential(currentUser.email, currentPassword);

    reauthenticateWithCredential(currentUser, credential)
      .then(function () { return updatePassword(currentUser, newPassword); })
      .then(function () {
        showMsg('password-message', 'Password updated successfully.', 'success');
        passwordForm.reset();
      })
      .catch(function (err) {
        if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
          showMsg('password-message', 'Current password is incorrect.', 'error');
        } else {
          showMsg('password-message', 'Could not update password. Please try again.', 'error');
        }
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Update password';
      });
  });
}

// ---- Delete account ----
var deleteBtn = document.getElementById('delete-account-btn');
var confirmBox = document.getElementById('delete-confirm-box');
var confirmDeleteBtn = document.getElementById('confirm-delete-btn');
var cancelDeleteBtn = document.getElementById('cancel-delete-btn');

deleteBtn.addEventListener('click', function () {
  confirmBox.classList.add('show');
  deleteBtn.style.display = 'none';

  if (!isPasswordAccount) {
    document.querySelector('#delete-confirm-box .field').style.display = 'none';
    var note = document.createElement('p');
    note.style.fontSize = '0.85rem';
    note.style.color = 'var(--ink-faint)';
    note.textContent = "You'll be asked to confirm through your sign-in provider.";
    confirmBox.insertBefore(note, confirmBox.querySelector('.field'));
  }
});

cancelDeleteBtn.addEventListener('click', function () {
  confirmBox.classList.remove('show');
  deleteBtn.style.display = 'inline-flex';
});

confirmDeleteBtn.addEventListener('click', function () {
  confirmDeleteBtn.disabled = true;
  confirmDeleteBtn.textContent = 'Deletingâ€¦';

  var reauthPromise;
  if (isPasswordAccount) {
    var password = document.getElementById('delete-password').value;
    var credential = EmailAuthProvider.credential(currentUser.email, password);
    reauthPromise = reauthenticateWithCredential(currentUser, credential);
  } else {
    var provider = currentUser.providerData[0].providerId === 'facebook.com'
      ? new FacebookAuthProvider()
      : new GoogleAuthProvider();
    reauthPromise = reauthenticateWithPopup(currentUser, provider);
  }

  reauthPromise
    .then(function () {
      // clean up Firestore data first, then delete the auth account
      return deleteDoc(doc(db, 'users', currentUser.uid)).catch(function () { /* continue even if this fails */ });
    })
    .then(function () { return deleteUser(currentUser); })
    .then(function () {
      window.location.href = '/';
    })
    .catch(function (err) {
      if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        showMsg('delete-message', 'Password is incorrect.', 'error');
      } else {
        showMsg('delete-message', 'Could not delete account. Please try again, or contact us for help.', 'error');
      }
      confirmDeleteBtn.disabled = false;
      confirmDeleteBtn.textContent = 'Yes, delete permanently';
    });
});