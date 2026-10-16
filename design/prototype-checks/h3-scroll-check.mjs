// Run from the pwtest folder: node h3-scroll-check.mjs <prototype dir>
import chromium from '@sparticuz/chromium';
import { chromium as pw } from 'playwright-core';
import { pathToFileURL } from 'url';
const dir = process.argv[2];
const exe = await chromium.executablePath();
const b = await pw.launch({ executablePath: exe, args: chromium.args, headless: true });
const out = [];
const p = await b.newPage({ viewport: { width: 640, height: 360 } });
for (const [w, h] of [[640, 360], [320, 256]]) {
  await p.setViewportSize({ width: w, height: h });
  await p.goto(pathToFileURL(dir + '/admin-session-warning.html').href + '?remaining=120');
  await p.waitForTimeout(500);
  const r = await p.evaluate(() => {
    const d = document.querySelector('.dialog');
    const cs = getComputedStyle(d);
    const btn = d.querySelector('[data-stay]');
    btn.scrollIntoView({ block: 'nearest' });
    const br = btn.getBoundingClientRect();
    return { overflowY: cs.overflowY, dialogBottom: Math.round(d.getBoundingClientRect().bottom), buttonBottom: Math.round(br.bottom), vh: innerHeight, buttonVisible: br.bottom <= innerHeight + 1 && br.top >= 0 };
  });
  out.push({ w, h, ...r });
}
console.log(JSON.stringify(out, null, 1));
await b.close();
