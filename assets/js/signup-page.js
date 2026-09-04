(async function () {
  try {
    const [fc, am, fs] = await Promise.all([
      import("/assets/js/firebase-config.js?v=3"),
      import("https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js"),
      import("https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js")
    ]);
    const auth = fc.auth, db = fc.db;
    const createUserWithEmailAndPassword = am.createUserWithEmailAndPassword,
      updateProfile = am.updateProfile,
      sendEmailVerification = am.sendEmailVerification,
      GoogleAuthProvider = am.GoogleAuthProvider,
      FacebookAuthProvider = am.FacebookAuthProvider,
      signInWithPopup = am.signInWithPopup,
      onAuthStateChanged = am.onAuthStateChanged;
    const doc = fs.doc, getDoc = fs.getDoc, setDoc = fs.setDoc;

  async function redirectAfterLogin(user) {
    var profile = await getDoc(doc(db, 'users', user.uid));
    window.location.href = profile.data()?.admin === true ? '/admin/' : '/dashboard/';
  }

  var form = document.getElementById('signup-form');
  var submitBtn = document.getElementById('signup-submit');
  var googleBtn = document.getElementById('google-signup');
  var facebookBtn = document.getElementById('facebook-signup');
  var msg = document.getElementById('form-message');

  function showMessage(text, type) {
    msg.textContent = text;
    msg.className = 'form-message ' + type;
  }

  function friendlyError(err) {
    var code = err.code || '';
    if (code.indexOf('email-already-in-use') !== -1) {
      return "An account already exists with that email. Try logging in instead.";
    }
    if (code.indexOf('weak-password') !== -1) {
      return "Please choose a stronger password (at least 6 characters).";
    }
    if (code.indexOf('invalid-email') !== -1) {
      return "Enter a valid email address.";
    }
    return "Something went wrong. Please try again.";
  }

  function saveProfile(user, name, classLevel) {
    return setDoc(doc(db, "users", user.uid), {
      name: name || user.displayName || "",
      email: user.email,
      classLevel: classLevel || null,
      createdAt: new Date().toISOString()
    }, { merge: true });
  }

  onAuthStateChanged(auth, function (user) {
    if (user && !form.dataset.submitting) {
      redirectAfterLogin(user);
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('name').value.trim();
    var classLevel = document.getElementById('class-level').value;
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Creating account…';
    form.dataset.submitting = 'true';

    createUserWithEmailAndPassword(auth, email, password)
      .then(function (cred) {
        return updateProfile(cred.user, { displayName: name })
          .then(function () { return sendEmailVerification(cred.user); })
          .then(function () { return saveProfile(cred.user, name, classLevel); })
          .then(function () { return cred.user; });
      })
      .then(function (user) {
        redirectAfterLogin(user);
      })
      .catch(function (err) {
        showMessage(friendlyError(err), 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Create account';
        form.dataset.submitting = '';
      });
  });

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
    var detail = serverDetail(err);
    if (detail) {
      var d = detail.toLowerCase();
      if (d.indexOf('api key') !== -1) {
        return "The site's Firebase API key is invalid or restricted. In Google Cloud Console > APIs & Services > Credentials, set the key's Application restrictions to 'None' or add this website's domain to its HTTP referrers.";
      }
      if (d.indexOf('app check') !== -1) {
        return 'App Check enforcement is blocking sign-in. In Firebase Console > Authentication > Settings, turn App Check enforcement OFF (or register a valid reCAPTCHA v3 key first).';
      }
      if (d.indexOf('identity toolkit') !== -1 || d.indexOf('service_disabled') !== -1) {
        return 'The Identity Toolkit API is disabled for this project. Enable it in Google Cloud Console > APIs & Services > Library.';
      }
      if (d.indexOf('operation_not_allowed') !== -1) {
        return action + ' is not enabled in Firebase Console > Authentication > Sign-in method.';
      }
      return action + ' failed: ' + detail;
    }
    return action + ' failed. Please try again. (Code: ' + (code || 'unknown') + ')';
  }

  // auth/internal-error wraps the real server rejection in customData.message,
  // e.g. 'Error (auth/internal-error); body: {"error":{"message":"API key not valid…"}}'
  function serverDetail(err) {
    var raw = (err && err.customData && err.customData.message) || '';
    var m = raw.match(/body:\s*(\{[\s\S]*\})/);
    if (!m) return '';
    try {
      var parsed = JSON.parse(m[1]);
      return (parsed.error && parsed.error.message) || '';
    } catch (e) {
      return '';
    }
  }

  googleBtn.addEventListener('click', function () {
    var provider = new GoogleAuthProvider();
    form.dataset.submitting = 'true';
    signInWithPopup(auth, provider)
      .then(function (cred) {
        return saveProfile(cred.user, cred.user.displayName, null).then(function () { return cred.user; });
      })
      .then(function (user) {
        redirectAfterLogin(user);
      })
      .catch(function (err) {
        console.error('Google sign-up failed:', err && err.code, err);
        showMessage(socialError(err, 'Google sign-up'), 'error');
        form.dataset.submitting = '';
      });
  });

  facebookBtn.addEventListener('click', function () {
    var provider = new FacebookAuthProvider();
    form.dataset.submitting = 'true';
    signInWithPopup(auth, provider)
      .then(function (cred) {
        return saveProfile(cred.user, cred.user.displayName, null).then(function () { return cred.user; });
      })
      .then(function (user) {
        redirectAfterLogin(user);
      })
      .catch(function (err) {
        form.dataset.submitting = '';
        console.error('Facebook sign-up failed:', err && err.code, err);
        showMessage(socialError(err, 'Facebook sign-up'), 'error');
      });
  });
  } catch (error) {
    console.error("Signup page could not reach Firebase:", error);
    var msgEl = document.getElementById('form-message');
    if (msgEl) { msgEl.textContent = "Couldn't reach the sign-in service — check your connection."; msgEl.className = 'form-message error'; }
    var submit = document.getElementById('signup-submit');
    if (submit) submit.disabled = true;
  }
})();
