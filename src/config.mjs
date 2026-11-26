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
  phone: '+254721233951',
  phoneDisplay: '0721 233 951',
  whatsapp: '254721233951',
  email: 'info@chestnut.co.ke',
  officeHours: 'Available 24/7 through online channels',

  // ---- ADDRESS ----
  addressLine: 'Lavington Mall, James Gichuru Road, Nairobi',
  locality: 'Nairobi',
  country: 'KE',

  // ---- REGULATORY ----
  iraLicenceNote: 'Chestnut Insurance Agency is licensed by the Insurance Regulatory Authority (IRA).',
  iraLicenceNumber: 'IRA/05/44335/2026',

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

export const mapEmbed = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1159.5422551072993!2d36.769918774277826!3d-1.2802185254495473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1bf71d294991%3A0x81a7bd7323b959ba!2sChestnut%20Insurance%20Agency!5e0!3m2!1sen!2ske!4v1795418632252!5m2!1sen!2ske';
export const hasContact = () => Boolean(site.phone || site.whatsapp || site.email);
