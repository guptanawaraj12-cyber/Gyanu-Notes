let auth, db, onAuthStateChanged, getSiteContent, doc, getDoc, setDoc, deleteDoc,
    addDoc, collection, getDocs, query, orderBy, limit, where, updateDoc, serverTimestamp;
let contentRef;
// Admin is auth-gated: if Firebase cannot be reached the access panel shows
// the connection error instead of leaving the page silent.
(async function () {
  try {
    const [fc, cs, am, fs] = await Promise.all([
      import("/assets/js/firebase-config.js?v=3"),
      import("/assets/js/content-store.js?v=4"),
      import("https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js"),
      import("https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js")
    ]);
    auth = fc.auth; db = fc.db; getSiteContent = cs.getSiteContent;
    onAuthStateChanged = am.onAuthStateChanged;
    doc = fs.doc; getDoc = fs.getDoc; setDoc = fs.setDoc; deleteDoc = fs.deleteDoc; addDoc = fs.addDoc;
    collection = fs.collection; getDocs = fs.getDocs; query = fs.query; orderBy = fs.orderBy;
    limit = fs.limit; where = fs.where; updateDoc = fs.updateDoc; serverTimestamp = fs.serverTimestamp;
    contentRef = doc(db, "siteContent", "current");
let content = null;

function message(id, text, type) {
  const el = document.getElementById(id);
  el.textContent = text;
  el.className = "form-message " + type;
}

function validNotes(data) {
  return Array.isArray(data.classes) && Array.isArray(data.subjects) && Array.isArray(data.notes);
}

function validPapers(data) {
  return Array.isArray(data.classExamTypes) && Array.isArray(data.subjects) && Array.isArray(data.papers);
}

function updateStats() {
  const notes = content.notes.notes.reduce((sum, entry) => sum + (entry.chapters?.length || 0), 0);
  const papers = content.papers.papers.reduce((sum, entry) => sum + (entry.sets?.length || 0), 0);
  document.getElementById("notes-count").textContent = notes;
  document.getElementById("papers-count").textContent = papers;
}

function fillEditors() {
  document.getElementById("notes-editor").value = JSON.stringify(content.notes, null, 2);
  document.getElementById("papers-editor").value = JSON.stringify(content.papers, null, 2);
  updateStats();
  fillSelects();
  fillContentPickers(true);
}

function fillSelect(selectId, items, labelKey, valueKey) {
  const select = document.getElementById(selectId);
  const chosen = select.value;
  select.innerHTML = '';
  items.forEach((item) => {
    const option = document.createElement('option');
    option.value = item[valueKey];
    option.textContent = item[labelKey];
    select.appendChild(option);
  });
  if (chosen) select.value = chosen;
}

function fillSelects() {
  fillSelect('note-class', content.notes.classes, 'label', 'slug');
  fillSelect('note-subject', content.notes.subjects, 'label', 'slug');
  fillSelect('paper-class', content.papers.classExamTypes, 'label', 'classSlug');
  fillSelect('paper-subject', content.papers.subjects, 'label', 'slug');
}

function makeId(parts) {
  return parts
    .concat(Date.now().toString(36))
    .concat(Math.random().toString(36).slice(2, 10))
    .join('-')
    .replace(/[^a-z0-9-]/gi, '')
    .toLowerCase();
}

async function saveContent() {
  await setDoc(contentRef, {
    notes: content.notes,
    papers: content.papers,
    updatedAt: serverTimestamp(),
    updatedBy: auth.currentUser.uid
  });
  document.getElementById("source-state").textContent = "Firestore";
  message("catalogue-message", "Published successfully.", "success");
}

async function saveEditor(kind) {
  const editor = document.getElementById(kind + "-editor");
  try {
    const parsed = JSON.parse(editor.value);
    if ((kind === "notes" && !validNotes(parsed)) || (kind === "papers" && !validPapers(parsed))) {
      throw new Error("The catalogue has the wrong structure.");
    }
    content[kind] = parsed;
    await saveContent();
    fillEditors();
  } catch (error) {
    message("catalogue-message", "Not saved: " + error.message, "error");
  }
}

async function loadAdmin() {
  const snapshot = await getDoc(contentRef);
  content = await getSiteContent();
  document.getElementById("source-state").textContent = snapshot.exists() ? "Firestore" : "Bundled JSON";
  fillEditors();
  fillContentPickers();
  loadNoticesList();
  loadBlogList();
}

document.getElementById("save-notes").addEventListener("click", () => saveEditor("notes"));
document.getElementById("save-papers").addEventListener("click", () => saveEditor("papers"));
document.getElementById('add-note-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const classSlug = document.getElementById('note-class').value;
  const subjectSlug = document.getElementById('note-subject').value;
  const title = document.getElementById('note-title').value.trim();
  const driveFileId = document.getElementById('note-drive-id').value.trim();
  const handwrittenDriveId = document.getElementById('note-handwritten-id')?.value.trim() || "";
  const entry = content.notes.notes.find((note) => note.classSlug === classSlug && note.subjectSlug === subjectSlug);
  const chapter = { id: makeId([classSlug, subjectSlug, 'chapter']), title, driveFileId };
  if (handwrittenDriveId) chapter.handwrittenDriveId = handwrittenDriveId;
  if (entry) entry.chapters.push(chapter);
  else content.notes.notes.push({ classSlug, subjectSlug, chapters: [chapter] });
  try {
    await saveContent();
    fillEditors();
    event.target.reset();
    message('catalogue-message', `Published “${title}”.`, 'success');
  } catch (error) { message('catalogue-message', 'Could not publish note: ' + error.message, 'error'); }
});

document.getElementById('add-paper-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const classSlug = document.getElementById('paper-class').value;
  const subjectSlug = document.getElementById('paper-subject').value;
  const year = document.getElementById('paper-year').value.trim();
  const label = document.getElementById('paper-label').value.trim();
  const driveFileId = document.getElementById('paper-drive-id').value.trim();
  const entry = content.papers.papers.find((paper) => paper.classSlug === classSlug && paper.subjectSlug === subjectSlug && paper.year === year);
  const set = { id: makeId([classSlug, subjectSlug, year, 'paper']), label, driveFileId };
  if (entry) entry.sets.push(set);
  else content.papers.papers.push({ classSlug, year, subjectSlug, sets: [set] });
  try {
    await saveContent();
    fillEditors();
    event.target.reset();
    message('catalogue-message', `Published “${label}”.`, 'success');
  } catch (error) { message('catalogue-message', 'Could not publish paper: ' + error.message, 'error'); }
});
document.getElementById("import-bundled").addEventListener("click", async () => {
  try {
    if ((await getDoc(contentRef)).exists()) {
      message("catalogue-message", "Firestore already has live content; import was not run.", "error");
      return;
    }
    await saveContent();
    fillEditors();
  } catch (error) {
    message("catalogue-message", "Import failed: " + error.message, "error");
  }
});

async function setRole(enabled) {
  const email = document.getElementById("role-email").value.trim();
  if (!email) return message("role-message", "Enter the account email first.", "error");
  try {
    // Profiles store the email exactly as typed at signup and Firestore
    // equality is case-sensitive, so query the exact form first and fall
    // back to the lowercased form before giving up.
    let matches = await getDocs(query(collection(db, "users"), where("email", "==", email), limit(5)));
    const lowered = email.toLowerCase();
    if (matches.empty && email !== lowered) {
      matches = await getDocs(query(collection(db, "users"), where("email", "==", lowered), limit(5)));
    }
    let updated = 0;
    for (const snap of matches.docs) {
      if (snap.id === auth.currentUser.uid) continue; // an admin never changes their own role here
      await updateDoc(doc(db, "users", snap.id), { admin: enabled });
      updated++;
    }
    if (!updated) {
      message("role-message", "No other account with that email was found. The user must sign up first.", "error");
    } else {
      message("role-message", (enabled ? "Administrator role granted" : "Administrator role revoked") +
        " for " + updated + " account(s). The user must sign out and back in.", "success");
    }
  } catch (error) {
    message("role-message", "Role update failed: " + (error.message || "try again."), "error");
  }
}

document.getElementById("grant-admin").addEventListener("click", () => setRole(true));
document.getElementById("revoke-admin").addEventListener("click", () => setRole(false));

// ---------------------------------------------------------------------------
// Reported comments — moderation queue for the reader Q&A (comments/{id}).
// ---------------------------------------------------------------------------

async function loadReportedComments() {
  const list = document.getElementById("reported-comments-list");
  if (!list) return;
  try {
    const snapshot = await getDocs(query(collection(db, "comments"), where("reported", "==", true)));
    if (!snapshot.size) {
      list.innerHTML = '<p class="muted">No reported comments. All clear.</p>';
      return;
    }
    const rows = snapshot.docs
      .map((docSnap) => Object.assign({ id: docSnap.id }, docSnap.data()))
      .sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
    list.innerHTML = rows.map((row) => {
      const when = row.createdAt?.toDate ? row.createdAt.toDate().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "";
      return '<div class="notice-info">' +
        "<strong>" + escapeHtml(row.displayName || "Student") + "</strong>" +
        ' <span class="muted">&middot; ' + when + " &middot; note " + escapeHtml(row.noteId || "?") + "</span>" +
        "<p>" + escapeHtml(row.text || "") + "</p>" +
        '<button class="btn btn-outline comment-del" data-id="' + escapeHtml(row.id) + '" type="button">Delete comment</button>' +
        "</div>";
    }).join("");
  } catch (error) {
    list.innerHTML = '<p class="muted">Could not load reported comments: ' + escapeHtml(error.message) + "</p>";
  }
}

document.getElementById("reported-comments-list")?.addEventListener("click", async (event) => {
  const btn = event.target.closest?.(".comment-del");
  if (!btn) return;
  if (!window.confirm("Delete this comment permanently?")) return;
  try {
    await deleteDoc(doc(db, "comments", btn.dataset.id));
    message("reported-comments-message", "Comment deleted.", "success");
    loadReportedComments();
  } catch (error) {
    message("reported-comments-message", "Delete failed: " + (error.message || "try again."), "error");
  }
});

onAuthStateChanged(auth, async (user) => {
  const denied = document.getElementById("access-denied");
  if (!user) {
    denied.style.display = "block";
    document.getElementById("access-message").textContent = "Log in with an administrator account to continue.";
    return;
  }
  const profile = await getDoc(doc(db, "users", user.uid));
  if (profile.data()?.admin !== true) {
    denied.style.display = "block";
    document.getElementById("access-message").textContent = "This account does not have the administrator role.";
    return;
  }
  document.getElementById("admin-email").textContent = user.email || "administrator";
  document.getElementById("admin-app").hidden = false;
  try { await loadAdmin(); }
  catch (error) { message("catalogue-message", "Could not load catalogue: " + error.message, "error"); }
  loadReportedComments();
});

// ---------------------------------------------------------------------------
// Chapter notes content — manages the Firestore chapterContent/{id} documents
// that the chapter viewer renders in preference to bundled files.
// ---------------------------------------------------------------------------

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function fillSelectWith(select, options) {
  if (!select) return;
  const previous = select.value;
  select.innerHTML = "";
  options.forEach((option) => {
    const element = document.createElement("option");
    element.value = option.value;
    element.textContent = option.label;
    select.appendChild(element);
  });
  if (previous && options.some((option) => option.value === previous)) select.value = previous;
}

function contentEntry() {
  const classSlug = document.getElementById("content-class").value;
  const subjectSlug = document.getElementById("content-subject").value;
  return content.notes.notes.find(
    (entry) => entry.classSlug === classSlug && entry.subjectSlug === subjectSlug
  );
}

function fillContentSubjects(silent) {
  const classSlug = document.getElementById("content-class").value;
  const available = content.notes.subjects.filter((subject) =>
    content.notes.notes.some((entry) => entry.classSlug === classSlug && entry.subjectSlug === subject.slug)
  );
  fillSelectWith(
    document.getElementById("content-subject"),
    available.map((subject) => ({ value: subject.slug, label: subject.label }))
  );
  fillContentChapters(silent);
}

function fillContentChapters(silent) {
  const entry = contentEntry();
  fillSelectWith(
    document.getElementById("content-chapter"),
    (entry?.chapters || []).map((chapter) => ({ value: chapter.id, label: chapter.title }))
  );
  if (silent !== true) loadChapterDoc();
}

function fillContentPickers(silent) {
  const classSel = document.getElementById("content-class");
  if (!classSel || !content) return;
  fillSelectWith(
    classSel,
    content.notes.classes.map((item) => ({ value: item.slug, label: item.label }))
  );
  fillContentSubjects(silent);
}

async function loadChapterDoc() {
  const chapterId = document.getElementById("content-chapter")?.value;
  const editor = document.getElementById("content-editor");
  if (!chapterId || !editor) return;
  // Fill the handwritten-Drive-link field from the live catalogue chapter.
  const handwrittenInput = document.getElementById("content-handwritten");
  const entry = contentEntry();
  const catalogueChapter = entry?.chapters.find((chapter) => chapter.id === chapterId);
  if (handwrittenInput) {
    handwrittenInput.value =
      catalogueChapter && typeof catalogueChapter.handwrittenDriveId === "string"
        ? catalogueChapter.handwrittenDriveId
        : "";
  }
  editor.value = "";
  editor.placeholder = "Loading…";
  try {
    const snapshot = await getDoc(doc(db, "chapterContent", chapterId));
    if (snapshot.exists()) {
      editor.value = snapshot.data().html || "";
      editor.placeholder = "Chapter HTML…";
      message("content-message", "Loaded the published Firestore version. Edit and publish to update it.", "success");
      return;
    }
    const response = await fetch("/assets/content/" + encodeURIComponent(chapterId) + ".html");
    editor.value = response.ok ? await response.text() : "";
    editor.placeholder = response.ok
      ? "Chapter HTML…"
      : "No content yet — write the chapter HTML here and publish.";
    message(
      "content-message",
      response.ok
        ? "No Firestore version yet; loaded the bundled file. Publishing copies it into Firestore."
        : "This chapter has no content yet. Write the HTML below and publish.",
      "success"
    );
  } catch (error) {
    editor.placeholder = "Could not load content.";
    message("content-message", "Could not load content: " + error.message, "error");
  }
}

document.getElementById("content-class")?.addEventListener("change", () => fillContentSubjects());
document.getElementById("content-subject")?.addEventListener("change", () => fillContentChapters());
document.getElementById("content-chapter")?.addEventListener("change", loadChapterDoc);

document.getElementById("save-content")?.addEventListener("click", async () => {
  const chapterId = document.getElementById("content-chapter").value;
  const html = document.getElementById("content-editor").value;
  if (!chapterId) return message("content-message", "Choose a chapter first.", "error");
  if (!html.trim()) return message("content-message", "Write some content before publishing.", "error");
  try {
    await setDoc(doc(db, "chapterContent", chapterId), {
      html,
      updatedAt: serverTimestamp(),
      updatedBy: auth.currentUser.uid
    });
    message("content-message", "Published. The chapter page now shows this content.", "success");
  } catch (error) {
    message("content-message", "Could not publish: " + error.message, "error");
  }
});

document.getElementById("delete-content")?.addEventListener("click", async () => {
  const chapterId = document.getElementById("content-chapter").value;
  if (!chapterId) return message("content-message", "Choose a chapter first.", "error");
  try {
    await deleteDoc(doc(db, "chapterContent", chapterId));
    message("content-message", "Published content removed. The chapter falls back to its bundled file (if any).", "success");
    loadChapterDoc();
  } catch (error) {
    message("content-message", "Could not remove: " + error.message, "error");
  }
});

// Saves (or clears) the handwritten-notes Drive file ID on the catalogue
// chapter. The download Cloud Function reads this field server-side.
document.getElementById("save-handwritten")?.addEventListener("click", async () => {
  const chapterId = document.getElementById("content-chapter").value;
  const input = document.getElementById("content-handwritten");
  if (!chapterId) return message("content-message", "Choose a chapter first.", "error");
  if (!input) return;
  const value = input.value.trim();
  if (value && !/^[-\w]{20,}$/.test(value)) {
    return message("content-message", "That does not look like a Drive file ID — paste the long ID from the file's share link, not the whole link.", "error");
  }
  const entry = contentEntry();
  const chapter = entry?.chapters.find((item) => item.id === chapterId);
  if (!chapter) return message("content-message", "Chapter not found in the live catalogue.", "error");
  if (value) chapter.handwrittenDriveId = value;
  else delete chapter.handwrittenDriveId;
  try {
    await saveContent();
    fillEditors();
    message("content-message", value ? "Handwritten Drive file linked to this chapter." : "Handwritten Drive file link removed.", "success");
  } catch (error) {
    message("content-message", "Could not save the handwritten link: " + error.message, "error");
  }
});

// ---------------------------------------------------------------------------
// Notice board — publishes and manages Firestore notices shown on the homepage.
// ---------------------------------------------------------------------------

async function loadNoticesList() {
  const list = document.getElementById("notice-list");
  if (!list) return;
  try {
    const snapshot = await getDocs(query(collection(db, "notices"), orderBy("createdAt", "desc"), limit(20)));
    if (!snapshot.size) {
      list.innerHTML = '<p class="muted">No notices published yet.</p>';
      return;
    }
    list.innerHTML = "";
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const row = document.createElement("div");
      row.className = "notice-item";
      row.innerHTML =
        '<div class="notice-info">' +
        "<strong>" + escapeHtml(data.title || "") +
        (data.pinned ? ' <span class="tag tag-pin">Pinned</span>' : "") +
        "</strong>" +
        "<p>" + escapeHtml(data.body || "") + "</p>" +
        "</div>" +
        '<button class="btn btn-outline notice-del" data-id="' + escapeHtml(docSnap.id) + '" type="button">Delete</button>';
      list.appendChild(row);
    });
  } catch (error) {
    list.innerHTML = '<p class="muted">Could not load notices: ' + escapeHtml(error.message) + "</p>";
  }
}

