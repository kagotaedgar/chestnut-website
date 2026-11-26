// Chestnut Insurance Agency static site build. Zero dependencies. Run: node build.mjs  ->  ./dist
import fs from 'node:fs';
import path from 'node:path';
import { site, mapEmbed } from './src/config.mjs';
import { nodes, childrenOf, parentOf, alsoOf } from './src/tree.mjs';
import { business } from './src/products-business.mjs';
import { personal } from './src/products-personal.mjs';
import { added } from './src/products-new.mjs';
import { wealth } from './src/products-wealth.mjs';
import { guides } from './src/guides.mjs';
import { services } from './src/services.mjs';
import { overrides } from './src/localise.mjs';
import { legacy, renamed } from './src/redirects.mjs';
import {
  esc, abs, blurbs, label, exists, layout, trailFor, crumbsHtml, crumbsSchema, faqHtml, faqSchema, ul, indexList, ctaBand,
  field, phoneField, formShell, picture, partnersCarousel, waLink, telLink, mailLink, contactButtons
} from './src/render2.mjs';

const FULL = 'Chestnut Insurance Agency';
const DIST = path.resolve('dist');
const pages = [];
const warnings = [];
const emit = (p, html, noindex = false) => pages.push({ path: p, html, noindex });

// ------------------------------------------------------------------ register guides in the tree (children of /blog/)
const blog = nodes.get('/blog/');
for (const g of guides) {
  const node = { path: g.path, label: g.title.split('|')[0].trim(), children: [], parent: '/blog/' };
  nodes.set(g.path, node); blog.children.push(node);
}

// ------------------------------------------------------------------ merge product data
const remap = {
  '/wiba-insurance-kenya/guide/': '/blog/wiba-insurance-kenya/',
  '/professional-indemnity-insurance-kenya/guide/': '/blog/professional-indemnity-insurance-kenya-who-needs-it/',
  '/insurance-guides/public-liability-vs-professional-indemnity/': '/blog/public-liability-vs-professional-indemnity/',
  '/insurance-guides/comprehensive-vs-third-party-motor-insurance/': '/blog/comprehensive-vs-third-party-motor-insurance-kenya/',
  '/sme-insurance-kenya/checklist/': '/blog/sme-insurance-checklist-kenya/',
  '/business-insurance-kenya/renewal-checklist/': '/blog/business-insurance-renewal-checklist-kenya/',
  '/insurance-guides/': '/blog/'
};
const P = new Map();
for (const p of [...business, ...personal.filter((x) => !x.financial), ...added, ...wealth]) P.set(p.path, { ...(P.get(p.path) || {}), ...p });
for (const [p, o] of Object.entries(overrides)) { if (!P.has(p)) warnings.push(`override for unknown page ${p}`); P.set(p, { ...(P.get(p) || {}), ...o }); }
const fix = (arr = []) => arr.map((x) => remap[x] || x).filter((x) => exists(x));

const firstSentence = (lead = '') => { const f = lead.split(/\.\s/)[0].replace(/\.$/, '') + '.'; return f.length > 140 ? f.slice(0, 137).replace(/\s+\S*$/, '') + '...' : f; };
for (const [p, v] of P) blurbs.set(p, v.blurb || firstSentence(v.lead));
for (const s of services) blurbs.set(s.path, s.blurb);
for (const g of guides) blurbs.set(g.path, g.desc);
Object.entries({
  '/insurance-solutions/': 'All our insurance for individuals, families, businesses and organisations.',
  '/personal-insurance/': 'Motor, medical, life, travel, home and personal accident cover.',
  '/business-insurance-kenya/': 'Property, liability, engineering, marine, SME and employee benefits.',
  '/financial-products/': 'Money market funds, savings and education plans, pensions and annuities.',
  '/insurance-advisory-services/': 'Reviews, claims support, procurement and tender help for your team.'
}).forEach(([k, v]) => { if (!blurbs.has(k)) blurbs.set(k, v); });

for (const p of nodes.keys()) {
  const special = ['/', '/insurance-solutions/', '/personal-insurance/', '/insurance-advisory-services/', '/blog/', '/about/', '/contact-us/', '/get-a-quote/', '/privacy/'];
  if (special.includes(p) || P.has(p) || services.some((s) => s.path === p) || guides.some((g) => g.path === p)) continue;
  warnings.push(`tree page with no content: ${p}`);
}

// ------------------------------------------------------------------ image mapping (uploaded photos only)
const IMG = {
  '/business-insurance-kenya/': ['business-hub', 'Business owner in a suit outside a modern Nairobi office building'],
  '/sme-insurance-kenya/': ['sme', 'Kenyan boutique owner working on her laptop in her clothing shop'],
  '/professional-indemnity-insurance-kenya/': ['professional', 'Kenyan professional at her desk with a laptop and the city behind her'],
  '/liability-insurance-kenya/': ['professional', 'Kenyan professional at her desk with a laptop and the city behind her'],
  '/wiba-insurance-kenya/': ['wiba', 'Smiling site engineer in a hard hat and safety vest on a Kenyan construction site'],
  '/employee-benefits-insurance/': ['home-advisory', 'Insurance adviser reviewing a tablet with two clients across a desk'],
  '/business-property-insurance/': ['property-fire', 'Firefighters tackling a fire in a modern commercial building'],
  '/business-property-insurance/fire/': ['property-fire', 'Firefighters tackling a fire in a modern commercial building'],
  '/engineering-insurance-kenya/': ['construction', 'Construction supervisor holding plans at a building site with a tower crane'],
  '/contractors-all-risks-insurance-kenya/': ['construction', 'Construction supervisor holding plans at a building site with a tower crane'],
  '/insurance-for-contractors-kenya/': ['wiba', 'Smiling site engineer in a hard hat and safety vest on a Kenyan construction site'],
  '/marine-insurance-kenya/': ['cargo', 'Container ship, cranes and lorry loading cargo at a port'],
  '/marine-insurance-kenya/digital-marine-certificate/': ['cargo', 'Container ship, cranes and lorry loading cargo at a port'],
  '/goods-in-transit-insurance-kenya/': ['cargo', 'Container ship, cranes and lorry loading cargo at a port'],
  '/motor-insurance-kenya/': ['motor', 'Kenyan family with their car and a set of car keys'],
  '/medical-insurance-kenya/': ['medical', 'Doctor showing a tablet to a mother and her daughter in a hospital room'],
  '/life-insurance-kenya/': ['home-family', 'Kenyan family laughing together in the garden of their home'],
  '/travel-insurance-kenya/': ['travel', 'Kenyan family with passports and luggage at the airport departures area'],
  '/claims-assistance/': ['claims', 'Adviser explaining a claim on a tablet to a client beside a damaged car']
};
const pictureFor = (p, opts = {}) => (IMG[p] ? picture(IMG[p][0], IMG[p][1], opts) : '');

