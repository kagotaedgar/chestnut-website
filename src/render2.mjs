import fs from 'node:fs';
import { site, mapEmbed } from './config.mjs';
import { tree, nodes, childrenOf, parentOf, alsoOf } from './tree.mjs';

const FULL = 'Chestnut Insurance Agency';
// Brand consistency: any bare "Chestnut" in visible text becomes the full name.
export const brand = (s = '') => String(s).replace(/Chestnut(?! Insurance Agency| Red)/g, FULL);
export const esc = (s = '') => brand(String(s)).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const abs = (p) => site.url + p;
export const blurbs = new Map(); // path -> short description, filled by build

export const label = (p) => (nodes.get(p) ? nodes.get(p).label : p);
export const exists = (p) => nodes.has(p);

// ------------------------------------------------------------ contact helpers
export const waLink = (text = `Hello ${FULL}, I would like some insurance advice.`) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
export const telLink = () => `tel:${site.phone}`;
export const mailLink = (subject = '') => `mailto:${site.email}${subject ? '?subject=' + encodeURIComponent(subject) : ''}`;
export function contactButtons(light = false, waText) {
  const cls = light ? 'btn btn-light' : 'btn btn-ghost';
  return `<a class="${cls}" href="${esc(waLink(waText))}" rel="noopener">WhatsApp ${esc(site.phoneDisplay)}</a><a class="${cls}" href="${esc(telLink())}">Call ${esc(site.phoneDisplay)}</a>`;
}

// ------------------------------------------------------------ images
// slug -> available widths. Photos: 640/1024/1600 webp + 1024 jpg fallback. Hero has its own set.
export function picture(slug, alt, { sizes = '(min-width: 980px) 560px, 100vw', cls = '', eager = false, ratio = '16 / 9' } = {}) {
  const set = [640, 1024, 1600].map((w) => `/img/${slug}-${w}.webp ${w}w`).join(', ');
  return `<picture class="photo ${cls}" style="aspect-ratio:${ratio}"><source type="image/webp" srcset="${set}" sizes="${sizes}"><img src="/img/${slug}-1024.jpg" width="1600" height="900" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"'}></picture>`;
}

// ------------------------------------------------------------ breadcrumbs
export function trailFor(p, labelOverride) {
  const trail = [];
  let cur = parentOf(p);
  while (cur) { trail.unshift([label(cur), cur]); cur = parentOf(cur); }
  // tree root is Home
  trail.push([labelOverride || label(p), p]);
  return trail;
}
export const crumbsHtml = (trail) => `<nav class="crumbs" aria-label="Breadcrumb"><ol>${trail.map(([n, p], i) => (i === trail.length - 1 ? `<li><span aria-current="page">${esc(n)}</span></li>` : `<li><a href="${p}">${esc(n)}</a></li>`)).join('')}</ol></nav>`;
export const crumbsSchema = (trail) => ({ '@type': 'BreadcrumbList', itemListElement: trail.map(([n, p], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: abs(p) })) });