document.getElementById("notice-form")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const title = document.getElementById("notice-title").value.trim();
  const body = document.getElementById("notice-body").value.trim();
  const url = document.getElementById("notice-url").value.trim();
  const pinned = document.getElementById("notice-pinned").checked;
  if (!title || !body) return message("notice-message", "Title and details are required.", "error");
  try {
    await addDoc(collection(db, "notices"), {
      title,
      body,
      url: url || null,
      pinned,
      createdAt: serverTimestamp(),
      createdBy: auth.currentUser.uid
    });
    event.target.reset();
    message("notice-message", "Notice published to the homepage.", "success");
    loadNoticesList();
  } catch (error) {
    message("notice-message", "Could not publish the notice: " + error.message, "error");
  }
});

document.getElementById("notice-list")?.addEventListener("click", async (event) => {
  const button = event.target.closest?.(".notice-del");
  if (!button) return;
  try {
    await deleteDoc(doc(db, "notices", button.dataset.id));
    message("notice-message", "Notice deleted.", "success");
    loadNoticesList();
  } catch (error) {
    message("notice-message", "Could not delete the notice: " + error.message, "error");
  }
});

// ---------------------------------------------------------------------------
// Blog — full articles at /blog/. Doc id = url slug. Drafts stay private;
// live posts are public. Publishing can also push a homepage notice.
// ---------------------------------------------------------------------------