// ------------------------------------------------------------------ helpers
const quoteLink = (p) => `/get-a-quote/?cover=${encodeURIComponent(p)}`;
const topOf = (p) => { let c = p; while (parentOf(c) && parentOf(parentOf(c))) c = parentOf(c); return c; };
const pillFor = (p) => {
  const chain = []; let c = p; while (c) { chain.push(c); c = parentOf(c); }
  if (chain.includes('/financial-products/')) return 'Wealth Management';
  if (chain.includes('/personal-insurance/')) return 'Personal Insurance';
  if (chain.includes('/business-insurance-kenya/')) return 'Business Insurance';
  if (chain.includes('/insurance-advisory-services/')) return 'Advisory Services';
  return 'Insurance';
};
const schemaPage = (p, title, desc, extra = {}) => ({ '@type': 'WebPage', '@id': abs(p) + '#page', url: abs(p), name: title, description: desc, isPartOf: { '@id': abs('/#website') }, inLanguage: 'en-KE', ...extra });

// ------------------------------------------------------------------ product / hub page
function productPage(p) {
  const trail = trailFor(p.path);
  const isWealth = pillFor(p.path) === 'Wealth Management';
  const kids = childrenOf(p.path).filter((k) => k.group !== 'industry');
  const inds = childrenOf(p.path).filter((k) => k.group === 'industry');
  const also = alsoOf(p.path).filter(exists);
  const sibs = parentOf(p.path) ? childrenOf(parentOf(p.path)).filter((c) => c.path !== p.path && c.group !== 'industry') : [];
  const rel = fix(p.related), gds = fix(p.guides);
  const parent = parentOf(p.path);
  const img = pictureFor(p.path, { eager: true, sizes: '(min-width: 980px) 520px, 100vw' });
  const hubName = label(p.path);
  const cta = isWealth ? 'Speak to an adviser' : 'Get a quote';
  const body = `
<section class="page-hero"><div class="wrap${img ? ' hero-split' : ''}">
  <div class="hero-copy">${crumbsHtml(trail)}
    <p class="pill-wrap"><span class="pill${isWealth ? ' pill-wealth' : ''}">${pillFor(p.path)}</span></p>
    <h1>${esc(p.h1)}</h1>
    <p class="lead">${esc(p.lead)}</p>
    <div class="btn-row"><a class="btn btn-primary" href="${quoteLink(p.path)}">${cta}</a><a class="btn btn-ghost" href="${esc(waLink(`Hello ${FULL}, I would like to ask about ${hubName}.`))}" rel="noopener">WhatsApp us</a></div>
  </div>
  ${img ? `<div class="hero-img">${img}</div>` : ''}
</div></section>
<div class="wrap product-grid">
  <article class="prose">
    ${kids.length ? `<h2>${esc(hubName)} solutions</h2><p>Choose the cover that fits your situation.</p>${indexList(kids.map((k) => k.path))}` : ''}
    ${also.length ? `<h2>Related solutions</h2>${indexList(also)}` : ''}
    ${inds.length ? `<h2>Insurance for your industry</h2>${indexList(inds.map((k) => k.path))}` : ''}
    <h2>${isWealth ? 'How it can help you' : 'What it covers'}</h2>${ul(p.covers)}
    <h2>Who needs it</h2>${ul(p.who)}
    ${p.local ? `<h2>What to know in Kenya</h2>${ul(p.local)}` : ''}
    <h2>Common risks</h2>${p.risks.map(([t, x]) => `<div class="risk"><h3>${esc(t)}</h3><p>${esc(x)}</p></div>`).join('')}
    <h2>Important considerations</h2>${ul(p.limits)}
    <h2>${isWealth ? 'What shapes the outcome' : 'What affects the premium'}</h2>${ul(p.factors)}
    <h2>${isWealth ? 'What to have ready' : 'What we need for a quotation'}</h2>${ul(p.info)}
    <h2>How ${FULL} helps</h2>
    <p>${isWealth ? `${FULL} helps you set clear goals, compares suitable options from licensed providers, explains charges, access and tax in plain language, and supports you through application and review.` : `${FULL} explains the cover in plain language, collects the information insurers need, approaches suitable licensed insurers for terms, and supports you with renewals, endorsements and claims. You decide what to buy.`}</p>
    <h2>Frequently asked questions</h2>${faqHtml(p.faqs)}
    ${p.disclosure ? `<details class="disclosure"><summary>Important information</summary><p>${esc(p.disclosure)}</p></details>` : ''}
  </article>
  <aside class="aside">
    <div class="aside-box"><h2>${isWealth ? 'Talk to an adviser' : `Get a ${esc(hubName.toLowerCase())} quote`}</h2>
      <p>${isWealth ? 'Tell us your goal and we will outline practical options.' : 'Share a few details and an adviser will respond with options. It takes about two minutes.'}</p>
      <a class="btn btn-primary" href="${quoteLink(p.path)}">${cta}</a>
      <a class="btn btn-ghost" href="${esc(waLink(`Hello ${FULL}, I would like to ask about ${hubName}.`))}" rel="noopener">WhatsApp ${esc(site.phoneDisplay)}</a>
      <a class="btn btn-ghost" href="${esc(telLink())}">Call ${esc(site.phoneDisplay)}</a></div>
    ${parent && sibs.length ? `<div class="aside-links"><h3>More in <a href="${parent}">${esc(label(parent))}</a></h3><ul>${sibs.map((s) => `<li><a href="${s.path}">${esc(s.label)}</a></li>`).join('')}</ul></div>` : ''}
    ${rel.length ? `<div class="aside-links"><h3>Related cover</h3><ul>${rel.map((x) => `<li><a href="${x}">${esc(label(x))}</a></li>`).join('')}</ul></div>` : ''}
    ${gds.length ? `<div class="aside-links"><h3>Guides</h3><ul>${gds.map((x) => `<li><a href="${x}">${esc(label(x))}</a></li>`).join('')}</ul></div>` : ''}
    <div class="aside-links"><h3>Advisory</h3><ul><li><a href="/insurance-portfolio-review/">Insurance portfolio review</a></li><li><a href="/claims-assistance/">Claims assistance</a></li></ul></div>
  </aside>
</div>
${ctaBand()}`;
  emit(p.path, layout({ path: p.path, title: p.title, desc: p.desc, body, schema: [schemaPage(p.path, p.title, p.desc), crumbsSchema(trail), faqSchema(p.faqs)] }));
}
for (const p of P.values()) { if (exists(p.path)) productPage(p); }

// ------------------------------------------------------------------ generic hub
function hubShell({ path: hp, title, desc, h1, lead, body, pill, image }) {
  const trail = trailFor(hp);
  const html = `<section class="page-hero hub-hero"><div class="wrap${image ? ' hero-split' : ''}"><div class="hero-copy">${crumbsHtml(trail)}${pill ? `<p class="pill-wrap"><span class="pill">${esc(pill)}</span></p>` : ''}<h1>${esc(h1)}</h1><p class="lead">${esc(lead)}</p></div>${image ? `<div class="hero-img">${image}</div>` : ''}</div></section>${body}${ctaBand()}`;
  emit(hp, layout({ path: hp, title, desc, body: html, schema: [{ '@type': 'CollectionPage', url: abs(hp), name: title, description: desc }, crumbsSchema(trail)] }));
}
const two = (h, intro, list, warm = false) => `<section class="section${warm ? ' section-warm' : ''}"><div class="wrap"><div class="split"><div><h2>${esc(h)}</h2><p class="muted">${esc(intro)}</p></div><div>${list}</div></div></div></section>`;
const kidsOf = (p) => childrenOf(p).filter((k) => k.group !== 'industry').map((k) => k.path);