// ------------------------------------------------------------ components
export const faqHtml = (faqs) => (faqs && faqs.length ? `<div class="faq">${faqs.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>` : '');
export const faqSchema = (faqs) => (faqs && faqs.length ? { '@type': 'FAQPage', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: brand(q), acceptedAnswer: { '@type': 'Answer', text: brand(a) } })) } : null);
export const ul = (items) => `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;

export function indexList(paths, descOf) {
  return `<ul class="index">${paths.filter(exists).map((p) => `<li><a href="${p}"><span class="i-name">${esc(label(p))}</span><span class="i-desc">${esc(descOf ? descOf(p) : blurbs.get(p) || '')}</span><span class="i-go">View</span></a></li>`).join('')}</ul>`;
}

export function ctaBand(title = 'Not sure what you need? Start with a conversation.', text = `Tell us about your family, your business or your goals. An adviser at ${FULL} will respond with practical options in plain language, any time through our online channels.`) {
  return `<section class="cta-band"><div class="wrap"><div class="cta-grid"><div><h2>${esc(title)}</h2><p>${esc(text)}</p></div>
  <div class="btn-row"><a class="btn btn-white" href="/get-a-quote/">Get a quote</a><a class="btn btn-outline-white" href="${esc(waLink())}" rel="noopener">WhatsApp us</a><a class="btn btn-outline-white" href="/contact-us/">Contact us</a></div></div></div></section>`;
}

export function field({ id, label: lab, type = 'text', required = false, hint = '', options, autocomplete, rows, placeholder, inputmode }) {
  const req = required ? ' required' : '';
  const l = `<label for="${id}">${esc(lab)}${required ? '' : ' <span class="hint">(optional)</span>'}${hint ? ` <span class="hint">${esc(hint)}</span>` : ''}</label>`;
  let input;
  if (options) input = `<select id="${id}" name="${id}"${req}>${options}</select>`;
  else if (type === 'textarea') input = `<textarea id="${id}" name="${id}" rows="${rows || 4}"${req}></textarea>`;
  else input = `<input id="${id}" name="${id}" type="${type}"${req}${autocomplete ? ` autocomplete="${autocomplete}"` : ''}${placeholder ? ` placeholder="${esc(placeholder)}"` : ''}${inputmode ? ` inputmode="${inputmode}"` : ''}>`;
  return `<div class="field">${l}${input}<div class="err" aria-live="polite"></div></div>`;
}
export const phoneField = (required = true) => field({ id: 'phone', label: 'Phone or WhatsApp', type: 'tel', required, autocomplete: 'tel', placeholder: 'e.g. 0712 345 678', inputmode: 'tel' });

export function formShell(name, subject, inner, submitLabel = 'Send my request') {
  return `<form class="form" data-chestnut-form="${esc(name)}" data-subject="${esc(subject)}" data-endpoint="${esc(site.formEndpoint)}" data-email="${esc(site.email)}" data-wa="${esc(site.whatsapp)}" method="post" action="#">
    ${inner}
    <div class="hp" aria-hidden="true"><label>Leave this empty<input name="website" tabindex="-1" autocomplete="off"></label></div>
    <label class="check"><input type="checkbox" name="consent" required><span>I agree that ${FULL} may use these details to respond to my request. See the <a href="/privacy/">privacy notice</a>.</span></label>
    <div class="err" aria-live="polite"></div>
    <button class="btn btn-primary" type="submit">${esc(submitLabel)}</button>
    <div class="form-status" role="status" tabindex="-1"></div>
    <p class="form-note">Prefer to talk now? Call or WhatsApp <a href="${esc(telLink())}">${esc(site.phoneDisplay)}</a>.</p>
  </form>`;
}

// ------------------------------------------------------------ partners carousel
export function partnersCarousel(order) {
  const man = JSON.parse(fs.readFileSync(new URL('./partners.json', import.meta.url)));
  const items = order.map((slug) => { const m = man[slug]; return `<li class="partner"><img src="/partners/${slug}.webp" width="${m.w}" height="${m.h}" alt="${esc(m.label)} logo" loading="lazy" decoding="async"></li>`; }).join('');
  return `<section class="section partners" aria-labelledby="partners-h"><div class="wrap">
    <div class="partners-head"><h2 id="partners-h">Our Insurance Partners</h2>
      <div class="car-ctl"><button class="car-btn" data-dir="-1" aria-label="Previous partners">&larr;</button><button class="car-btn" data-dir="1" aria-label="Next partners">&rarr;</button></div></div>
    <div class="carousel" data-carousel tabindex="0" aria-label="Insurance partner logos, scrolls automatically"><ul class="car-track">${items}</ul></div>
  </div></section>`;
}

// ------------------------------------------------------------ navigation (generated from the tree)
const link = (p, txt, cls = '') => `<a href="${p}"${cls ? ` class="${cls}"` : ''}>${esc(txt || label(p))}</a>`;
const groupBlock = (hub) => `<div class="mega-col"><p class="mega-h">${link(hub)}</p><ul>${childrenOf(hub).filter((c) => c.group !== 'industry').map((c) => `<li>${link(c.path)}</li>`).join('')}</ul></div>`;
function megaPanel(id, hubPath) {
  const kids = childrenOf(hubPath);
  const cols = kids.filter((k) => k.group !== 'industry' && k.children.length).map((k) => groupBlock(k.path));
  const flat = kids.filter((k) => k.group !== 'industry' && !k.children.length);
  const ind = kids.filter((k) => k.group === 'industry');
  const extra = [];
  if (flat.length) extra.push(`<div class="mega-col"><p class="mega-h">More covers</p><ul>${flat.map((c) => `<li>${link(c.path)}</li>`).join('')}</ul></div>`);
  if (ind.length) extra.push(`<div class="mega-col"><p class="mega-h">By industry</p><ul>${ind.map((c) => `<li>${link(c.path)}</li>`).join('')}</ul></div>`);
  return `<div class="mega" id="${id}" hidden><div class="wrap mega-grid">${cols.join('')}${extra.join('')}</div><div class="wrap mega-foot">${link(hubPath, `All ${label(hubPath).toLowerCase()}`)}<a href="/get-a-quote/" class="textlink">Get a quote</a></div></div>`;
}
function navHtml(path) {
  const cur = (p) => (path === p || (p !== '/' && path.startsWith(p)) ? ' aria-current="page"' : '');
  const sec = (hub) => path === hub || nodeIsUnder(path, hub);
  const dd = (id, hub, txt) => `<li class="has-mega"><button class="mega-btn" aria-expanded="false" aria-controls="${id}"${sec(hub) ? ' data-active' : ''}>${txt}<span aria-hidden="true"> &#9662;</span></button></li>`;
  return `<ul class="nav-list"><li><a href="/"${path === '/' ? ' aria-current="page"' : ''}>Home</a></li>${dd('mega-personal', '/personal-insurance/', 'Personal')}${dd('mega-business', '/business-insurance-kenya/', 'Business')}<li><a href="/financial-products/"${sec('/financial-products/') ? ' aria-current="page"' : ''}>Wealth Management</a></li><li><a href="/insurance-advisory-services/"${sec('/insurance-advisory-services/') ? ' aria-current="page"' : ''}>Advisory</a></li><li><a href="/blog/"${sec('/blog/') ? ' aria-current="page"' : ''}>Guides</a></li><li><a href="/about/"${cur('/about/')}>About Us</a></li><li><a href="/contact-us/"${cur('/contact-us/')}>Contact Us</a></li></ul>`;
}
function nodeIsUnder(p, hub) { let c = parentOf(p); while (c) { if (c === hub) return true; c = parentOf(c); } return false; }
function mobileMenu() {
  const grp = (hub) => `<details><summary>${esc(label(hub))}</summary><div class="m-sub"><a href="${hub}" class="m-all">All ${esc(label(hub).toLowerCase())}</a>${childrenOf(hub).map((k) => `<a href="${k.path}">${esc(k.label)}</a>`).join('')}</div></details>`;
  const personal = `<details><summary>Personal</summary><div class="m-sub"><a href="/personal-insurance/" class="m-all">All personal insurance</a>${childrenOf('/personal-insurance/').map((k) => `<a href="${k.path}">${esc(k.label)}</a>`).join('')}</div></details>`;
  const business = `<details><summary>Business</summary><div class="m-sub"><a href="/business-insurance-kenya/" class="m-all">All business insurance</a>${childrenOf('/business-insurance-kenya/').map((k) => `<a href="${k.path}">${esc(k.label)}</a>`).join('')}</div></details>`;
  return `<div class="mobile-menu" id="mobile-menu"><div class="wrap"><a class="m-top" href="/">Home</a>${personal}${business}${grp('/financial-products/')}${grp('/insurance-advisory-services/')}<a class="m-top" href="/blog/">Guides</a><a class="m-top" href="/about/">About Us</a><a class="m-top" href="/contact-us/">Contact Us</a><div class="m-cta"><a class="btn btn-primary" href="/get-a-quote/">Get a quote</a><a class="btn btn-ghost" href="${esc(waLink())}" rel="noopener">WhatsApp</a></div></div></div>`;
}

