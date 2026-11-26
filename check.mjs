// Post-build QA. Run after `node build.mjs`.
import fs from 'node:fs';
import path from 'node:path';
const DIST = path.resolve('dist');
const files = [];
(function walk(d) { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name); f.isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); } })(DIST);
const toUrl = (f) => '/' + path.relative(DIST, f).replace(/index\.html$/, '').replace(/\\/g, '/');
const exists = (u) => { const c = u.split('#')[0].split('?')[0]; if (!c || c === '/') return true; if (/\.[a-z0-9]+$/i.test(c)) return fs.existsSync(path.join(DIST, c)); return fs.existsSync(path.join(DIST, c, 'index.html')); };
const errs = [], warns = [], titles = new Map(), descs = new Map();
const FORBID = ['Chestnut is an intermediary', 'Policies are issued by insurers', 'The people', 'Where we are strongest', 'For you and your family', 'CONFIRM before launch', 'class="todo"', '/contact/"', 'insurance-guides/"'];
for (const f of files) {
  const html = fs.readFileSync(f, 'utf8'), url = toUrl(f);
  const m = (re) => (html.match(re) || [])[1];
  const title = m(/<title>(.*?)<\/title>/), desc = m(/<meta name="description" content="(.*?)">/), noindex = /content="noindex/.test(html);
  if (!noindex) {
    if (!title) errs.push(`${url}: missing title`); else { if (titles.has(title)) errs.push(`${url}: duplicate title with ${titles.get(title)}`); titles.set(title, url); if (title.length > 100) errs.push(`${url}: title ${title.length} chars`); else if (title.length > 75) warns.push(url); }
    if (!desc) errs.push(`${url}: missing description`); else { if (descs.has(desc)) errs.push(`${url}: duplicate description with ${descs.get(desc)}`); descs.set(desc, url); if (desc.length > 180) errs.push(`${url}: description ${desc.length} chars`); }
    const canon = m(/rel="canonical" href="(.*?)"/); if (!canon || !canon.endsWith(url === '/404.html' ? '/404.html' : url)) errs.push(`${url}: canonical wrong (${canon})`);
  }
  const h1 = (html.match(/<h1[ >]/g) || []).length; if (h1 !== 1) errs.push(`${url}: ${h1} h1 tags`);
  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) { if (/^(https?:|mailto:|tel:|#)/.test(href)) continue; if (href.startsWith('/') && !exists(href)) errs.push(`${url}: broken link ${href}`); }
  for (const [, src] of html.matchAll(/(?:src|href)="(\/(?:img|partners|brand|fonts)\/[^"]+)"/g)) if (!exists(src)) errs.push(`${url}: missing asset ${src}`);
  for (const [, set] of html.matchAll(/srcset="([^"]+)"/g)) for (const part of set.split(',')) { const u = part.trim().split(' ')[0]; if (u.startsWith('/') && !exists(u)) errs.push(`${url}: missing srcset asset ${u}`); }
  for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) { if (!/ alt=/.test(tag)) errs.push(`${url}: img without alt`); if (!/ width=/.test(tag) || !/ height=/.test(tag)) errs.push(`${url}: img without dimensions`); }
  { const ids = [...html.matchAll(/ id="([^"]+)"/g)].map((x) => x[1]); const dup = ids.filter((x, i) => ids.indexOf(x) !== i); if (dup.length) errs.push(`${url}: duplicate id ${[...new Set(dup)].join(', ')}`); }
  for (const [, id] of html.matchAll(/aria-controls="([^"]+)"/g)) if (!html.includes(`id="${id}"`)) errs.push(`${url}: aria-controls target missing ${id}`);
  const vis = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');
  if (/[\u2014\u2013]/.test(vis)) errs.push(`${url}: contains a long dash`);
  for (const x of FORBID) if (vis.includes(x)) errs.push(`${url}: forbidden text "${x}"`);
  const text = vis.replace(/<[^>]+>/g, ' ');
  if (/Chestnut(?! Insurance Agency| Red)/.test(text)) errs.push(`${url}: bare "Chestnut" in visible text`);
  if (!/class="mega-btn"|class="menu-btn"/.test(html)) errs.push(`${url}: navigation missing`);
  if (!html.includes('<a href="/">Home</a>') && !html.includes('href="/" aria-current="page">Home')) errs.push(`${url}: no Home link`);
  for (const [, j] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) { try { JSON.parse(j); } catch { errs.push(`${url}: invalid JSON-LD`); } }
}
const css = fs.readFileSync(path.join(DIST, 'styles.css'), 'utf8');
if (/background:\s*(#000|black)\b/i.test(css)) errs.push('css: black background found');
if (!/font-family:"Montserrat"/.test(css.replace(/\s/g, ''))) errs.push('css: Montserrat @font-face missing');
if (/Fraunces|Instrument Sans/.test(css)) errs.push('css: old font still referenced');
for (const need of ['/contact-us/', '/blog/', '/life-insurance-kenya/', '/marine-insurance-kenya/digital-marine-certificate/', '/financial-products/']) if (!exists(need)) errs.push(`missing page ${need}`);
const home = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
if ((home.match(/class="partner"/g) || []).length !== 11) errs.push('home: expected 11 partner logos');
if (!home.includes('hero-1600')) errs.push('home: hero photo missing');
if (!home.includes('Wealth Management')) errs.push('home: Wealth Management pathway missing');
const contact = fs.readFileSync(path.join(DIST, 'contact-us/index.html'), 'utf8');
for (const need of ['wa.me/254721233951', 'tel:+254721233951', 'info@chestnut.co.ke', 'James Gichuru Road', 'google.com/maps/embed', 'IRA/05/44335/2026']) if (!contact.includes(need)) errs.push(`contact-us: missing ${need}`);
const sm = fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8');
for (const [, loc] of sm.matchAll(/<loc>(.*?)<\/loc>/g)) { const p = loc.replace(/^https?:\/\/[^/]+/, ''); if (!exists(p)) errs.push(`sitemap: ${p} not built`); }
if (sm.includes('/contact/<')) errs.push('sitemap: old /contact/');
const rd = fs.readFileSync(path.join(DIST, '_redirects'), 'utf8').split('\n').filter(Boolean); const from = new Set(rd.map((l) => l.split(' ')[0]));
for (const line of rd) { const [a, to] = line.split(' '); if (!exists(to)) errs.push(`redirect target missing: ${line}`); if (to === '/') errs.push(`redirect to homepage: ${line}`); if (from.has(to) || from.has(to.replace(/\/$/, ''))) errs.push(`redirect chain: ${line}`); }
const linked = new Set(); for (const f of files) for (const [, h] of fs.readFileSync(f, 'utf8').matchAll(/href="(\/[^"#?]*)"/g)) linked.add(h);
for (const f of files) { const u = toUrl(f); if (u !== '/' && !u.endsWith('404.html') && !linked.has(u)) errs.push(`orphan page: ${u}`); }
console.log(`Checked ${files.length} pages. ${warns.length} titles between 75 and 100 chars (keywords are front-loaded).`);
if (errs.length) { console.log(errs.join('\n')); process.exit(1); } else console.log('All checks passed.');