hubShell({
  path: '/insurance-solutions/', pill: 'Insurance Solutions',
  title: `Insurance Solutions in Kenya | Personal and Business | ${FULL}`,
  desc: `Explore insurance in Kenya: motor, medical, life, travel, business, liability, marine, engineering and employee benefits. Get advice from ${FULL}.`,
  h1: 'Insurance solutions for every Kenyan need', lead: `Start with who you are and what you need to protect. Every page explains the cover in plain language, what to watch for in Kenya, and what ${FULL} needs to quote.`,
  body: two('Personal insurance', 'For individuals and families.', indexList(kidsOf('/personal-insurance/'))) +
    two('Business insurance', 'For SMEs, corporates and professionals.', indexList(kidsOf('/business-insurance-kenya/')), true) +
    two('By industry', 'Cover shaped around how your sector works.', indexList(childrenOf('/business-insurance-kenya/').filter((k) => k.group === 'industry').map((k) => k.path))) +
    two('Wealth management', 'Saving, investing and retirement planning.', indexList(kidsOf('/financial-products/')), true)
});
hubShell({
  path: '/personal-insurance/', pill: 'Personal Insurance',
  title: `Personal Insurance Kenya | Motor, Medical, Life, Travel | ${FULL}`,
  desc: `Personal insurance in Kenya for you and your family: motor, medical, life, travel, home and personal accident cover. Compare options with ${FULL}.`,
  h1: 'Personal insurance for Kenyan individuals and families', lead: `Cars, health, life, travel, home and accidents. ${FULL} explains what each cover does, what it does not, and how to choose among licensed Kenyan insurers.`,
  body: two('Choose a cover', 'Each page sets out what to check before you buy.', indexList(kidsOf('/personal-insurance/'))) +
    `<section class="section section-warm"><div class="wrap"><p>Looking to save or plan for school fees and retirement? See <a href="/financial-products/">Wealth Management</a> for money market funds, savings and education plans, pensions and annuities.</p></div></section>`
});
hubShell({
  path: '/insurance-advisory-services/', pill: 'Advisory Services',
  title: `Insurance Advisory Services Kenya for HR, Finance and Procurement | ${FULL}`,
  desc: `Practical insurance advisory services for Kenyan HR, procurement, finance and admin teams: portfolio reviews, renewals, claims, tenders and staff education.`,
  h1: 'Advisory services for the teams that manage insurance', lead: `Insurance programmes are run by people in HR, Procurement, Finance and Admin. ${FULL} supports those teams with practical services that help you get more from your insurance programme.`,
  body: `<section class="section"><div class="wrap"><ul class="index svc-index">${services.map((s) => `<li><a href="${s.path}"><span class="i-name">${esc(label(s.path))}</span><span class="i-desc">${esc(s.blurb)}</span><span class="i-team">${esc(s.team)}</span></a></li>`).join('')}</ul></div></section>`
});
{
  const cats = [...new Set(guides.map((g) => g.category))];
  hubShell({
    path: '/blog/', pill: 'Guides',
    title: `Insurance Guides Kenya | Practical Insurance and Wealth Articles | ${FULL}`,
    desc: `Plain-language guides for Kenyans: digital marine certificate, WIBA, motor, medical, SME insurance, professional indemnity and money market funds.`,
    h1: 'Insurance and wealth guides for Kenya', lead: `Clear, practical explanations written for Kenyan individuals, businesses and professionals, with links to the cover each guide explains and the next step.`,
    body: `<section class="section"><div class="wrap">${cats.map((c) => `<h2 class="cat-h">${esc(c)}</h2>${indexList(guides.filter((g) => g.category === c).map((g) => g.path), (x) => guides.find((g) => g.path === x).desc)}`).join('')}</div></section>`
  });
}

// ------------------------------------------------------------------ guides
for (const g of guides) {
  const trail = trailFor(g.path);
  const rel = fix(g.related);
  const body = `<section class="article-hero"><div class="wrap">${crumbsHtml(trail)}<p class="pill-wrap"><span class="pill">${esc(g.category)} guide</span></p><h1>${esc(g.h1)}</h1>
  <p class="byline">${FULL} editorial team &middot; Published ${new Date(site.published).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p></div></section>
<article class="article"><p class="answer">${esc(g.answer)}</p>
  ${g.sections.map((s) => `<h2>${esc(s.h)}</h2>${(s.p || []).map((x) => `<p>${esc(x)}</p>`).join('')}${s.ul ? ul(s.ul) : ''}`).join('')}
  <div class="callout">Related cover: <a href="${g.cover}">${esc(label(g.cover))}</a>. <a href="/contact-us/">Speak to an adviser</a> about your situation.</div>
  <div class="btn-row"><a class="btn btn-primary" href="${quoteLink(g.cover)}">Get a quote</a><a class="btn btn-ghost" href="${esc(waLink())}" rel="noopener">WhatsApp us</a></div>
  <div class="read-next"><h2>Read next</h2>${indexList(rel)}</div></article>${ctaBand()}`;
  emit(g.path, layout({ path: g.path, title: g.title, desc: g.desc, body, ogType: 'article', schema: [{ '@type': 'Article', headline: g.h1, description: g.desc, datePublished: site.published, dateModified: site.published, mainEntityOfPage: abs(g.path), inLanguage: 'en-KE', author: { '@id': abs('/#org') }, publisher: { '@id': abs('/#org') } }, crumbsSchema(trail)] }));
}