let editingSlug = null;
let slugTouched = false;

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

// Nepali/Devanagari titles slugify to an empty string — fall back to a
// timestamp-based slug so publishing never blocks. Users can also type
// their own English slug in the field.
function ensureSlug(text) {
  return slugify(text) || "post-" + Date.now().toString(36);
}

async function uniqueSlug(base) {
  let candidate = base;
  for (let n = 2; n < 30; n++) {
    const snap = await getDoc(doc(db, "blogPosts", candidate));
    if (!snap.exists()) return candidate;
    candidate = base + "-" + n;
  }
  return base + "-" + Date.now().toString(36);
}

function resetBlogForm() {
  editingSlug = null;
  slugTouched = false;
  document.getElementById("blog-form").reset();
  document.getElementById("blog-slug").readOnly = false;
  document.getElementById("blog-publish").textContent = "Publish post";
  document.getElementById("blog-cancel").hidden = true;
}

async function saveBlogPost(published) {
  const title = document.getElementById("blog-title").value.trim();
  const excerpt = document.getElementById("blog-excerpt").value.trim();
  const html = document.getElementById("blog-html").value;
  const category = document.getElementById("blog-category").value;
  const alsoNotice = document.getElementById("blog-notice").checked;
  const coverImage = document.getElementById("blog-cover").value.trim();
  if (!title) return message("blog-message", "Give the post a title first.", "error");
  if (published && !excerpt) return message("blog-message", "Write a short excerpt before publishing.", "error");
  if (published && !html.trim()) return message("blog-message", "Write the post body before publishing.", "error");
  try {
    let slug;
    let publishedAt;
    if (editingSlug) {
      slug = editingSlug;
      const current = await getDoc(doc(db, "blogPosts", slug));
      publishedAt = current.exists() ? current.data().publishedAt : serverTimestamp();
    } else {
      slug = await uniqueSlug(ensureSlug(document.getElementById("blog-slug").value.trim() || title));
      publishedAt = serverTimestamp();
    }
    await setDoc(doc(db, "blogPosts", slug), {
      title,
      slug,
      excerpt,
      html,
      category,
      coverImage,
      published,
      publishedAt,
      updatedAt: serverTimestamp(),
      createdBy: auth.currentUser.uid
    });
    let noticeNote = "";
    if (published && alsoNotice) {
      try {
        await addDoc(collection(db, "notices"), {
          title,
          body: excerpt,
          url: "/blog/post/" + slug + "/",
          pinned: false,
          createdAt: serverTimestamp(),
          createdBy: auth.currentUser.uid
        });
        loadNoticesList();
        noticeNote = " A short notice was also added to the homepage board.";
      } catch (noticeError) {
        noticeNote = " The homepage notice failed: " + noticeError.message;
      }
    }
    message("blog-message", published
      ? "Published at /blog/post/" + slug + "/." + noticeNote
      : "Draft saved — it is not visible to visitors yet.", "success");
    resetBlogForm();
    loadBlogList();
  } catch (error) {
    message("blog-message", "Could not save the post: " + error.message, "error");
  }
}

