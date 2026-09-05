// scripts/gen-sitemap.js — regenerate sitemap.xml (run: node scripts/gen-sitemap.js)
// Static pages are discovered by walking the repo's index.html files (skipping
// noindex + utility pages); blog posts come from the public Firestore REST API
// so freshly published posts are included without needing a service account.
const fs = require("fs");
const path = require("path");

const SITE = "https://nawarajgupta.com.np";
const PROJECT = "gyanu-notes-6f6d8";
const API_KEY = "AIzaSyA-QLb54wT2y-k4W3GUrsxB9SA-WFZ_03w"; // public web API key
const SKIP_DIRS = new Set([".git", "node_modules", "functions", "scripts", "assets"]);
const SKIP_ROUTES = ["notes/view", "papers/view", "admin"];

function today(ms) { return new Date(ms || Date.now()).toISOString().slice(0, 10); }

function walkStatic(dir, base) {
  let routes = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(e.name)) continue;
    const full = path.join(dir, e.name);
    const rel = path.relative(base, full).replace(/\\/g, "/");
    if (e.isDirectory()) { routes = routes.concat(walkStatic(full, base)); continue; }
    if (e.name !== "index.html") continue;
    const html = fs.readFileSync(full, "utf8");
    if (/name=["']robots["'][^>]*noindex/.test(html)) continue;
    let route = rel === "index.html" ? "/" : "/" + rel.replace(/\/index\.html$/, "") + "/";
    if (SKIP_ROUTES.some((r) => route.startsWith("/" + r + "/"))) continue;
    routes.push({ loc: SITE + route, lastmod: today(fs.statSync(full).mtimeMs) });
  }
  return routes;
}

async function blogPosts() {
  const body = {
    structuredQuery: {
      from: [{ collectionId: "blogPosts" }],
      where: {
        fieldFilter: { field: { fieldPath: "published" }, op: "EQUAL", value: { booleanValue: true } }
      },
      limit: 500
    }
  };
  const res = await fetch(
    "https://firestore.googleapis.com/v1/projects/" + PROJECT + "/databases/(default)/documents:runQuery?key=" + API_KEY,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
  );
  if (!res.ok) { console.warn("blogPosts query failed:", res.status, "— sitemap will contain static pages only"); return []; }
  const rows = await res.json();
  return rows
    .filter((r) => r.document && r.document.fields)
    .map((r) => {
      const f = r.document.fields;
      const slug = f.slug && f.slug.stringValue;
      const ts = f.publishedAt && f.publishedAt.timestampValue;
      return slug ? { loc: SITE + "/blog/post/" + encodeURIComponent(slug) + "/", lastmod: ts ? today(Date.parse(ts)) : today() } : null;
    })
    .filter(Boolean);
}

(async function main() {
  const root = path.join(__dirname, "..");
  const statics = walkStatic(root, root);
  let posts = [];
  try { posts = await blogPosts(); } catch (e) { console.warn("blogPosts error:", e.message); }
  const seen = new Set();
  const urls = statics.concat(posts).filter((u) => (seen.has(u.loc) ? false : (seen.add(u.loc), true)));
  urls.sort((a, b) => a.loc.localeCompare(b.loc));
  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map((u) =>
      "  <url><loc>" + u.loc + "</loc><lastmod>" + u.lastmod + "</lastmod></url>"
    ).join("\n") +
    "\n</urlset>\n";
  fs.writeFileSync(path.join(root, "sitemap.xml"), xml, "utf8");
  console.log("sitemap.xml written: " + urls.length + " URLs (" + statics.length + " static, " + posts.length + " posts)");
})();