// ------------------------------------------------------------------ advisory service pages
function serviceForm(s) {
  const base = field({ id: 'name', label: 'Your name', required: true, autocomplete: 'name' }) + `<div class="row">${phoneField()}${field({ id: 'email', label: 'Email', type: 'email', required: true, autocomplete: 'email' })}</div>` + field({ id: 'organisation', label: 'Organisation', required: s.kind !== 'claims' });
  const extra = {
    claims: `<div class="row">${field({ id: 'insurer', label: 'Insurer' })}${field({ id: 'policy_type', label: 'Type of policy', hint: 'e.g. motor, fire, WIBA', required: true })}</div>${field({ id: 'incident_date', label: 'Date of incident', type: 'date', required: true })}`,
    tender: `<div class="row">${field({ id: 'deadline', label: 'Submission deadline', type: 'date', required: true })}${field({ id: 'procuring', label: 'Procuring entity' })}</div>`,
    review: field({ id: 'renewal', label: 'Next renewal date', type: 'date' }),
    renewal: field({ id: 'renewal', label: 'Next renewal date', type: 'date' }),
    education: field({ id: 'staff', label: 'Approximate number of staff' }),
    risk: field({ id: 'industry', label: 'Industry', required: true })
  }[s.kind] || '';
  const prompt = { review: 'Which policies do you hold and what would you like us to focus on?', risk: 'What worries you most about the business?', policy: 'Which policy or contract clause would you like reviewed?', renewal: 'Which policies are due and when?', procurement: 'What are you looking to buy and by when?', tender: 'Which insurance requirements does the tender set?', claims: 'Briefly, what happened?', programme: 'How many policies, vehicles, sites and staff do you manage?', education: 'Which benefits should the sessions cover?' }[s.kind];
  return formShell(`service-${s.kind}`, `${label(s.path)} request from website`, base + extra + field({ id: 'message', label: prompt, type: 'textarea', required: ['claims', 'tender'].includes(s.kind) }), 'Send my request');
}
for (const s of services) {
  const trail = trailFor(s.path);
  const img = pictureFor(s.path, { eager: true, sizes: '(min-width: 980px) 520px, 100vw' });
  const body = `<section class="page-hero"><div class="wrap${img ? ' hero-split' : ''}"><div class="hero-copy">${crumbsHtml(trail)}<p class="pill-wrap"><span class="pill">Advisory service &middot; ${esc(s.team)}</span></p><h1>${esc(s.h1)}</h1><p class="lead">${esc(s.lead)}</p>
  <div class="btn-row"><a class="btn btn-primary" href="#request">Make a request</a><a class="btn btn-ghost" href="${esc(waLink(`Hello ${FULL}, I would like help with ${label(s.path)}.`))}" rel="noopener">WhatsApp us</a></div></div>${img ? `<div class="hero-img">${img}</div>` : ''}</div></section>
<div class="wrap product-grid"><article class="prose">
  <h2>What we do</h2>${ul(s.does)}
  <h2>How it works</h2><ol class="steps steps-col">${s.steps.map(([h, t]) => `<li><h3>${esc(h)}</h3><p>${esc(t)}</p></li>`).join('')}</ol>
  <h2>What to have ready</h2>${ul(s.need)}
  <h2>Good to know</h2>${ul(s.limits)}
  <h2>Questions</h2>${faqHtml(s.faqs)}
</article><aside class="aside"><div class="aside-box" id="request"><h2>Make a request</h2><p>Tell us a little and an adviser will respond.</p>${serviceForm(s)}</div>
<div class="aside-links"><h3>More advisory services</h3><ul>${services.filter((x) => x.path !== s.path).map((x) => `<li><a href="${x.path}">${esc(label(x.path))}</a></li>`).join('')}</ul></div></aside></div>${ctaBand()}`;
  emit(s.path, layout({ path: s.path, title: s.title, desc: s.desc, body, schema: [schemaPage(s.path, s.title, s.desc), crumbsSchema(trail), faqSchema(s.faqs)] }));
}

