// apply-fb-widget.js — add feedback widget to notes-view.js render flow
const fs = require("fs");
const f = "d:/gyanu note code/assets/js/notes-view.js";
let s = fs.readFileSync(f, "utf8");

// 1. Insert the feedback widget code block before getNotesData()
const ANCHOR = "  getNotesData()\n    .then(function (data) { render(data); })";
if (s.includes(ANCHOR) && !s.includes("initFeedbackWidget")) {
  const BLOCK =
`   // --- Was this helpful? feedback widget (anonymous-friendly, best-effort) ---
   function initFeedbackWidget() {
     var widget = document.getElementById('feedback-widget');
     if (!widget) return;
     var prompt = widget.querySelector('.feedback-prompt');
     var btnGroup = widget.querySelector('.feedback-btns');
     var upBtn = document.getElementById('fb-up');
     var downBtn = document.getElementById('fb-down');
     var thanks = widget.querySelector('.feedback-thanks');
     var fbKey = 'note_feedback_' + (noteId || window.location.pathname);
     var alreadyVoted = localStorage.getItem(fbKey) === 'true';

     if (alreadyVoted) {
       if (prompt) prompt.style.display = 'none';
       if (btnGroup) btnGroup.style.display = 'none';
       if (thanks) thanks.style.display = 'block';
       widget.style.display = 'block';
       return;
     }

     widget.style.display = 'block';

     function submitVote(vote) {
       upBtn.disabled = true; downBtn.disabled = true;
       upBtn.setAttribute('aria-pressed', vote === 'up' ? 'true' : 'false');
       downBtn.setAttribute('aria-pressed', vote === 'down' ? 'true' : 'false');
       if (prompt) prompt.style.display = 'none';
       if (btnGroup) btnGroup.style.display = 'none';
       if (thanks) thanks.style.display = 'block';
       localStorage.setItem(fbKey, 'true');

       // Best-effort Firestore write: anonymous-friendly, never surfaces errors
       (async function () {
         try {
           var fc = await import("/assets/js/firebase-config.js?v=5");
           var fs = await import("https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js");
           await fs.addDoc(fs.collection(fc.db, "feedback"), {
             noteId: noteId || null,
             slug: noteId || null,
             vote: vote,
             uid: (currentUser && currentUser.uid) || null,
             submittedAt: fs.serverTimestamp()
           });
         } catch (error) {
           console.debug("Feedback not recorded:", error);
         }
       })();
     }

     upBtn && upBtn.addEventListener('click', function () { submitVote('up'); });
     downBtn && downBtn.addEventListener('click', function () { submitVote('down'); });
   }

   var _feedbackTried = false;
   function maybeInitFeedbackWidget() {
     if (_feedbackTried) return; _feedbackTried = true;
     fbReady.then(function () {
       try { initFeedbackWidget(); } catch (e) { /* swallow */ }
     });
   }

`;
  s = s.replace(ANCHOR, BLOCK + ANCHOR);
  console.log("✅ Inserted feedback widget block");
} else if (s.includes("initFeedbackWidget")) {
  console.log("⚠️  initFeedbackWidget already present");
} else {
  console.log("❌ Anchor not found!");
  console.log("Context around 'getNotesData':", JSON.stringify(s.slice(s.indexOf("getNotesData") - 20, s.indexOf("getNotesData") + 40)));
}

// 2. Add maybeInitFeedbackWidget call at end of render (after maybeLogView())
const RENDER_ANCHOR = "    maybeLogView();\n  }";
if (s.includes(RENDER_ANCHOR) && !s.includes("maybeInitFeedbackWidget();")) {
  s = s.replace(RENDER_ANCHOR, "    maybeLogView();\n    maybeInitFeedbackWidget();\n  }");
  console.log("✅ Added maybeInitFeedbackWidget() to render");
} else if (s.includes("maybeInitFeedbackWidget();")) {
  console.log("⚠️  maybeInitFeedbackWidget() call already present");
} else {
  console.log("❌ render anchor not found");
}

fs.writeFileSync(f, s, "utf8");
console.log("Total length:", s.length);
