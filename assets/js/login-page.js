(async function () {
  try {
    const [fc, am, fs] = await Promise.all([
      import("/assets/js/firebase-config.js?v=3"),
      import("https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js"),
      import("https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js")
    ]);
    const auth = fc.auth, db = fc.db;
    const signInWithEmailAndPassword = am.signInWithEmailAndPassword,
      GoogleAuthProvider = am.GoogleAuthProvider,
      FacebookAuthProvider = am.FacebookAuthProvider,
      signInWithPopup = am.signInWithPopup,
      onAuthStateChanged = am.onAuthStateChanged;
    const doc = fs.doc, getDoc = fs.getDoc, setDoc = fs.setDoc;

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
  // Guard so a successful login only triggers redirectAfterLogin() once.
  // The explicit submit / social handlers redirect from their own .then(); this
  // flag stops the onAuthStateChanged listener from doing it again for the same
  // flow (same intent as signup-page.js's form.dataset.submitting flag).
  var loginInProgress = false;

  // redirect away if already logged in — but skip when a login flow we started is
  // already handling the redirect from its own handler.
  onAuthStateChanged(auth, function (user) {
    if (user && !loginInProgress) redirectAfterLogin(user);
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Logging in…';
    loginInProgress = true;

    signInWithEmailAndPassword(auth, email, password)
      .then(function (cred) {
        redirectAfterLogin(cred.user);
      })
      .catch(function (err) {
        loginInProgress = false;
        showMessage(friendlyError(err), 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Log in';
      });
  });

  googleBtn.addEventListener('click', function () {
    var provider = new GoogleAuthProvider();
    loginInProgress = true;
    signInWithPopup(auth, provider)
      .then(function (cred) {
        redirectAfterLogin(cred.user);
      })
      .catch(function (err) {
        loginInProgress = false;
        console.error('Google sign-in failed:', err && err.code, err);
        showMessage(socialError(err, 'Google sign-in'), 'error');
      });
  });

  facebookBtn.addEventListener('click', function () {
    var provider = new FacebookAuthProvider();
    loginInProgress = true;
    signInWithPopup(auth, provider)
      .then(function (cred) {
        redirectAfterLogin(cred.user);
      })
      .catch(function (err) {
        loginInProgress = false;
        console.error('Facebook sign-in failed:', err && err.code, err);
        showMessage(socialError(err, 'Facebook sign-in'), 'error');
      });
  });
  } catch (error) {
    console.error("Login page could not reach Firebase:", error);
    var msgEl = document.getElementById('form-message');
    if (msgEl) { msgEl.textContent = "Couldn't reach the sign-in service — check your connection."; msgEl.className = 'form-message error'; }
    var submit = document.getElementById('login-submit');
    if (submit) submit.disabled = true;
  }
})();