// ------------------------------------------------------------------ quote page
{
  const G = { '/marine-insurance-kenya/digital-marine-certificate/': 'dmc', '/marine-insurance-kenya/open-cover/': 'cargo', '/goods-in-transit-insurance-kenya/': 'cargo', '/wiba-insurance-kenya/': 'wiba', '/professional-indemnity-insurance-kenya/': 'pi' };
  const groupOf = (p) => G[p] || (p.startsWith('/motor') ? 'motor' : p.startsWith('/medical') ? 'medical' : p.startsWith('/life-insurance') ? 'life' : p.startsWith('/travel') ? 'travel' : ['/money-market-funds-kenya/', '/savings-and-education-plans-kenya/', '/pension-and-retirement-planning-kenya/', '/annuities-kenya/', '/financial-products/'].includes(p) ? 'wealth' : ['/home-insurance-kenya/', '/personal-accident-insurance-kenya/'].includes(p) ? 'personal' : 'business');
  const opt = (p) => `<option value="${p}" data-group="${groupOf(p)}">${esc(label(p))}</option>`;
  const og = (name, list) => `<optgroup label="${name}">${list.filter(exists).map(opt).join('')}</optgroup>`;
  const bands = (arr) => `<option value="">Select</option>${arr.map((a) => `<option>${a}</option>`).join('')}`;
  const kes = ['Under KES 5 million', 'KES 5 to 20 million', 'KES 20 to 100 million', 'Over KES 100 million', 'Prefer to discuss'];
  const cond = (g, inner) => `<div class="conditional" data-for="${g}" hidden>${inner}</div>`;
  const coverSelect = `<option value="" data-group="">Select a cover</option>
    ${og('Motor', ['/motor-insurance-kenya/private-car/', '/motor-insurance-kenya/motorcycle/', '/motor-insurance-kenya/psv/', '/motor-insurance-kenya/commercial-fleet/'])}
    ${og('Medical', ['/medical-insurance-kenya/individual-family/', '/medical-insurance-kenya/group/'])}
    ${og('Life', ['/life-insurance-kenya/term-life/', '/life-insurance-kenya/whole-life-and-endowment/', '/life-insurance-kenya/last-expense/', '/life-insurance-kenya/credit-life/', '/group-life-insurance-kenya/'])}
    ${og('Marine and cargo', ['/marine-insurance-kenya/digital-marine-certificate/', '/marine-insurance-kenya/open-cover/', '/goods-in-transit-insurance-kenya/'])}
    ${og('Travel, home and accident', ['/travel-insurance-kenya/', '/travel-insurance-kenya/schengen/', '/travel-insurance-kenya/student/', '/home-insurance-kenya/', '/personal-accident-insurance-kenya/'])}
    ${og('Business', ['/sme-insurance-kenya/package/', '/business-property-insurance/fire/', '/business-property-insurance/business-interruption/', '/wiba-insurance-kenya/', '/public-liability-insurance-kenya/', '/professional-indemnity-insurance-kenya/', '/directors-officers-insurance-kenya/', '/cyber-insurance-kenya/', '/contractors-all-risks-insurance-kenya/', '/key-person-insurance-kenya/', '/travel-insurance-kenya/corporate/'])}
    ${og('Wealth management', ['/money-market-funds-kenya/', '/savings-and-education-plans-kenya/', '/pension-and-retirement-planning-kenya/', '/annuities-kenya/'])}
    <optgroup label="Not sure"><option value="/insurance-portfolio-review/" data-group="business">I am not sure, please advise me</option></optgroup>`;
  const inner =
    `<div class="row">${field({ id: 'name', label: 'Your name', required: true, autocomplete: 'name' })}${phoneField()}</div>` +
    `<div class="row">${field({ id: 'email', label: 'Email', type: 'email', required: true, autocomplete: 'email' })}${field({ id: 'town', label: 'Town or county', placeholder: 'e.g. Nairobi, Mombasa, Nakuru' })}</div>` +
    field({ id: 'cover', label: 'What would you like to be quoted for?', required: true, options: coverSelect }) +
    cond('business wiba pi', `<div class="row">${field({ id: 'company', label: 'Business or firm name' })}${field({ id: 'industry', label: 'Industry or profession' })}</div>`) +
    cond('business wiba pi', `<div class="row">${field({ id: 'employees', label: 'Number of employees', options: bands(['1 to 5', '6 to 20', '21 to 50', '51 to 200', 'More than 200']) })}${field({ id: 'turnover', label: 'Approximate annual turnover or fees', options: bands(kes) })}</div>`) +
    cond('wiba', field({ id: 'payroll', label: 'Approximate annual payroll', options: bands(kes) })) +
    cond('motor', `<div class="row">${field({ id: 'vehicle_reg', label: 'Registration number', placeholder: 'e.g. KDA 123A' })}${field({ id: 'vehicle', label: 'Make, model and year' })}</div><div class="row">${field({ id: 'vehicle_value', label: 'Approximate value (KES)', inputmode: 'numeric' })}${field({ id: 'vehicle_use', label: 'Use', options: bands(['Private', 'Commercial', 'Hire or taxi (PSV)', 'Boda boda', 'Fleet']) })}</div>`) +
    cond('medical', `<div class="row">${field({ id: 'members', label: 'Who needs cover?', hint: 'Number of people and ages' })}${field({ id: 'hospitals', label: 'Preferred hospitals', placeholder: 'e.g. Aga Khan, Nairobi Hospital' })}</div>`) +
    cond('life', `<div class="row">${field({ id: 'age', label: 'Your age' , inputmode: 'numeric' })}${field({ id: 'life_goal', label: 'Main purpose', options: bands(['Protect my family', 'Cover a loan or mortgage', 'Funeral expenses', 'Save for a goal', 'Not sure']) })}</div>${field({ id: 'life_amount', label: 'Cover amount you have in mind (KES)', inputmode: 'numeric' })}`) +
    cond('travel', `<div class="row">${field({ id: 'destination', label: 'Destination' })}${field({ id: 'travel_dates', label: 'Travel dates' })}</div>`) +
    cond('cargo', `<div class="row">${field({ id: 'goods', label: 'Goods being moved' })}${field({ id: 'route', label: 'Route', hint: 'From and to' })}</div>`) +
    cond('dmc', `<div class="row">${field({ id: 'who', label: 'You are', options: bands(['The importer', 'A clearing agent for an importer']) })}${field({ id: 'idf', label: 'IDF number', hint: 'if you have it' })}</div><div class="row">${field({ id: 'dmc_goods', label: 'Description of goods' })}${field({ id: 'goods_value', label: 'Invoice value', placeholder: 'e.g. USD 25,000 or KES 3,000,000' })}</div><div class="row">${field({ id: 'port', label: 'Port of entry', options: bands(['Mombasa', 'JKIA Nairobi', 'Nairobi ICD', 'Malaba', 'Busia', 'Other']) })}${field({ id: 'mode', label: 'Mode of transport', options: bands(['Sea', 'Air', 'Road']) })}</div>`) +
    cond('wealth', `<div class="row">${field({ id: 'wealth_goal', label: 'Your goal', options: bands(['Emergency or flexible savings', 'School fees', 'Retirement', 'Grow savings', 'Business or group funds', 'Not sure']) })}${field({ id: 'wealth_amount', label: 'Amount you can invest or save (KES)', inputmode: 'numeric' })}</div>`) +
    field({ id: 'message', label: 'Anything else we should know', type: 'textarea' }) +
    field({ id: 'contact_pref', label: 'Best way to reach you', options: bands(['WhatsApp', 'Phone call', 'Email']) });
  const trail = trailFor('/get-a-quote/');
  const body = `<section class="page-hero"><div class="wrap">${crumbsHtml(trail)}<h1 class="mt">Get a quote</h1><p class="lead">Tell us what you need. An adviser at ${FULL} will respond with options. We ask only what we need to start and follow up for the rest.</p></div></section>
<div class="wrap product-grid"><div class="panel">${formShell('quote', 'Quote request from website', inner, 'Prepare my quote request')}</div>
<aside class="aside"><div class="aside-box"><h2>What happens next</h2><ol class="steps steps-col"><li><h3>You send the details</h3><p>After you submit, choose to send by WhatsApp or email. Your request goes straight to our team.</p></li><li><h3>We review and follow up</h3><p>We confirm what insurers need and ask for anything missing.</p></li><li><h3>You get clear options</h3><p>Cover, limits, exclusions and premiums explained in plain language.</p></li></ol>
<a class="btn btn-ghost" href="${esc(waLink())}" rel="noopener">Prefer to chat? WhatsApp us</a></div></aside></div>`;
  emit('/get-a-quote/', layout({ path: '/get-a-quote/', title: `Get an Insurance Quote in Kenya | Motor, Medical, Life, Business | ${FULL}`, desc: `Request an insurance or wealth solutions quote in Kenya: motor, medical, life, marine, business and more. Tell us what you need and an adviser responds.`, body, schema: [schemaPage('/get-a-quote/', 'Get a quote', 'Request a quote'), crumbsSchema(trail)] }));
}

// ------------------------------------------------------------------ contact us
{
  const trail = trailFor('/contact-us/');
  const body = `<section class="page-hero"><div class="wrap hero-split"><div class="hero-copy">${crumbsHtml(trail)}<h1 class="mt">Contact ${FULL}</h1><p class="lead">Speak to an adviser about motor, medical, life, business or wealth solutions, a renewal, or a claim. We are available around the clock through our online channels.</p>
  <div class="btn-row"><a class="btn btn-primary" href="${esc(waLink())}" rel="noopener">WhatsApp ${esc(site.phoneDisplay)}</a><a class="btn btn-ghost" href="${esc(telLink())}">Call ${esc(site.phoneDisplay)}</a></div></div>
  <div class="hero-img">${picture('contact-office', 'Friendly customer service adviser wearing a headset at her desk', { eager: true, sizes: '(min-width: 980px) 520px, 100vw' })}</div></div></section>
<div class="wrap section"><div class="split split-even">
  <div><h2>Reach us</h2><ul class="contact-list">
    <li><strong>WhatsApp</strong><a href="${esc(waLink())}" rel="noopener">${esc(site.phoneDisplay)}</a></li>
    <li><strong>Phone</strong><a href="${esc(telLink())}">${esc(site.phoneDisplay)}</a></li>
    <li><strong>Email</strong><a href="${esc(mailLink())}">${esc(site.email)}</a></li>
    <li><strong>Office</strong>${esc(site.addressLine)}</li>
    <li><strong>Hours</strong>${esc(site.officeHours)}</li>
    <li><strong>Licence</strong>Licensed by the Insurance Regulatory Authority (IRA), licence no. ${esc(site.iraLicenceNumber)}</li></ul>
    <p class="form-note">Prefer to start with details? <a href="/get-a-quote/">Request a quote</a>, <a href="/insurance-portfolio-review/">ask for a review</a> or <a href="/claims-assistance/">get claims help</a>.</p></div>
  <div class="panel"><h2>Send us a message</h2>${formShell('contact', 'Website enquiry', field({ id: 'name', label: 'Your name', required: true, autocomplete: 'name' }) + `<div class="row">${phoneField(false)}${field({ id: 'email', label: 'Email', type: 'email', required: true, autocomplete: 'email' })}</div>` + field({ id: 'topic', label: 'What is this about?', options: '<option value="">Select</option><option>Motor insurance</option><option>Medical insurance</option><option>Life insurance</option><option>Business insurance</option><option>Marine cargo or Digital Marine Certificate</option><option>Wealth management</option><option>Advisory services</option><option>A claim</option><option>Something else</option>' }) + field({ id: 'message', label: 'Message', type: 'textarea', required: true }))}</div>
</div></div>
<section class="section section-warm"><div class="wrap"><h2>Find us</h2><p class="muted">${esc(site.addressLine)}</p>
<div class="map"><iframe src="${mapEmbed}" title="Map showing ${FULL} at Lavington Mall, James Gichuru Road, Nairobi" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe></div></div></section>`;
  emit('/contact-us/', layout({ path: '/contact-us/', title: `Contact ${FULL} | Lavington Mall, Nairobi`, desc: `Contact ${FULL} at Lavington Mall, James Gichuru Road, Nairobi. Call or WhatsApp 0721 233 951 or email info@chestnut.co.ke. Available 24/7 online.`, body, schema: [{ '@type': 'ContactPage', url: abs('/contact-us/') }, crumbsSchema(trail)] }));
}

