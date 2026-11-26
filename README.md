# Chestnut Insurance Agency website

Static site, zero dependencies, built for Cloudflare Pages.

```
node build.mjs   # builds ./dist and MIGRATION.md
node check.mjs   # QA: links, assets, titles, descriptions, canonicals, schema, contact details, redirects
```

Cloudflare Pages: **Build command** `node build.mjs`, **Output directory** `dist`, Node 18+.

## Where things live
- `src/tree.mjs`: the product hierarchy. Navigation, breadcrumbs, hub pages and sibling links are all generated from it.
- `src/products-*.mjs`, `src/localise.mjs`, `src/services.mjs`, `src/guides.mjs`: page content (Kenyan context included)
- `src/config.mjs`: contact details, IRA licence, map embed, form endpoint, analytics
- `src/redirects.mjs`: legacy URL map. `MIGRATION.md` is generated
- `public/`: Montserrat (self-hosted), logos, icon, photos (webp plus jpg), partner logos, CSS and JS
- `OUTSTANDING.md`: items that need your input