async function loadBlogList() {
  const list = document.getElementById("blog-list");
  if (!list) return;
  try {
    const snapshot = await getDocs(query(collection(db, "blogPosts"), orderBy("updatedAt", "desc"), limit(50)));
    if (!snapshot.size) {
      list.innerHTML = '<p class="muted">No posts yet. Write the first one above.</p>';
      return;
    }
    list.innerHTML = "";
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const row = document.createElement("div");
      row.className = "notice-item";
      row.innerHTML =
        '<div class="notice-info">' +
        "<strong>" + escapeHtml(data.title || "") + "</strong>" +
        ' <span class="tag">' + escapeHtml(data.category || "Blog") + "</span>" +
        (data.published ? ' <span class="tag tag-live">Live</span>' : ' <span class="tag">Draft</span>') +
        "<p>" + escapeHtml(data.excerpt || "") + "</p>" +
        "</div>" +
        '<div class="blog-admin-actions">' +
        (data.published ? '<a class="btn btn-outline" href="/blog/post/?slug=' + encodeURIComponent(docSnap.id) + '">View</a>' : "") +
        '<button class="btn btn-outline blog-edit" data-id="' + escapeHtml(docSnap.id) + '" type="button">Edit</button>' +
        '<button class="btn btn-outline blog-del" data-id="' + escapeHtml(docSnap.id) + '" type="button">Delete</button>' +
        "</div>";
      list.appendChild(row);
    });
  } catch (error) {
    list.innerHTML = '<p class="muted">Could not load posts: ' + escapeHtml(error.message) + "</p>";
  }
}

