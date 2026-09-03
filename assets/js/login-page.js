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

  function socialError(err, action) {
    var code = (err && err.code) || '';
    if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
      return action + ' closed before finishing. Please try again.';
    }
    if (code === 'auth/popup-blocked') {
      return 'Your browser blocked the ' + action + ' window. Allow popups for this site and try again.';
    }
    if (code === 'auth/unauthorized-domain') {
      return 'This domain is not allowed for sign-in yet. Add it in Firebase Console > Authentication > Settings > Authorized domains.';
    }
    if (code === 'auth/operation-not-allowed') {
      return action + ' is not enabled yet. Turn it on in Firebase Console > Authentication > Sign-in method.';
    }
    if (code === 'auth/account-exists-with-different-credential') {
      return 'An account already exists with this email using a different sign-in method. Try logging in with that method instead.';
    }
    if (code === 'auth/network-request-failed') {
      return 'Network problem while contacting ' + action + '. Check your connection and try again.';
    }
    return action + ' failed. Please try again.';
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
      .catch(function (err) {
        console.error('Google sign-in failed:', err && err.code, err);
        showMessage(socialError(err, 'Google sign-in'), 'error');
      });
  });

  facebookBtn.addEventListener('click', function () {
    var provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then(function (cred) {
        redirectAfterLogin(cred.user);
      })
      .catch(function (err) {
        console.error('Facebook sign-in failed:', err && err.code, err);
        showMessage(socialError(err, 'Facebook sign-in'), 'error');
      });
  });
