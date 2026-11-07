const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const pages = [
    { url: 'http://localhost:8079/', name: 'home' },
    { url: 'http://localhost:8079/dashboard/', name: 'dashboard' },
    { url: 'http://localhost:8079/profile/', name: 'profile' },
    { url: 'http://localhost:8079/login/', name: 'login' },
    { url: 'http://localhost:8079/about/', name: 'about' },
    { url: 'http://localhost:8079/notes/class-10/mathematics/', name: 'class-10-math' },
    { url: 'http://localhost:8079/notes/view/?id=c10-math-01', name: 'chapter-view' },
    { url: 'http://localhost:8079/papers/', name: 'papers' },
  ];
  for (const p of pages) {
    const page = await browser.newPage();
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', err => errors.push(err.message));
    let status = null;
    try {
      const resp = await page.goto(p.url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      status = resp ? resp.status() : null;
    } catch (e) {
      status = 'NAV_ERROR: ' + e.message;
    }
    await page.waitForTimeout(1000);
    console.log('=== ' + p.name + ' (' + p.url + ') ===');
    console.log('status: ' + status);
    console.log('console errors: ' + (errors.length ? errors.join(' | ') : 'none'));
    await page.close();
  }
  await browser.close();
  console.log('Done.');
})();