document.getElementById("blog-title")?.addEventListener("input", () => {
  if (!editingSlug && !slugTouched) {
    document.getElementById("blog-slug").value = slugify(document.getElementById("blog-title").value);
  }
});

document.getElementById("blog-slug")?.addEventListener("input", () => { slugTouched = true; });

document.getElementById("blog-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  saveBlogPost(true);
});

document.getElementById("blog-draft")?.addEventListener("click", () => saveBlogPost(false));

document.getElementById("blog-cancel")?.addEventListener("click", () => {
  resetBlogForm();
  message("blog-message", "Editing cancelled.", "success");
});

document.getElementById("blog-list")?.addEventListener("click", async (event) => {
  const edit = event.target.closest?.(".blog-edit");
  const del = event.target.closest?.(".blog-del");
  if (edit) {
    try {
      const snapshot = await getDoc(doc(db, "blogPosts", edit.dataset.id));
      if (!snapshot.exists()) return message("blog-message", "That post no longer exists.", "error");
      const data = snapshot.data();
      editingSlug = snapshot.id;
      document.getElementById("blog-title").value = data.title || "";
      document.getElementById("blog-category").value = data.category || "Notice";
      document.getElementById("blog-slug").value = snapshot.id;
      document.getElementById("blog-slug").readOnly = true;
      document.getElementById("blog-excerpt").value = data.excerpt || "";
      document.getElementById("blog-html").value = data.html || "";
      document.getElementById("blog-cover").value = data.coverImage || "";
      document.getElementById("blog-publish").textContent = "Update & publish";
      document.getElementById("blog-cancel").hidden = false;
      message("blog-message", "Editing “" + (data.title || snapshot.id) + "”. The URL slug stays fixed.", "success");
      document.getElementById("blog-form").scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (error) {
      message("blog-message", "Could not load the post: " + error.message, "error");
    }
    return;
  }
  if (del) {
    if (!window.confirm("Delete this blog post? This cannot be undone.")) return;
    try {
      await deleteDoc(doc(db, "blogPosts", del.dataset.id));
      if (editingSlug === del.dataset.id) resetBlogForm();
      message("blog-message", "Post deleted.", "success");
      loadBlogList();
    } catch (error) {
      message("blog-message", "Could not delete the post: " + error.message, "error");
    }
  }
  });
  } catch (error) {
    console.error("Admin could not reach Firebase:", error);
    var denied = document.getElementById("access-denied");
    if (denied) denied.style.display = "block";
    document.getElementById("access-message").textContent = "Couldn't reach the sign-in service — check your connection.";
  }
})();