// ------------------------------------------------------------------ about
{
  const trail = trailFor('/about/');
  const body = `<section class="page-hero"><div class="wrap hero-split"><div class="hero-copy">${crumbsHtml(trail)}<p class="eyebrow mt">About ${FULL}</p><h1>A Kenyan insurance agency that protects what you have and helps you build what you want.</h1>
  <p class="lead">${FULL} is a licensed insurance agency based at Lavington Mall in Nairobi. We help individuals, families, businesses and organisations across Kenya understand, manage and protect their risks, and plan their financial future.</p></div>
  <div class="hero-img">${picture('about-team', 'Four Kenyan insurance advisers smiling together in a modern office', { eager: true, sizes: '(min-width: 980px) 520px, 100vw' })}</div></div></section>
<section class="section"><div class="wrap"><div class="split"><div><h2>What we do</h2></div><div class="prose">
  <p>Insurance and financial planning are two halves of the same job: protecting what you have and building what you want. ${FULL} brings them together under one roof, in plain language, with advisers you can reach any time through our online channels.</p>
  <div class="trio"><div><h3>Insurance</h3><p>Motor, medical, life, travel, home, business, liability, engineering and marine cover arranged with licensed Kenyan insurers.</p><a class="textlink" href="/insurance-solutions/">Explore insurance</a></div>
  <div><h3>Wealth solutions</h3><p>Money market funds, savings and education plans, pensions and annuities to help you save, invest and plan for retirement.</p><a class="textlink" href="/financial-products/">Explore wealth management</a></div>
  <div><h3>Advisory</h3><p>Reviews, renewals, claims, procurement and tender support for the HR, Procurement, Finance and Admin teams who run insurance programmes.</p><a class="textlink" href="/insurance-advisory-services/">Explore advisory</a></div></div></div></div></div></section>
<section class="section section-warm"><div class="wrap"><div class="split"><div><h2>Our approach to insurance</h2><p class="muted">Insurance is only worth what it pays when you need it.</p></div>
  <div class="principles principles-col"><div><h3>Explained plainly</h3><p>We tell you what is covered, what is not and what to check in the wording, whether it is a motor policy or a marine cargo certificate. If a clause matters, you hear about it before you pay.</p></div>
  <div><h3>Advice before price</h3><p>The cheapest premium can hide the narrowest cover. We compare limits, excesses, exclusions and insurer service alongside cost, and we recommend what fits your situation.</p></div>
  <div><h3>Built for Kenya</h3><p>We work with the realities of Kenyan life and business: Insurance Regulatory Authority rules, WIBA and DOSHS, KRA requirements for importers, SHA and NSSF alongside private cover, and the way families and SMEs actually manage risk.</p></div></div></div></div></section>
<section class="section"><div class="wrap"><div class="split split-even"><div class="prose"><h2>Our approach to client service</h2>
  <ul><li>Reach us by WhatsApp, phone or email. Our online channels are available 24/7.</li><li>Clear next steps after every conversation, so you always know what happens next.</li><li>Support after the sale: endorsements, renewals and claims, not only the first policy.</li><li>No jargon. If we use a technical term, we explain it.</li></ul>
  <h2>Who we help</h2><ul><li><strong>Individuals and families</strong> insuring cars, health, lives, homes and travel, and saving for school fees and retirement.</li><li><strong>Businesses and professionals</strong> from SMEs to corporates, including doctors, engineers, accountants and advocates.</li><li><strong>Organisations</strong> where HR, procurement, finance and admin teams manage employee benefits, renewals and claims.</li><li><strong>Importers and clearing agents</strong> arranging marine cargo cover and the Digital Marine Certificate.</li></ul></div>
  <div>${picture('about-office', 'Bright modern reception area with red seating and a view over Nairobi', { sizes: '(min-width: 980px) 520px, 100vw' })}<p class="callout">${FULL} is licensed by the Insurance Regulatory Authority (IRA), licence no. ${esc(site.iraLicenceNumber)}. Visit us at ${esc(site.addressLine)}.</p></div></div></div></section>
<section class="section section-warm"><div class="wrap"><div class="section-head"><h2>Our commitment</h2><p class="lead">To help every customer understand, manage and protect their risks, and to build a financial future they can rely on. We measure ourselves by how clearly we explain, how quickly we respond and how well we support you when it matters most.</p></div></div></section>
${ctaBand('Let us look at your insurance and your goals.', `Whether you are insuring a car, protecting a business or planning for retirement, start with a conversation with ${FULL}.`)}`;
  emit('/about/', layout({ path: '/about/', title: `About ${FULL} | Licensed Insurance Agency in Nairobi`, desc: `${FULL} is an IRA-licensed Kenyan agency at Lavington Mall, Nairobi, providing insurance, wealth solutions and advisory services for individuals and businesses.`, body, schema: [{ '@type': 'AboutPage', url: abs('/about/') }, crumbsSchema(trail)] }));
}

