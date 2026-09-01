// Blog rendering for /blog/ (list), /blog/post/ (single), and the homepage
// "latest posts" section. Each part activates only when its element exists.
import { db } from "/assets/js/firebase-config.js?v=2";
import { collection, getDocs, getDoc, doc, query, where, limit } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatDate(value) {
  try {
    var date = value && typeof value.toDate === "function" ? value.toDate() : null;
    if (!date) return "";
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[date.getMonth()] + " " + String(date.getDate()).padStart(2, "0") + ", " + date.getFullYear();
  } catch (error) {
    return "";
  }
}

function newestFirst(a, b) {
  const at = a.publishedAt && typeof a.publishedAt.toDate === "function" ? a.publishedAt.toDate().getTime() : 0;
  const bt = b.publishedAt && typeof b.publishedAt.toDate === "function" ? b.publishedAt.toDate().getTime() : 0;
  return bt - at;
}

// Single-field equality query â€” no composite Firestore index needed; the
// client sorts by publishedAt afterwards.
async function fetchLivePosts(max) {
  const snapshot = await getDocs(query(collection(db, "blogPosts"), where("published", "==", true), limit(max)));
  return snapshot.docs
    .map((docSnap) => Object.assign({ id: docSnap.id }, docSnap.data()))
    .sort(newestFirst);
}

function postCard(post) {
  return '<a class="blog-card" href="/blog/post/?slug=' + encodeURIComponent(post.slug || post.id) + '">' +
    '<span class="tag">' + escapeHtml(post.category || "Blog") + "</span>" +
    "<h3>" + escapeHtml(post.title || "") + "</h3>" +
    '<p class="blog-excerpt">' + escapeHtml(post.excerpt || "") + "</p>" +
    '<span class="blog-meta">' + formatDate(post.publishedAt) + "</span>" +
    "</a>";
}

async function renderBlogList() {
  const list = document.getElementById("blog-list");
  if (!list) return;
  try {
    const posts = await fetchLivePosts(50);
    list.innerHTML = posts.length
      ? posts.map(postCard).join("")
      : '<p class="muted">No posts yet â€” check back soon.</p>';
  } catch (error) {
    list.innerHTML = '<p class="muted">Could not load posts. Please refresh the page.</p>';
  }
}

async function renderHomeBlog() {
  const grid = document.getElementById("home-blog-grid");
  const section = document.getElementById("home-blog-section");
  if (!grid) return;
  try {
    const posts = await fetchLivePosts(3);
    if (!posts.length) return;
    grid.innerHTML = posts.map(postCard).join("");
    if (section) section.hidden = false;
  } catch (error) {
    if (section) section.hidden = true;
  }
}

async function renderPost() {
  const body = document.getElementById("post-body");
  if (!body) return;
  const article = document.getElementById("post-article");
  const missing = document.getElementById("post-missing");
  const slug = new URLSearchParams(location.search).get("slug");
  const showMissing = () => {
    if (article) article.hidden = true;
    if (missing) missing.hidden = false;
  };
  if (!slug) return showMissing();
  try {
    const snapshot = await getDoc(doc(db, "blogPosts", slug));
    if (!snapshot.exists() || snapshot.data().published !== true) throw new Error("missing");
    const post = snapshot.data();
    document.title = (post.title || "Blog post") + " â€” Gyanu Notes";
    document.getElementById("post-title").textContent = post.title || "";
    document.getElementById("post-category").textContent = post.category || "Blog";
    document.getElementById("post-date").textContent = formatDate(post.publishedAt);
    body.innerHTML = post.html || "";
    wireShare(post);
    if (article) article.hidden = false;
  } catch (error) {
    showMissing();
  }
}

function wireShare(post) {
  const url = location.origin + "/blog/post/?slug=" + encodeURIComponent(post.slug || "");
  const text = (post.title || "Gyanu Notes") + " â€” Gyanu Notes";
  const native = document.getElementById("share-native");
  if (native) {
    if (navigator.share) native.addEventListener("click", () => navigator.share({ title: post.title, text: text, url: url }).catch(() => {}));
    else native.hidden = true;
  }
  const copy = document.getElementById("share-copy");
  if (copy) {
    copy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(url);
        copy.textContent = "Link copied âœ“";
        setTimeout(() => { copy.textContent = "Copy link"; }, 2000);
      } catch (error) {
        copy.textContent = url;
      }
    });
  }
  const x = document.getElementById("share-x");
  if (x) x.href = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text) + "&url=" + encodeURIComponent(url);
  const fb = document.getElementById("share-fb");
  if (fb) fb.href = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url);
}

renderBlogList();
renderHomeBlog();
renderPost();