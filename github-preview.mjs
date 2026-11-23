// Preview-only post-build adjustment for GitHub Pages project sites.
// Does not alter source files or production Cloudflare output.
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve('dist');
const base = '/chestnut-website';
function walk(dir) {
  for (const entry of fs.readdirSync(dir, {withFileTypes:true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) {
      let html = fs.readFileSync(full, 'utf8');
      // Prefix local root-relative href/src/action attributes for the GitHub project path.
      html = html.replace(/(href|src|action)="\/(?!\/|#)([^" ]*)"/g, (m, attr, target) => `${attr}="${base}/${target}"`);
      html = html.replace(/(href|src|action)="\/"/g, `$1="${base}/"`);
      // Explicitly keep the temporary preview out of search indexes.
      html = html.replace('</head>', '<meta name="robots" content="noindex,nofollow">\n</head>');
      fs.writeFileSync(full, html);
    }
  }
}
walk(root);
fs.writeFileSync(path.join(root, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
// The production sitemap/canonicals intentionally remain Chestnut-domain URLs;
// preview robots disallows crawling and HTML carries noindex.
console.log('GitHub Pages preview path adjustments complete.');