// ------------------------------------------------------------------ privacy, 404
{
  const trail = trailFor('/privacy/');
  const body = `<section class="page-hero"><div class="wrap">${crumbsHtml(trail)}<h1 class="mt">Privacy notice</h1></div></section><div class="wrap section"><div class="prose narrow">
<h2>What we collect</h2><p>When you complete a form on this website, we collect the details you enter, such as your name, phone number, email address and information about the cover or product you ask about.</p>
<h2>How we use it</h2><p>${FULL} uses your details to respond to your request, prepare quotations and provide advice. With your instruction, we share the information insurers and providers need to obtain terms for you.</p>
<h2>Your rights</h2><p>Under the Kenya Data Protection Act, 2019, you may ask what we hold about you and ask us to correct or delete it, subject to legal and regulatory requirements. Contact us on <a href="${esc(mailLink())}">${esc(site.email)}</a>.</p>
<h2>Cookies and analytics</h2><p>${site.ga4Id ? 'This website uses Google Analytics to understand how it is used.' : 'This website does not currently use analytics cookies.'}</p>
<p>${FULL}, ${esc(site.addressLine)}. Licensed by the Insurance Regulatory Authority, licence no. ${esc(site.iraLicenceNumber)}.</p></div></div>`;
  emit('/privacy/', layout({ path: '/privacy/', title: `Privacy Notice | ${FULL}`, desc: `How ${FULL} handles information you submit through this website.`, body, noindex: true, schema: [crumbsSchema(trail)] }), true);
}
emit('/404.html', layout({ path: '/404/', title: `Page not found | ${FULL}`, desc: 'The page you were looking for could not be found.', noindex: true, body: `<section class="notfound"><div class="wrap"><img class="nf-icon" src="/brand/icon-192.png" width="96" height="96" alt=""><p class="eyebrow">404</p><h1>We could not find that page.</h1><p class="lead">It may have moved. Try one of these, or contact us and tell us what you were looking for.</p>${indexList(['/motor-insurance-kenya/', '/medical-insurance-kenya/', '/business-insurance-kenya/', '/financial-products/', '/get-a-quote/', '/contact-us/'])}</div></section>` }), true);

// ------------------------------------------------------------------ HOME
{
  const hero = `<section class="hero-photo"><picture><source media="(max-width: 700px)" type="image/webp" srcset="/img/hero-m-480.webp 480w, /img/hero-m-800.webp 800w" sizes="100vw"><source type="image/webp" srcset="/img/hero-900.webp 900w, /img/hero-1600.webp 1600w, /img/hero-2560.webp 2560w" sizes="100vw"><img src="/img/hero-1600.jpg" width="1600" height="606" alt="Nairobi skyline with tall office towers at sunset" fetchpriority="high"></picture>
  <div class="hero-shade"></div>
  <div class="wrap hero-content"><p class="eyebrow">${FULL} &middot; Nairobi, Kenya</p>
  <h1>Insurance and wealth solutions for individuals, families and businesses in Kenya</h1>
  <p class="lead">${FULL} helps you understand your risks, choose the right cover, grow your savings and handle renewals and claims, with advisers available 24/7 through our online channels.</p>
  <div class="btn-row"><a class="btn btn-primary" href="/get-a-quote/">Get a quote</a><a class="btn btn-white" href="${esc(waLink())}" rel="noopener">WhatsApp us</a></div>
  <p class="hero-note">Licensed by the Insurance Regulatory Authority &middot; Licence No. ${esc(site.iraLicenceNumber)}</p></div></section>
<section class="paths-strip" aria-labelledby="paths-h"><div class="wrap"><h2 id="paths-h" class="paths-h">Where would you like to start?</h2><ul class="paths5">
  <li><a href="/business-insurance-kenya/"><span class="pn">01</span><span class="pname">Business</span><span class="pdesc">Property, people, liability and operations</span></a></li>
  <li><a href="/professional-indemnity-insurance-kenya/"><span class="pn">02</span><span class="pname">Profession</span><span class="pdesc">Professional indemnity, directors and cyber</span></a></li>
  <li><a href="/personal-insurance/"><span class="pn">03</span><span class="pname">Family</span><span class="pdesc">Motor, medical, life, travel and home</span></a></li>
  <li><a href="/engineering-insurance-kenya/"><span class="pn">04</span><span class="pname">Project</span><span class="pdesc">Construction, plant, machinery and bonds</span></a></li>
  <li><a href="/financial-products/"><span class="pn">05</span><span class="pname">Wealth Management</span><span class="pdesc">Money market funds, savings, pensions</span></a></li></ul></div></section>`;

  const tile = (href, slug, alt, title, text, badge) => `<a class="tile" href="${href}">${slug ? picture(slug, alt, { sizes: '(min-width: 980px) 380px, 100vw' }) : `<div class="tile-panel"><span>Money Market Funds</span></div>`}<div class="tile-body">${badge ? `<span class="badge">${badge}</span>` : ''}<h3>${title}</h3><p>${text}</p><span class="tile-go">Learn more &rarr;</span></div></a>`;
  const solutions = `<section class="section"><div class="wrap"><div class="section-head"><p class="eyebrow">Insurance and financial solutions</p><h2>Solutions for every need</h2><p class="lead">The covers and financial solutions Kenyans ask us about most, with straightforward explanations and quick quotations.</p></div>
  <div class="tiles tiles-2">${tile('/motor-insurance-kenya/', 'motor', 'Kenyan family with their car and a set of car keys', 'Motor Insurance', 'Comprehensive and third-party cover for private cars, motorcycles, PSVs and fleets.')}${tile('/medical-insurance-kenya/', 'medical', 'Doctor showing a tablet to a mother and her daughter in a hospital room', 'Medical Insurance', 'Individual, family and group health cover that works alongside SHA.')}</div>
  <div class="tiles tiles-3">${tile('/life-insurance-kenya/', 'home-family', 'Kenyan family laughing together in the garden of their home', 'Life Insurance', 'Term life, whole life, funeral and mortgage cover for your family\u2019s future.')}${tile('/money-market-funds-kenya/', null, '', 'Money Market Funds', 'Flexible savings with daily interest accrual and quick access to your money.')}${tile('/marine-insurance-kenya/digital-marine-certificate/', 'cargo', 'Container ship, cranes and lorry loading cargo at a port', 'Digital Marine Certificate', 'The marine cargo certificate KRA requires for imports into Kenya, handled quickly.', 'KRA requirement')}</div>
  <div class="more-solutions"><h3>More solutions</h3><ul class="chips">${['/business-insurance-kenya/', '/sme-insurance-kenya/', '/wiba-insurance-kenya/', '/liability-insurance-kenya/', '/business-property-insurance/', '/engineering-insurance-kenya/', '/travel-insurance-kenya/', '/home-insurance-kenya/', '/personal-accident-insurance-kenya/', '/employee-benefits-insurance/', '/savings-and-education-plans-kenya/', '/pension-and-retirement-planning-kenya/'].map((p) => `<li><a href="${p}">${esc(label(p))}</a></li>`).join('')}</ul></div></div></section>`;

  const approach = `<section class="section section-warm"><div class="wrap"><div class="split split-even"><div><p class="eyebrow">Our approach</p><h2>Advice you can understand, from a team you can reach</h2>
  <div class="principles principles-col"><div><h3>Explained plainly</h3><p>What is covered, what is not, and what to check in the wording. If a clause matters, we say so before you buy.</p></div><div><h3>Advice before price</h3><p>The cheapest premium is not always the cheapest outcome. We compare limits, excesses and conditions alongside cost.</p></div><div><h3>Support when it counts</h3><p>Renewals, changes and claims need attention too. We stay involved after the policy is issued.</p></div></div>
  <p><a class="textlink" href="/about/">About ${FULL}</a></p></div><div>${picture('home-business', 'Kenyan shopkeeper in an apron standing proudly at the entrance of her shop', { sizes: '(min-width: 980px) 520px, 100vw' })}</div></div></div></section>`;

  const advisory = `<section class="section section-dark"><div class="wrap"><div class="split"><div><p class="eyebrow">Advisory services</p><h2>Useful services for HR, Procurement, Finance and Admin teams</h2><p class="on-dark">Ways we help you get more from your Insurance Program.</p><p><a class="btn btn-outline-white" href="/insurance-advisory-services/">All advisory services</a></p></div>
  <ul class="adv">${services.map((s) => `<li><a href="${s.path}"><strong>${esc(label(s.path))}</strong><span>${esc(s.blurb)}</span><em>${esc(s.team)}</em></a></li>`).join('')}</ul></div></div></section>`;

  const how = `<section class="section"><div class="wrap"><div class="section-head"><p class="eyebrow">How it works</p><h2>From first question to cover in four steps</h2></div><ol class="steps"><li><h3>Tell us what you need</h3><p>Share your family, business or goals by form, WhatsApp or phone.</p></li><li><h3>We assess and compare</h3><p>We identify what matters and approach suitable licensed insurers and providers.</p></li><li><h3>You see clear options</h3><p>Cover, limits, exclusions, charges and premiums explained in plain language.</p></li><li><h3>You decide, we support</h3><p>You choose. We help with documents, renewals and claims.</p></li></ol></div></section>`;

  const gl = ['/blog/how-to-get-digital-marine-insurance-certificate-kenya/', '/blog/kra-marine-insurance-requirement-2026/', '/blog/how-to-choose-medical-insurance-kenya/', '/blog/wiba-insurance-kenya/'];
  const guidesSec = `<section class="section section-warm"><div class="wrap"><div class="split"><div><p class="eyebrow">Guides</p><h2>Practical reading for Kenyans</h2><p><a class="textlink" href="/blog/">All guides</a></p></div><div>${indexList(gl, (p) => guides.find((g) => g.path === p).desc)}</div></div></div></section>`;

  const faqs = [
    ['What does an insurance agency do?', `${FULL} advises you on the cover you need, collects the information insurers require, approaches suitable licensed insurers for terms and supports you with renewals and claims. The policy itself is issued by the insurer.`],
    ['Is marine cargo insurance with a digital certificate compulsory for imports into Kenya?', 'KRA and the Insurance Regulatory Authority require marine cargo insurance from a locally licensed insurer for imports, evidenced by a digital certificate, and enforcement began on 1 November 2026. See our Digital Marine Certificate page for how we help.'],
    ['Is motor insurance compulsory in Kenya?', 'Third-party cover is required by law for vehicles on Kenyan roads. Comprehensive cover is optional but protects your own vehicle. We compare options from licensed insurers.'],
    ['Can you help with savings and retirement, not only insurance?', `Yes. ${FULL} helps individuals and employers explore money market funds, savings and education plans, pensions and annuities, alongside life and medical cover.`],
    ['What insurance does my business in Kenya need?', 'It depends on what you own, who you employ and what you do. Most employers need WIBA, most businesses with premises need property cover and many need liability cover. A short review gives you a clear list.'],
    ['Can you help with a claim?', `Yes. We help you understand your policy, prepare documents and follow up with the insurer. We cannot promise a settlement, since that depends on the policy and the facts of the loss.`]
  ];
  const body = `${hero}${solutions}${approach}${advisory}${how}${partnersCarousel(['britam', 'icea-lion', 'old-mutual', 'jubilee', 'cic', 'apa', 'first-assurance', 'sanlam-allianz', 'ga', 'aar', 'fidelity'])}${guidesSec}<section class="section"><div class="wrap"><div class="split"><div><p class="eyebrow">Questions</p><h2>Common questions</h2></div><div>${faqHtml(faqs)}</div></div></div></section>${ctaBand()}`;
  emit('/', layout({ path: '/', title: `${FULL} Kenya | Insurance and Wealth Solutions in Nairobi`, desc: `${FULL} offers motor, medical, life, business and marine cargo insurance plus money market funds, pensions and savings plans in Kenya. Get a quote today.`, body, preload: '<link rel="preload" as="image" href="/img/hero-1600.webp" imagesrcset="/img/hero-m-480.webp 480w, /img/hero-m-800.webp 800w" imagesizes="100vw" media="(max-width: 700px)"><link rel="preload" as="image" href="/img/hero-1600.webp" media="(min-width: 701px)">', schema: [schemaPage('/', `${FULL} Kenya`, 'Insurance and wealth solutions in Kenya', { about: { '@id': abs('/#org') } }), faqSchema(faqs)] }));
}

