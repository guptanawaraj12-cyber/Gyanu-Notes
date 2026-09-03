// Blog rendering for /blog/ (list), /blog/post/ (single), and the homepage
// "latest posts" section. Each part activates only when its element exists.
import { db } from "/assets/js/firebase-config.js?v=3";
import { collection, getDocs, getDoc, doc, query, where, limit } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// Posts published within the last 7 days get a "New" badge on cards.
var NEW_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

function isRecent(value) {
  try {
    var date = value && typeof value.toDate === "function" ? value.toDate() : null;
    return !!date && Date.now() - date.getTime() < NEW_WINDOW_MS;
  } catch (error) { return false; }
}

// Rough reading time at ~200 words per minute.
function readingMinutes(html) {
  var words = String(html || "").replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// Clean URLs: /blog/post/<slug>/ — ?slug= links keep working as a fallback.
function postPath(slug) {
  return "/blog/post/" + encodeURIComponent(slug || "") + "/";
}

function setMeta(attr, key, content) {
  var el = document.head.querySelector("meta[" + attr + "=\"" + key + "\"]");
  if (el && content) el.setAttribute("content", content);
}

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

// Single-field equality query — no composite Firestore index needed; the
// client sorts by publishedAt afterwards.
async function fetchLivePosts(max) {
  const snapshot = await getDocs(query(collection(db, "blogPosts"), where("published", "==", true), limit(max)));
  return snapshot.docs
    .map((docSnap) => Object.assign({ id: docSnap.id }, docSnap.data()))
    .sort(newestFirst);
}

function postCard(post) {
  const slug = post.slug || post.id;
  const cover = typeof post.coverImage === "string" && post.coverImage.trim() ? post.coverImage.trim() : "";
  return '<a class="blog-card" href="' + postPath(slug) + '">' +
    (cover ? '<span class="blog-cover"><img src="' + escapeHtml(cover) + '" alt="" loading="lazy"></span>' : "") +
    '<span class="blog-card-tags">' +
      '<span class="tag">' + escapeHtml(post.category || "Blog") + "</span>" +
      (isRecent(post.publishedAt) ? '<span class="tag tag-new">New</span>' : "") +
    "</span>" +
    "<h3>" + escapeHtml(post.title || "") + "</h3>" +
    '<p class="blog-excerpt">' + escapeHtml(post.excerpt || "") + "</p>" +
    '<span class="blog-meta">' + formatDate(post.publishedAt) + "</span>" +
    "</a>";
}

let listPosts = [];
let activeCategory = "All";

function renderCategoryFilter(posts) {
  const wrap = document.getElementById("blog-filters");
  if (!wrap) return;
  const categories = [];
  posts.forEach((post) => {
    if (post.category && !categories.includes(post.category)) categories.push(post.category);
  });
  if (categories.length < 2) { wrap.hidden = true; return; }
  wrap.hidden = false;
  const chip = (name) =>
    '<button class="chip' + (name === activeCategory ? " chip-active" : "") +
    '" data-category="' + escapeHtml(name) + '" type="button">' + escapeHtml(name) + "</button>";
  wrap.innerHTML = chip("All") + categories.map(chip).join("");
}

function renderFilteredPosts() {
  const list = document.getElementById("blog-list");
  const visible = activeCategory === "All"
    ? listPosts
    : listPosts.filter((post) => post.category === activeCategory);
  list.innerHTML = visible.length
    ? visible.map(postCard).join("")
    : '<p class="muted">No posts in this category yet.</p>';
}

async function renderBlogList() {
  const list = document.getElementById("blog-list");
  if (!list) return;
  try {
    listPosts = await fetchLivePosts(50);
    renderCategoryFilter(listPosts);
    renderFilteredPosts();
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
    const cleanUrl = location.origin + postPath(slug);
    document.title = (post.title || "Blog post") + " — Gyanu Notes";
    document.getElementById("post-title").textContent = post.title || "";
    document.getElementById("post-category").textContent = post.category || "Blog";
    const dateText = formatDate(post.publishedAt);
    document.getElementById("post-date").innerHTML = dateText
      ? escapeHtml(dateText) + " · " + readingMinutes(post.html) + " min read"
      : "";
    // Per-post SEO: description, canonical URL, and Open Graph tags.
    setMeta("name", "description", post.excerpt || "");
    const canonical = document.head.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", cleanUrl);
    setMeta("property", "og:title", (post.title || "Blog post") + " — Gyanu Notes");
    setMeta("property", "og:description", post.excerpt || "");
    setMeta("property", "og:url", cleanUrl);
    const published = post.publishedAt && typeof post.publishedAt.toDate === "function" ? post.publishedAt.toDate() : null;
    if (published) setMeta("property", "article:published_time", published.toISOString());
    const cover = typeof post.coverImage === "string" && post.coverImage.trim() ? post.coverImage.trim() : "";
    if (cover) {
      setMeta("property", "og:image", cover);
      const hero = document.getElementById("post-cover");
      if (hero) { hero.innerHTML = '<img src="' + escapeHtml(cover) + '" alt="">'; hero.hidden = false; }
    }
    body.innerHTML = post.html || "";
    wireShare(post, cleanUrl);
    if (article) article.hidden = false;
  } catch (error) {
    showMissing();
  }
}

function wireShare(post, cleanUrl) {
  const url = cleanUrl || location.origin + postPath(post.slug || "");
  const text = (post.title || "Gyanu Notes") + " — Gyanu Notes";
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
        copy.textContent = "Link copied ✓";
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

document.getElementById("blog-filters")?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category || "All";
  document.querySelectorAll("#blog-filters .chip").forEach((chip) => {
    chip.classList.toggle("chip-active", chip === button);
  });
  renderFilteredPosts();
});

renderBlogList();
renderHomeBlog();
renderPost();