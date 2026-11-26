# Items that need your input before launch

1. **Form delivery.** Forms currently hand the completed request to WhatsApp (0721 233 951) or email in one tap. To deliver enquiries straight to an inbox, set `formEndpoint` in `src/config.mjs` (Formspree, Web3Forms or a Cloudflare Worker).
2. **Wealth Management wording and authority.** Pages describe helping customers explore and access products from licensed providers, with a discreet "Important information" block on each page. Please confirm: which products Chestnut Insurance Agency can distribute, through which providers, and that "Wealth Management" is an acceptable description alongside your IRA licence (MMFs are CMA-regulated, pensions RBA-regulated). Adjust copy if needed.
3. **Product availability.** Pages exist for: motorcycle/boda boda, last expense, credit life, political violence and terrorism, employment practices, event liability, key person, bonds and guarantees, marine open cover, machinery breakdown, student travel. Remove any your insurers do not support (delete the entry in `src/tree.mjs` and its content file).
4. **Digital Marine Certificate.** Content reflects KRA/IRA enforcement from 1 November 2026 and describes the process in general terms. Please check the steps against how you actually issue certificates, and tell us your turnaround time if you want to state one.
5. **Payments.** No payment methods (for example M-Pesa) are mentioned because none were confirmed.
6. **Legacy product-review posts.** Britam Milele, Old Mutual AfyaImara, APA Jamii Plus and "best motor insurance" posts redirect to the closest page (INTERIM). Provide the old content or confirm products if you want them rebuilt.
7. **Photos.** The Life tile reuses `home-family.jpg` (planned for the homepage family section, now removed). Money Market Funds has no photo, so it uses a brand panel. More photos can be added if you want one there.
8. **Privacy notice.** Reasonable draft based on the Kenya Data Protection Act, 2019. Have it reviewed legally before launch.
9. **Domain and analytics.** Confirm `www.chestnut.co.ke` as the canonical host and add a GA4 id in `src/config.mjs` if wanted.
10. **Redirects** are provisional until checked against Search Console and backlink data (see `MIGRATION.md`).
