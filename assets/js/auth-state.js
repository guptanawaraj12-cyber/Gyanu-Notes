// Gyanu Notes — reflects login state in the navbar on every page

import { auth, db } from "/assets/js/firebase-config.js?v=3";
import { onAuthStateChanged, signOut, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

function initials(name) {
  return (name || "?").split(/\s+/).slice(0, 2).map(function (w) {
    return (w[0] || "?").toUpperCase();
  }).join("");
}

function escapeHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

onAuthStateChanged(auth, async function (user) {
  var loginTrigger = document.querySelector(".login-trigger");
  var loginMenu = document.querySelector(".login-menu");
  var loginPanel = document.querySelector(".login-panel");
  var welcomeBanner = document.querySelector(".welcome-banner");
  var welcomeName = document.querySelector(".welcome-banner strong");

  function renderTrigger(name) {
    if (!loginTrigger) return;
    loginTrigger.setAttribute("href", user ? "#" : "/login/");
    if (user) {
      loginTrigger.textContent = "";
      var avatar = document.createElement("span");
      avatar.className = "avatar-mini";
      avatar.textContent = initials(user.displayName);
      var nameSpan = document.createElement("span");
      nameSpan.className = "trigger-name";
      nameSpan.textContent = " " + (user.displayName ? user.displayName.split(" ")[0] : "Account");
      loginTrigger.appendChild(avatar);
      loginTrigger.appendChild(nameSpan);
    } else {
      loginTrigger.textContent = "Login";
    }
  }

  async function buildLoggedInPanel() {
    if (!loginPanel) return;
    loginPanel.innerHTML = "";

    var head = document.createElement("div");
    head.className = "menu-head";
    head.innerHTML =
      '<span class="menu-avatar">' + escapeHtml(initials(user.displayName)) + "</span>" +
      '<div class="menu-meta">' +
        '<div class="menu-name">' + escapeHtml(user.displayName || "Account") + "</div>" +
        '<div class="menu-email">' + escapeHtml(user.email || "") + "</div>" +
        '<div class="menu-verify' + (user.emailVerified ? " ok" : "") + '">' +
          (user.emailVerified
            ? '<span class="vd-dot ok" title="Email verified"></span> Email verified'
            : '<span class="vd-dot warn" title="Email not verified"></span> Verify your email') +
        "</div>" +
      "</div>";
    loginPanel.appendChild(head);

    var links = [
      { href: "/dashboard/", text: "Dashboard" },
      { href: "/bookmarks/", text: "My bookmarks" },
      { href: "/notes/?filter=mine", text: "My notes" },
      { href: "/papers/?filter=mine", text: "My papers" },
      { href: "/profile/", text: "Profile settings" }
    ];

    links.forEach(function (item) {
      var link = document.createElement("a");
      link.href = item.href;
      link.textContent = item.text;
      loginPanel.appendChild(link);
    });

    // Unverified email/password accounts can resend verification from here.
    if (!user.emailVerified) {
      var verifyBtn = document.createElement("button");
      verifyBtn.type = "button";
      verifyBtn.className = "menu-resend";
      verifyBtn.textContent = "Resend verification email";
      verifyBtn.addEventListener("click", function () {
        verifyBtn.disabled = true;
        verifyBtn.textContent = "Sending…";
        sendEmailVerification(user).then(function () {
          verifyBtn.textContent = "Sent — check your inbox";
        }).catch(function () {
          verifyBtn.textContent = "Could not send — try again";
          verifyBtn.disabled = false;
        });
      });
      loginPanel.appendChild(verifyBtn);
    }

    try {
      const profile = await getDoc(doc(db, "users", user.uid));
      if (profile.data()?.admin === true) {
        var adminLink = document.createElement("a");
        adminLink.href = "/admin/";
        adminLink.textContent = "Admin panel";
        adminLink.setAttribute("data-role", "admin-link");
        adminLink.classList.add("role-admin");
        loginPanel.insertBefore(adminLink, loginPanel.firstChild.nextSibling);
      }
    } catch (err) {
      // Non-critical: if the profile can't be read, the admin link simply
      // doesn't appear — the rest of the menu stays fully functional.
    }

    var logoutLink = document.createElement("a");
    logoutLink.href = "#";
    logoutLink.textContent = "Logout";
    logoutLink.setAttribute("data-action", "logout");
    loginPanel.appendChild(logoutLink);

    logoutLink.addEventListener("click", function (e) {
      e.preventDefault();
      signOut(auth).then(function () {
        window.location.href = "/";
      });
    });
  }

  function clearLoggedInPanel() {
    if (loginPanel) {
      loginPanel.innerHTML = "";
      loginPanel.classList.remove("open");
    }
  }

  if (user) {
    if (loginMenu) loginMenu.classList.add("authed");
    if (welcomeBanner && welcomeName) {
      welcomeName.textContent = "Welcome back, " + (user.displayName ? user.displayName.split(" ")[0] : "there") + ".";
      welcomeBanner.classList.add("show");
    }
    renderTrigger(user.displayName);
    buildLoggedInPanel();
  } else {
    if (loginMenu) loginMenu.classList.remove("authed");
    if (welcomeBanner) welcomeBanner.classList.remove("show");
    renderTrigger(null);
    clearLoggedInPanel();
  }
});
