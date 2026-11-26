// SINGLE SOURCE OF TRUTH FOR SITE HIERARCHY.
// Navigation, breadcrumbs, hub pages, sibling links and the sitemap structure are all derived from this tree.
// `also` lists secondary placements: shown on a hub as a related solution, never used for breadcrumbs.
// Every product page must exist in exactly one primary position.

const n = (path, label, children = [], extra = {}) => ({ path, label, children, ...extra });

export const tree = n('/', 'Home', [
  n('/insurance-solutions/', 'Insurance Solutions', [
    n('/personal-insurance/', 'Personal Insurance', [
      n('/motor-insurance-kenya/', 'Motor Insurance', [
        n('/motor-insurance-kenya/private-car/', 'Private Car'),
        n('/motor-insurance-kenya/motorcycle/', 'Motorcycle and Boda Boda'),
        n('/motor-insurance-kenya/psv/', 'PSV and Taxi'),
        n('/motor-insurance-kenya/commercial-fleet/', 'Commercial and Fleet')
      ]),
      n('/medical-insurance-kenya/', 'Medical Insurance', [
        n('/medical-insurance-kenya/individual-family/', 'Individual and Family'),
        n('/medical-insurance-kenya/group/', 'Group Medical for Employers')
      ]),
      n('/life-insurance-kenya/', 'Life Insurance', [
        n('/life-insurance-kenya/term-life/', 'Term Life'),
        n('/life-insurance-kenya/whole-life-and-endowment/', 'Whole Life and Endowment'),
        n('/life-insurance-kenya/last-expense/', 'Funeral and Last Expense'),
        n('/life-insurance-kenya/credit-life/', 'Mortgage and Credit Life')
      ], { also: ['/group-life-insurance-kenya/', '/savings-and-education-plans-kenya/'] }),
      n('/travel-insurance-kenya/', 'Travel Insurance', [
        n('/travel-insurance-kenya/schengen/', 'Schengen Visa'),
        n('/travel-insurance-kenya/student/', 'Student Travel'),
        n('/travel-insurance-kenya/corporate/', 'Corporate Travel')
      ]),
      n('/home-insurance-kenya/', 'Home Insurance'),
      n('/personal-accident-insurance-kenya/', 'Personal Accident')
    ]),
    n('/business-insurance-kenya/', 'Business Insurance', [
      n('/sme-insurance-kenya/', 'SME Insurance', [
        n('/sme-insurance-kenya/package/', 'SME Package')
      ]),
      n('/business-property-insurance/', 'Property Insurance', [
        n('/business-property-insurance/fire/', 'Fire and Allied Perils'),
        n('/business-property-insurance/burglary/', 'Burglary'),
        n('/business-property-insurance/business-interruption/', 'Business Interruption'),
        n('/political-violence-terrorism-insurance-kenya/', 'Political Violence and Terrorism')
      ]),
      n('/liability-insurance-kenya/', 'Liability Insurance', [
        n('/public-liability-insurance-kenya/', 'Public Liability'),
        n('/employers-liability-insurance-kenya/', 'Employer\u2019s Liability'),
        n('/professional-indemnity-insurance-kenya/', 'Professional Indemnity'),
        n('/directors-officers-insurance-kenya/', 'Directors and Officers'),
        n('/cyber-insurance-kenya/', 'Cyber Liability'),
        n('/employment-practices-liability-insurance-kenya/', 'Employment Practices'),
        n('/event-liability-insurance-kenya/', 'Event Liability')
      ]),
      n('/engineering-insurance-kenya/', 'Engineering Insurance', [
        n('/contractors-all-risks-insurance-kenya/', 'Contractors All Risks'),
        n('/contractors-plant-machinery-insurance-kenya/', 'Plant and Machinery'),
        n('/machinery-breakdown-insurance-kenya/', 'Machinery Breakdown'),
        n('/project-bonds-insurance-kenya/', 'Bonds and Guarantees')
      ]),
      n('/marine-insurance-kenya/', 'Marine and Cargo', [
        n('/marine-insurance-kenya/digital-marine-certificate/', 'Digital Marine Certificate'),
        n('/marine-insurance-kenya/open-cover/', 'Marine Open Cover'),
        n('/goods-in-transit-insurance-kenya/', 'Goods in Transit')
      ]),
      n('/employee-benefits-insurance/', 'Employee Benefits', [
        n('/wiba-insurance-kenya/', 'WIBA Work Injury Cover'),
        n('/group-life-insurance-kenya/', 'Group Life')
      ], { also: ['/medical-insurance-kenya/group/', '/travel-insurance-kenya/corporate/', '/pension-and-retirement-planning-kenya/', '/motor-insurance-kenya/commercial-fleet/'] }),
      n('/key-person-insurance-kenya/', 'Key Person'),
      n('/insurance-for-hotels-kenya/', 'Hotels and Hospitality', [], { group: 'industry' }),
      n('/insurance-for-airbnb-kenya/', 'Airbnb and Short-Stay Hosts', [], { group: 'industry' }),
      n('/insurance-for-contractors-kenya/', 'Contractors and Builders', [], { group: 'industry' }),
      n('/insurance-for-schools-kenya/', 'Schools and Colleges', [], { group: 'industry' })
    ])
  ]),
  n('/financial-products/', 'Wealth Management', [
    n('/money-market-funds-kenya/', 'Money Market Funds'),
    n('/savings-and-education-plans-kenya/', 'Savings and Education Plans'),
    n('/pension-and-retirement-planning-kenya/', 'Pensions'),
    n('/annuities-kenya/', 'Annuities')
  ]),
  n('/insurance-advisory-services/', 'Advisory Services', [
    n('/insurance-portfolio-review/', 'Portfolio Review and Gap Analysis'),
    n('/business-risk-assessment/', 'Business Risk Assessment'),
    n('/insurance-policy-review/', 'Policy and Contract Review'),
    n('/insurance-renewal-management/', 'Renewal Management'),
    n('/insurance-procurement-support/', 'Insurance Procurement Support'),
    n('/insurance-tender-support/', 'Tender and RFQ Support'),
    n('/claims-assistance/', 'Claims Assistance'),
    n('/insurance-programme-management/', 'Insurance Programme Management'),
    n('/employee-insurance-education/', 'Employee Insurance Education')
  ]),
  n('/blog/', 'Guides', []),
  n('/about/', 'About Us'),
  n('/contact-us/', 'Contact Us'),
  n('/get-a-quote/', 'Get a Quote'),
  n('/privacy/', 'Privacy Notice')
]);

// ---- derived helpers ----
export const nodes = new Map(); // path -> node with parent path
(function index(node, parent) {
  node.parent = parent;
  nodes.set(node.path, node);
  node.children.forEach((c) => index(c, node.path));
})(tree, null);

export const childrenOf = (p) => (nodes.get(p) ? nodes.get(p).children : []);
export const parentOf = (p) => (nodes.get(p) ? nodes.get(p).parent : null);
export const hasChildren = (p) => childrenOf(p).length > 0;
export const siblingsOf = (p) => { const par = parentOf(p); return par ? childrenOf(par).filter((c) => c.path !== p) : []; };
export const alsoOf = (p) => (nodes.get(p) && nodes.get(p).also) || [];
