import { auth, db } from "/assets/js/firebase-config.js?v=2";
  import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
    onAuthStateChanged
  } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
  import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

  async function redirectAfterLogin(user) {
    var profileRef = doc(db, 'users', user.uid);
    var profile = await getDoc(profileRef);
    if (!profile.exists()) {
      // Social sign-in from the login page skips the signup form, so create
      // the profile here. Field list must match the users create rule.
      try {
        await setDoc(profileRef, {
          name: user.displayName || (user.email ? user.email.split('@')[0] : 'Student'),
          email: user.email || '',
          classLevel: null,
          createdAt: new Date().toISOString()
        });
        profile = await getDoc(profileRef);
      } catch (err) {
        // Non-fatal: without a profile the account simply has no admin flag.
      }
    }
    window.location.href = profile.data()?.admin === true ? '/admin/' : '/dashboard/';
  }

  var form = document.getElementById('login-form');
  var submitBtn = document.getElementById('login-submit');
  var googleBtn = document.getElementById('google-login');
  var facebookBtn = document.getElementById('facebook-login');
  var msg = document.getElementById('form-message');

  function showMessage(text, type) {
    msg.textContent = text;
    msg.className = 'form-message ' + type;
  }

  function friendlyError(err) {
    var code = err.code || '';
    if (code.indexOf('user-not-found') !== -1 || code.indexOf('wrong-password') !== -1 || code.indexOf('invalid-credential') !== -1) {
      return "That email or password doesn't look right. Try again.";
    }
    if (code.indexOf('too-many-requests') !== -1) {
      return "Too many attempts. Please wait a moment and try again.";
    }
    if (code.indexOf('invalid-email') !== -1) {
      return "Enter a valid email address.";
    }
    return "Something went wrong. Please try again.";
  }

  // redirect away if already logged in
  onAuthStateChanged(auth, function (user) {
    if (user) redirectAfterLogin(user);
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Logging in…';

    signInWithEmailAndPassword(auth, email, password)
      .then(function (cred) {
        redirectAfterLogin(cred.user);
      })
      .catch(function (err) {
        showMessage(friendlyError(err), 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Log in';
      });
  });

  googleBtn.addEventListener('click', function () {
    var provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(function (cred) {
        redirectAfterLogin(cred.user);
      })
      .catch(function () {
        showMessage('Google sign-in was cancelled or failed. Please try again.', 'error');
      });
  });

  facebookBtn.addEventListener('click', function () {
    var provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then(function (cred) {
        redirectAfterLogin(cred.user);
      })
      .catch(function (err) {
        if (err.code === 'auth/account-exists-with-different-credential') {
          showMessage('An account already exists with this email using a different sign-in method. Try logging in with that method instead.', 'error');
        } else {
          showMessage('Facebook sign-in was cancelled or failed. Please try again.', 'error');
        }
      });
  });
