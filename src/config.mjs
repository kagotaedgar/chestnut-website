// CENTRAL SITE CONFIGURATION
// Everything that needs confirming before launch lives here.
// Empty strings are treated as "not yet available": the site hides the
// matching button or link instead of inventing a value.

export const site = {
  name: 'Chestnut Insurance Agency',
  short: 'Chestnut',
  tagline: 'The Insurance Experts',
  url: 'https://www.chestnut.co.ke', // CONFIRM canonical host (www or non-www) before launch

  // ---- CONTACT DETAILS: REPLACE BEFORE LAUNCH ----
  phone: '', // digits with country code, e.g. '+254700000000'
  phoneDisplay: '', // e.g. '+254 700 000 000'
  whatsapp: '', // digits, no plus sign, e.g. '254700000000'
  email: '', // e.g. 'hello@chestnut.co.ke'
  officeHours: '', // e.g. 'Monday to Friday, 8:00am to 5:00pm'

  // ---- ADDRESS ----
  addressLine: 'Lavington Mall, Nairobi', // CONFIRM floor, unit and street before launch
  locality: 'Nairobi',
  country: 'KE',

  // ---- REGULATORY ----
  iraLicenceNote: 'Chestnut Insurance Agency is an insurance agency licensed by the Insurance Regulatory Authority (IRA).',
  iraLicenceNumber: '', // ADD the licence number and confirm wording against the IRA register

  // ---- FORMS ----
  // formEndpoint: any HTTPS endpoint accepting a JSON POST (Formspree, Web3Forms, a Cloudflare Worker).
  // If empty, forms fall back to opening the visitor's email app (needs `email`).
  // If both are empty, forms validate, then tell the visitor plainly that the form is not connected yet.
  formEndpoint: '',

  // ---- ANALYTICS ----
  ga4Id: '', // e.g. 'G-XXXXXXXXXX'. Loaded only when set.

  // ---- SOCIAL (verified profiles only; used for schema sameAs) ----
  sameAs: [],

  published: '2026-11-21'
};

export const hasContact = () => Boolean(site.phone || site.whatsapp || site.email);