// ------------------------------------------------------------ schema
export function orgSchema() {
  const org = {
    '@type': ['InsuranceAgency', 'Organization'], '@id': abs('/#org'), name: FULL, alternateName: 'Chestnut', slogan: site.tagline, url: abs('/'),
    logo: abs('/brand/logo.png'), image: abs('/img/hero-1600.jpg'),
    telephone: site.phone, email: site.email,
    address: { '@type': 'PostalAddress', streetAddress: site.addressLine, addressLocality: site.locality, addressCountry: site.country },
    geo: { '@type': 'GeoCoordinates', latitude: -1.2802185, longitude: 36.7699187 },
    areaServed: { '@type': 'Country', name: 'Kenya' },
    identifier: { '@type': 'PropertyValue', name: 'IRA licence number', value: site.iraLicenceNumber },
    contactPoint: [{ '@type': 'ContactPoint', contactType: 'customer service', telephone: site.phone, email: site.email, areaServed: 'KE', availableLanguage: ['English', 'Swahili'] }]
  };
  if (site.sameAs.length) org.sameAs = site.sameAs;
  return org;
}
export const websiteSchema = () => ({ '@type': 'WebSite', '@id': abs('/#website'), url: abs('/'), name: FULL, publisher: { '@id': abs('/#org') }, inLanguage: 'en-KE' });