// ------------------------------------------------------------------ redirects, sitemap, migration doc
const redirectLines = [], rows = [];
for (const [old, dest, note] of [...legacy, ...renamed]) {
  const retained = dest === old + '/' || dest === old;
  if (!exists(dest) && !pages.some((p) => p.path === dest)) warnings.push(`redirect destination missing: ${old} -> ${dest}`);
  if (!retained) redirectLines.push(`${old} ${dest} 301`, `${old}/ ${dest} 301`);
  rows.push([old, dest, retained ? 'RETAINED' : /^INTERIM/.test(note) ? 'INTERIM 301' : '301', note.replace(/^INTERIM: /, '')]);
}

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });
const copyDir = (from, to) => { fs.mkdirSync(to, { recursive: true }); for (const f of fs.readdirSync(from, { withFileTypes: true })) { const a = path.join(from, f.name), b = path.join(to, f.name); f.isDirectory() ? copyDir(a, b) : fs.copyFileSync(a, b); } };
copyDir('public', DIST);
for (const pg of pages) {
  const file = pg.path.endsWith('.html') ? path.join(DIST, pg.path) : path.join(DIST, pg.path, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, pg.html);
}
const today = new Date().toISOString().slice(0, 10);
const indexable = pages.filter((p) => !p.noindex).map((p) => p.path).sort();
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexable.map((p) => `  <url><loc>${abs(p)}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n`);
fs.writeFileSync(path.join(DIST, '_redirects'), redirectLines.join('\n') + '\n');
fs.writeFileSync(path.join(DIST, '_headers'), `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: SAMEORIGIN\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n\n/fonts/*\n  Cache-Control: public, max-age=31536000, immutable\n/img/*\n  Cache-Control: public, max-age=31536000, immutable\n/partners/*\n  Cache-Control: public, max-age=31536000, immutable\n/brand/*\n  Cache-Control: public, max-age=31536000, immutable\n/styles.css\n  Cache-Control: public, max-age=3600\n/app.js\n  Cache-Control: public, max-age=3600\n`);
fs.writeFileSync('MIGRATION.md', `# URL migration plan\n\nGenerated by \`node build.mjs\`. **Provisional.** Verify each row against Google Search Console, Analytics and backlink data before launch.\nEvery redirect is a single hop to a page that exists. Nothing redirects to the homepage.\n\n| Old path | Destination | Status | Note |\n| --- | --- | --- | --- |\n${rows.map((r) => `| ${r.join(' | ')} |`).join('\n')}\n`);

console.log(`Built ${pages.length} pages (${indexable.length} in sitemap), ${redirectLines.length / 2} redirects.`);
warnings.forEach((w) => console.log('WARN:', w));