// ------------------------------------------------------------ footer
function footer() {
  const col = (title, paths) => `<div><h2>${esc(title)}</h2><ul>${paths.filter(exists).map((p) => `<li><a href="${p}">${esc(label(p))}</a></li>`).join('')}</ul></div>`;
  return `<footer class="site-footer"><div class="wrap">
    <div class="foot-grid">
      <div class="foot-brand"><a href="/" aria-label="${FULL} home"><img class="foot-logo" src="/brand/logo-white.png" width="640" height="203" alt="${FULL}" loading="lazy"></a>
        <p>${esc(site.tagline)}. Insurance and wealth solutions for individuals, families, businesses and organisations across Kenya.</p>
        <ul class="foot-contact"><li>${esc(site.addressLine)}</li><li><a href="${esc(telLink())}">${esc(site.phoneDisplay)}</a> (call or WhatsApp)</li><li><a href="${esc(mailLink())}">${esc(site.email)}</a></li><li>${esc(site.officeHours)}</li></ul></div>
      ${col('Personal', ['/motor-insurance-kenya/', '/medical-insurance-kenya/', '/life-insurance-kenya/', '/travel-insurance-kenya/', '/home-insurance-kenya/', '/personal-accident-insurance-kenya/'])}
      ${col('Business', ['/business-insurance-kenya/', '/sme-insurance-kenya/', '/business-property-insurance/', '/liability-insurance-kenya/', '/engineering-insurance-kenya/', '/marine-insurance-kenya/', '/employee-benefits-insurance/'])}
      ${col('Wealth and Advisory', ['/financial-products/', '/money-market-funds-kenya/', '/pension-and-retirement-planning-kenya/', '/insurance-advisory-services/', '/claims-assistance/', '/insurance-portfolio-review/'])}
      ${col('Company', ['/about/', '/contact-us/', '/get-a-quote/', '/blog/', '/privacy/'])}
    </div>
    <div class="foot-legal"><span>${FULL} is licensed by the Insurance Regulatory Authority (IRA). Licence No. ${esc(site.iraLicenceNumber)}.</span><span>&copy; ${new Date().getFullYear()} ${FULL}. Nairobi, Kenya.</span></div>
  </div></footer>`;
}

// ------------------------------------------------------------ layout
export function layout(page) {
  const { path, title, desc, body, schema = [], noindex = false, ogType = 'website', preload = '' } = page;
  const canonical = abs(path);
  const seoTitle = title.length > 72 ? title.replace(/ \| Chestnut Insurance Agency$/, '') : title; // keep SERP titles short; keywords are front-loaded
  const ld = JSON.stringify({ '@context': 'https://schema.org', '@graph': [orgSchema(), websiteSchema(), ...schema.filter(Boolean)] });
  const ga = site.ga4Id ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${esc(site.ga4Id)}"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${esc(site.ga4Id)}');</script>` : '';
  const mobileBar = `<div class="mobile-bar"><a class="btn btn-primary" href="/get-a-quote/">Get a quote</a><a class="btn btn-white-teal" href="${esc(waLink())}" rel="noopener">WhatsApp</a><a class="btn btn-white-teal" href="${esc(telLink())}">Call</a></div>`;
  return `<!doctype html>
<html lang="en-KE">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(seoTitle)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}">
<meta name="theme-color" content="#006C67">
<meta property="og:site_name" content="${FULL}"><meta property="og:locale" content="en_KE"><meta property="og:type" content="${ogType}">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${canonical}">
<meta property="og:image" content="${abs('/og.jpg')}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${FULL}: insurance and wealth solutions in Kenya">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.ico" sizes="48x48"><link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32"><link rel="icon" href="/brand/icon-192.png" type="image/png" sizes="192x192"><link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preload" href="/fonts/montserrat-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
${preload}
<link rel="stylesheet" href="/styles.css">
<noscript><style>.conditional[hidden],.mega[hidden]{display:block}.mega{position:static}</style></noscript>
<script type="application/ld+json">${ld}</script>
${ga}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<div class="util-bar"><div class="wrap util-inner"><span>${esc(site.officeHours)}</span><span class="util-links"><a href="${esc(telLink())}">Call ${esc(site.phoneDisplay)}</a><a href="${esc(waLink())}" rel="noopener">WhatsApp</a><a href="${esc(mailLink())}">${esc(site.email)}</a></span></div></div>
<header class="site-header"><div class="wrap">
  <div class="nav-bar">
    <a class="brand" href="/" aria-label="${FULL} home"><img src="/brand/logo.png" width="640" height="203" alt="${FULL}"></a>
    <nav aria-label="Primary">${navHtml(path)}</nav>
    <a class="btn btn-primary nav-cta" href="/get-a-quote/">Get a quote</a>
    <button class="menu-btn" aria-expanded="false" aria-controls="mobile-menu">Menu</button>
  </div>
</div>
${megaPanel('mega-personal', '/personal-insurance/')}${megaPanel('mega-business', '/business-insurance-kenya/')}
${mobileMenu()}
</header>
<main id="main">
${body}
</main>
${footer()}
${mobileBar}
<script src="/app.js" defer></script>
</body>
</html>`;
}

export { mapEmbed, site, tree, nodes, childrenOf, parentOf, alsoOf };
