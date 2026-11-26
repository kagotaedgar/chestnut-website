// Overrides applied on top of the earlier product data: stronger Kenyan titles, descriptions, leads,
// local context and FAQs. Fields not listed here keep their original values.
// Facts used: Insurance Act (Cap 487), IRA, Motor Vehicles Third Party Risks Act (Cap 405), WIBA 2007 (Cap 236) and DOSHS,
// KRA/IRA Digital Marine Cargo Insurance enforcement from 1 Nov 2026, SHA/NSSF context.

const B = 'Chestnut Insurance Agency';

export const overrides = {
  '/business-insurance-kenya/': {
    title: `Business Insurance Kenya | SME and Corporate Cover | ${B}`,
    desc: `Business insurance in Kenya for SMEs, corporates and professionals: property, liability, WIBA, marine, engineering and staff benefits. Get a quote from ${B}.`,
    h1: 'Business Insurance in Kenya',
    blurb: 'Property, people, liability and operations covered with one adviser.',
    lead: `Running a business in Kenya means managing risks that other markets do not face in the same way: heavy seasonal rains, town-centre unrest, long supply chains through Mombasa, a largely casual workforce on many sites, and strict contract requirements from county governments, banks and large clients. ${B} helps Kenyan SMEs, corporates and professional firms put the right combination of covers in place and keep it current.`,
    local: ['Every employer in Kenya has obligations under the Work Injury Benefits Act. Most businesses with premises or stock also need property cover and many need liability cover.', 'Tenders, banks and landlords in Kenya routinely specify minimum insurance, so cover is often a condition of winning or keeping work.', 'Insurers in Kenya must be licensed by the Insurance Regulatory Authority under the Insurance Act. Check before you pay a premium.', 'Industrial Area, Westlands, Upper Hill, Mombasa Road and county towns each have different fire, theft and flood profiles that affect underwriting.'],
    faqs: [['What insurance does a business in Kenya need?', 'Most employers need WIBA work injury cover. Businesses with premises or stock need property cover, customer-facing businesses need public liability, and professional firms need professional indemnity. Importers now need marine cargo cover with a digital certificate. A short review gives you your list.'], ['How much does business insurance cost in Kenya?', 'It depends on your activity, sums insured, location, payroll and claims history, and insurers set the price. We collect your details and compare quotations so you see real figures rather than estimates.'], ['Can I buy all my business insurance from one agency?', 'Yes. We arrange covers across insurers and manage them together so renewals and claims have one point of contact.'], ['Is business insurance tax deductible in Kenya?', 'Premiums for business covers are generally deductible expenses, but tax treatment depends on your circumstances. Confirm with your tax adviser.']]
  },
  '/sme-insurance-kenya/': {
    title: `SME Insurance Kenya | Cover for Small Businesses | ${B}`,
    desc: `SME insurance in Kenya for shops, salons, restaurants, workshops and offices: fire, burglary, liability, money and staff cover. Request a quote from ${B}.`,
    h1: 'SME Insurance in Kenya',
    blurb: 'Fire, theft, liability and staff cover sized for small Kenyan businesses.',
    lead: `A fire in a Gikomba stall, a break-in at a Kilimani salon, an injured worker on a Ruiru workshop floor: for a small Kenyan business, one bad day can be the end of the business. ${B} arranges SME cover that fits how small businesses really trade, with plain explanations and sums insured that reflect what you would actually need to replace.`,
    who: ['Duka, supermarket, hardware and electronics shop owners', 'Restaurants, salons and barbershops', 'Pharmacies, small clinics and laboratories', 'Workshops, garages and light manufacturers', 'Offices, agencies and consultancies'],
    local: ['Many SMEs trade from rented premises, so the landlord insures the building and you insure your stock, fittings and liability.', 'Stock values often change by season, for example around school opening, festive periods and harvest. Tell your adviser about peaks.', 'If you employ anyone, including casual workers, WIBA is a legal requirement for employers in Kenya.', 'Security matters to underwriters. Shutters, guards, alarms and CCTV can influence terms.'],
    faqs: [['What insurance should a small business in Kenya get first?', 'Property cover for stock and equipment, public liability if customers visit, and WIBA if you have staff. Add money and goods in transit cover if you handle cash or deliver stock.'], ['Is there an SME insurance package in Kenya?', 'Yes. Many insurers offer SME packages bundling several covers. See our SME package page for what these usually include.'], ['Do I need insurance if I rent my shop?', 'Yes. The landlord normally insures the building, not your stock, fittings or your liability to customers.']]
  },
  '/wiba-insurance-kenya/': {
    title: `WIBA Insurance Kenya | Work Injury Benefits Act Cover | ${B}`,
    desc: `WIBA insurance in Kenya for employers: compliance with the Work Injury Benefits Act, payroll rating, claims and DOSHS reporting. Get a WIBA quote from ${B}.`,
    h1: 'WIBA Insurance in Kenya',
    blurb: 'Statutory work injury cover for every Kenyan employer.',
    lead: `The Work Injury Benefits Act, 2007 (Cap. 236) makes every employer in Kenya responsible for compensating employees injured at work or who contract an occupational disease. Section 7 requires employers to insure that liability with an insurer approved under the Act. ${B} arranges WIBA cover for employers from small shops to large sites, rated on your real payroll and risk.`,
    local: ['WIBA applies to employees under a contract of service, which can include casual and seasonal workers depending on the arrangement. Describe your real workforce when you insure.', 'Workplace accidents and diseases must be reported to the Directorate of Occupational Safety and Health Services (DOSHS) within the timelines the Act sets. Keep the DOSHS and insurer details where supervisors can find them.', 'Compensation is assessed under the Act, and the insurer pays within the policy and legal framework. Claims need accurate payroll and records.', 'WIBA is separate from NSSF, SHA and private medical cover. Employers need to manage each obligation separately.'],
    faqs: [['Is WIBA compulsory in Kenya?', 'Yes for employers. The Work Injury Benefits Act requires employers to insure their liability for work injury compensation with an approved insurer.'], ['How is WIBA premium calculated?', 'Insurers rate on annual payroll, job categories and risk level. Accurate payroll protects you at claim stage and at audit.'], ['What should I do after a workplace accident?', 'Give first aid and medical care, notify your insurer and report to DOSHS within the required timelines, and keep the incident records. Our claims team can guide you.'], ['Does WIBA cover casual workers?', 'Casual and seasonal workers can fall within the Act. Declare them accurately and ask us how to treat different arrangements on your payroll.'], ['What is the difference between WIBA and group personal accident?', 'WIBA follows the statutory compensation framework for work injury. Group personal accident is a contractual benefit that responds to accidents more broadly. Many employers have both.']]
  },
  '/public-liability-insurance-kenya/': {
    title: `Public Liability Insurance Kenya | Cover for Businesses | ${B}`,
    desc: `Public liability insurance in Kenya for shops, hotels, contractors and offices: cover for third-party injury and damage. Request a quotation from ${B}.`,
    h1: 'Public Liability Insurance in Kenya',
    lead: `A customer slips in your Westlands restaurant, a visitor is hurt in your Nakuru warehouse, a contractor\u2019s scaffolding damages a neighbour\u2019s wall in Kilimani. Public liability insurance covers your legal liability for injury and damage to third parties, plus legal costs, so one claim does not become a financial crisis. ${B} arranges cover and limits to match your activity and your contracts.`,
    local: ['Many Kenyan landlords, mall managers, county tenders and corporate clients require public liability certificates with a minimum limit.', 'High-footfall businesses such as malls, hotels, restaurants and schools carry more exposure. Limits should reflect the worst plausible incident.', 'Contractors working on client premises or public roads face particular exposure to third-party claims.'],
    faqs: [['Do I need public liability insurance in Kenya?', 'It is not a general legal requirement for every business, but landlords, tenders and clients often require it, and one uninsured claim can be very costly.'], ['What limit of indemnity should I choose?', 'Consider your worst plausible claim and any contractual minimum. We compare limits and the premium difference between them.'], ['Does public liability cover my employees?', 'No. Employee injuries fall under WIBA and employer\u2019s liability.']]
  },
  '/employers-liability-insurance-kenya/': {
    title: `Employer's Liability Insurance Kenya | Beyond WIBA | ${B}`,
    desc: `Employer's liability insurance in Kenya explained: how it differs from WIBA and when to consider it. Speak to ${B} about your workforce risks.`,
    h1: 'Employer\u2019s Liability Insurance in Kenya',
    local: ['In Kenya, WIBA is the statutory foundation for work injury compensation. Employer\u2019s liability is an additional cover some employers consider for claims outside the statutory scheme.', 'Employers in construction, manufacturing, agriculture and logistics have higher injury exposure and should discuss whether an extension is worthwhile.'],
    faqs: [['Is employer\u2019s liability compulsory in Kenya?', 'WIBA is the compulsory cover. Employer\u2019s liability is additional and depends on your risk and what your WIBA policy includes.'], ['Do I need both WIBA and employer\u2019s liability?', 'Many employers take WIBA and review whether an extension is useful. We read your wording and advise.']]
  },
  '/professional-indemnity-insurance-kenya/': {
    title: `Professional Indemnity Insurance Kenya | Doctors, Engineers, Lawyers | ${B}`,
    desc: `Professional indemnity insurance in Kenya for doctors, engineers, architects, accountants, advocates and consultants. Compare PI cover with ${B}.`,
    h1: 'Professional Indemnity Insurance in Kenya',
    blurb: 'Cover for claims about your professional advice, design or services.',
    lead: `If a client says your advice, design or service cost them money, you need to defend the claim even if you did nothing wrong. Professional indemnity (PI) insurance pays for the legal defence and, where the claim is covered, the compensation. ${B} arranges PI for Kenyan doctors, engineers, architects, surveyors, accountants, advocates, consultants and other professionals, and for the firms they work in.`,
    who: ['Doctors, dentists, pharmacists and clinic owners', 'Engineers, architects, quantity surveyors and project managers', 'Accountants, auditors and tax advisers', 'Advocates and law firms', 'IT, management and HR consultants'],
    local: ['Professional bodies and regulators in Kenya, such as the Medical Practitioners and Dentists Council, the Engineers Board of Kenya, the Architects and Quantity Surveyors Board and ICPAK, set their own expectations on cover. Confirm yours.', 'Clients and tender documents frequently require a stated PI limit. Check the figure before you bid.', 'Many PI policies are claims-made. Keep continuous cover and ask about retroactive dates when you change insurer or practice.'],
    faqs: [['Is professional indemnity insurance mandatory in Kenya?', 'It depends on your profession, regulator and contracts. Some require it, and many clients and tenders do. Check with your professional body and your contracts.'], ['What does claims-made mean in a PI policy?', 'The policy responds to claims first made while it is in force, subject to the retroactive date. Keep continuous cover to avoid gaps.'], ['How much PI cover does a doctor or engineer need?', 'It depends on your practice and the size of the work you do. We compare limits and premiums so you can choose with real numbers.'], ['Can a firm have one PI policy for all its professionals?', 'Often yes. A firm policy can cover the practice and its professionals. The structure depends on the insurer and firm size.']]
  },
  '/directors-officers-insurance-kenya/': {
    title: `Directors and Officers Insurance Kenya | D&O Cover | ${B}`,
    desc: `Directors and officers liability insurance in Kenya for company boards, trustees and school boards. Understand cover and request a quote from ${B}.`,
    h1: 'Directors and Officers Insurance in Kenya',
    local: ['Directors in Kenya can face claims and regulatory action under the Companies Act and sector laws. Boards of SACCOs, schools, hospitals and NGOs also face governance exposure.', 'Investors and lenders in Kenya increasingly ask about governance protections, including D&O cover.'],
    faqs: [['Do SACCO and school boards need D&O cover?', 'Boards of SACCOs, schools, hospitals and NGOs carry real governance exposure. Cover is worth discussing whatever the size.'], ['Is D&O only for listed companies?', 'No. Private companies, NGOs and boards of trustees also buy it. The need depends on size, sector and risk appetite.']]
  },
  '/cyber-insurance-kenya/': {
    title: `Cyber Insurance Kenya | Data Breach and Ransomware Cover | ${B}`,
    desc: `Cyber insurance in Kenya for businesses hit by ransomware, data breaches or payment fraud. Understand cover and Data Protection Act duties with ${B}.`,
    h1: 'Cyber Insurance in Kenya',
    local: ['The Data Protection Act, 2019 places duties on Kenyan businesses that handle personal data, and the Office of the Data Protection Commissioner can act on breaches.', 'Mobile money, online banking and e-commerce make payment fraud and business email compromise common in Kenya.', 'Insurers usually ask about basic controls such as multi-factor authentication and backups.'],
    faqs: [['Does Kenya require businesses to protect personal data?', 'Yes. The Data Protection Act, 2019 sets duties for anyone handling personal data, including security and breach reporting.'], ['Does cyber insurance cover M-Pesa or payment fraud?', 'Funds transfer fraud cover varies by policy. Ask us to check the wording for social-engineering fraud before you buy.']]
  },
  '/business-property-insurance/': {
    title: `Commercial Property Insurance Kenya | Fire, Theft, Interruption | ${B}`,
    desc: `Commercial property insurance in Kenya: fire, burglary, business interruption and political violence cover for buildings, stock and contents. Quote from ${B}.`,
    h1: 'Property Insurance for Kenyan Businesses',
    blurb: 'Buildings, stock and income protected against fire, theft and disruption.',
    lead: `Buildings, stock and equipment are the assets Kenyan businesses work hardest to build. Property insurance protects them against fire, burglary and other perils, and business interruption cover protects the income they generate. ${B} helps you set sums insured at realistic replacement values and choose the right perils for your location.`,
    local: ['Fire is a leading cause of commercial loss in Kenya\u2019s markets, warehouses and industrial areas, so fire protection and housekeeping affect terms.', 'Flood and storm cover matters across many towns during the long and short rains.', 'Riot, strike and terrorism cover is separate from standard fire policies. See political violence and terrorism cover.'],
    faqs: [['What does commercial property insurance cover in Kenya?', 'Buildings, stock, equipment and fittings against fire and listed perils, plus separate covers such as burglary and business interruption.'], ['How do I decide my sum insured?', 'Use rebuilding cost for buildings and replacement cost for stock and contents. Underinsurance can reduce a claim.']]
  },
  '/business-property-insurance/fire/': {
    title: `Fire Insurance Kenya | Commercial Fire and Allied Perils | ${B}`,
    desc: `Fire insurance in Kenya for shops, factories, warehouses, hotels and offices. Understand sums insured, perils and exclusions and request a quote from ${B}.`,
    h1: 'Fire and Allied Perils Insurance in Kenya',
    local: ['Market fires, warehouse fires and electrical faults are a recurring risk in Kenyan towns. Insurers look closely at wiring, fire equipment and housekeeping.', 'Flood and storm are often add-ons, so check whether they are included for your location.'],
    faqs: [['Is fire insurance mandatory in Kenya?', 'Not by law for most businesses, but lenders, landlords and contracts commonly require it.'], ['Does fire insurance cover flooding?', 'Not automatically. Flood and storm are often optional perils. Check your wording.']]
  },
  '/business-property-insurance/business-interruption/': {
    title: `Business Interruption Insurance Kenya | Loss of Income Cover | ${B}`,
    desc: `Business interruption insurance in Kenya replaces lost gross profit after fire or other insured damage. Choose the right indemnity period with ${B}.`,
    h1: 'Business Interruption Insurance in Kenya',
    local: ['Rebuilding and re-importing equipment in Kenya can take longer than owners expect, so choose an indemnity period that reflects reality.', 'Hotels, factories and retailers with seasonal peaks should base sums insured on peak earnings.'],
    faqs: [['How long should my indemnity period be?', 'Consider how long it would realistically take to rebuild, replace equipment and win customers back. Twelve months is a common starting point, but your case may differ.']]
  },
  '/business-property-insurance/burglary/': {
    title: `Burglary Insurance Kenya | Shop and Office Theft Cover | ${B}`,
    desc: `Burglary insurance in Kenya for shops, offices and warehouses. Understand forced-entry conditions and security requirements with ${B}.`,
    h1: 'Burglary Insurance in Kenya',
    local: ['Insurers in Kenya typically require evidence of forced and violent entry and may expect shutters, guards or alarms.', 'Theft by staff is a fidelity matter, not burglary.'],
    faqs: [['Does burglary insurance require a police report?', 'Usually yes. Report to the police promptly and obtain an abstract, then notify your insurer.']]
  },
  '/marine-insurance-kenya/': {
    title: `Marine Cargo Insurance Kenya | Imports, Exports, Digital Certificate | ${B}`,
    desc: `Marine cargo insurance in Kenya for importers and exporters, including the KRA digital marine certificate required since 1 November 2026. Quote from ${B}.`,
    h1: 'Marine Cargo Insurance in Kenya',
    blurb: 'Cargo cover for importers and exporters, including the digital marine certificate.',
    lead: `Goods moving through Mombasa, JKIA, Malaba or Busia face loss, damage and theft at every stage. Marine cargo insurance protects the goods, and for imports into Kenya it now also produces the digital certificate KRA and the IRA require. ${B} arranges single-shipment and open cover for Kenyan importers and exporters and supports clearing agents with the digital process.`,
    local: ['Since 1 November 2026, imports into Kenya require marine cargo insurance from a locally licensed insurer, evidenced by a digital certificate. See our Digital Marine Certificate page.', 'Exporters of tea, coffee, horticulture and manufactured goods should check cover terms for delay and perishability.', 'Port congestion and inland transit from Mombasa add risk, so consider transit extensions.'],
    faqs: [['Is marine cargo insurance compulsory for imports into Kenya?', 'KRA and the IRA require local marine cargo insurance for imports, evidenced by a digital certificate, and enforcement began on 1 November 2026. See our Digital Marine Certificate page for details.'], ['What is the difference between marine cargo and goods in transit?', 'Marine cargo covers international shipments. Goods in transit covers road movement within Kenya. Many businesses need both.']]
  },
  '/goods-in-transit-insurance-kenya/': {
    title: `Goods in Transit Insurance Kenya | Road Cargo Cover | ${B}`,
    desc: `Goods in transit insurance in Kenya for stock moving by road between Nairobi, Mombasa and other towns. Compare cover with ${B}.`,
    h1: 'Goods in Transit Insurance in Kenya',
    local: ['Long-haul routes such as Mombasa to Nairobi and the Northern Corridor carry accident and theft risk, especially for overnight stops.', 'Goods moving from the port inland after import may also need marine transit extensions.'],
    faqs: [['Do I need goods in transit insurance if my vehicle has motor insurance?', 'Yes. Motor insurance covers the vehicle. The goods need separate goods in transit cover.']]
  },
  '/contractors-all-risks-insurance-kenya/': {
    title: `Contractors All Risks Insurance Kenya | CAR Cover for Projects | ${B}`,
    desc: `Contractors all risks (CAR) insurance in Kenya for building and civil projects. Understand cover, tender requirements and extensions with ${B}.`,
    h1: 'Contractors All Risks Insurance in Kenya',
    local: ['Many Kenyan tenders and developers require CAR with specified limits before site handover.', 'Heavy rains regularly damage unfinished works and access routes. Check weather-related terms.'],
    faqs: [['Is CAR insurance required for construction in Kenya?', 'It is commonly required by contracts, lenders and tender documents, even where not required by general law.'], ['Who buys CAR, the contractor or the developer?', 'The contract decides. It is often the contractor, sometimes in joint names. Check before buying.']]
  },
  '/contractors-plant-machinery-insurance-kenya/': {
    title: `Contractors Plant and Machinery Insurance Kenya | ${B}`,
    desc: `Insurance for excavators, loaders, cranes and other contractors\u2019 plant in Kenya. Understand cover, site security and claims with ${B}.`,
    h1: 'Contractors Plant and Machinery Insurance in Kenya',
    local: ['Plant left on open sites is vulnerable to theft, so insurers ask about security.', 'Check cover when plant moves between sites or counties.'],
    faqs: [['Does my motor policy cover my excavator?', 'Plant used off public roads is generally outside a standard motor policy. Insure it as contractors plant.']]
  },
  '/motor-insurance-kenya/': {
    title: `Motor Insurance Kenya | Car Insurance Quotes Online | ${B}`,
    desc: `Motor and car insurance in Kenya: comprehensive, third-party, private, commercial, PSV and boda boda cover. Get a quote from ${B} today.`,
    h1: 'Motor Insurance in Kenya',
    blurb: 'Comprehensive and third-party cover for private, commercial and public vehicles.',
    lead: `Driving in Nairobi traffic, on Thika Road or the Mombasa highway means accident, theft and third-party claims are real risks. Under the Insurance (Motor Vehicles Third Party Risks) Act, third-party cover is the legal minimum for every vehicle on Kenyan roads, but comprehensive cover is what protects your own car. ${B} compares licensed insurers for private cars, commercial vehicles, fleets, PSVs and motorcycles and helps you choose the cover that fits.`,
    local: ['Third-party motor insurance is compulsory in Kenya under the Insurance (Motor Vehicles Third Party Risks) Act (Cap. 405).', 'Insurers issue certificates digitally with a QR code, and the Association of Kenya Insurers app lets you verify a vehicle\u2019s cover, which helps you avoid fake certificates.', 'Comprehensive cover typically needs a logbook, valuation for some vehicles and accurate declared use.', 'Add-ons such as political violence, windscreen and excess protector are popular in Kenya. Ask what each insurer offers.'],
    faqs: [['Is motor insurance compulsory in Kenya?', 'Third-party cover is compulsory for vehicles on Kenyan roads under the Insurance (Motor Vehicles Third Party Risks) Act. Comprehensive cover is optional but protects your own vehicle.'], ['How much is car insurance in Kenya?', 'Premiums depend on the vehicle, its value, use, driver profile and insurer. We compare quotations from licensed insurers so you see real figures.'], ['What is the difference between third-party and comprehensive insurance in Kenya?', 'Third-party covers injury and damage you cause to others. Comprehensive also covers accident damage, fire and theft of your own vehicle.'], ['How can I check if my insurance certificate is genuine?', 'Check the QR code and verify through the Association of Kenya Insurers channels. Buy only from licensed insurers and agents.'], ['Can I insure a car I am still financing?', 'Yes. Lenders usually require comprehensive cover and ask to be noted on the policy.']]
  },
  '/motor-insurance-kenya/private-car/': {
    title: `Private Car Insurance Kenya | Comprehensive and Third Party | ${B}`,
    desc: `Private car insurance in Kenya: comprehensive, third-party fire and theft, and third-party only. Compare licensed insurers with ${B}.`,
    h1: 'Private Car Insurance in Kenya',
    local: ['Traffic accidents in Nairobi, Mombasa and on major highways make comprehensive cover worth considering for newer vehicles.', 'Imported used vehicles may need a valuation for comprehensive cover.', 'Your insurer will ask for logbook, ID and KRA PIN.'],
    faqs: [['What documents do I need to insure my car in Kenya?', 'Usually a copy of the logbook, your ID and KRA PIN, and sometimes a valuation. We tell you what the insurer needs.'], ['Is windscreen cover included in comprehensive?', 'Not always. It is often an optional extension. Ask us to confirm.']]
  },
  '/motor-insurance-kenya/commercial-fleet/': {
    title: `Commercial and Fleet Motor Insurance Kenya | ${B}`,
    desc: `Motor fleet and commercial vehicle insurance in Kenya for logistics, contractors, schools and hotels. Manage many vehicles on one policy with ${B}.`,
    h1: 'Commercial Vehicle and Fleet Insurance in Kenya',
    local: ['Fleet owners on the Northern Corridor and urban delivery routes face theft, accident and breakdown risks. Driver screening affects claims and premium.', 'Goods carried need separate goods in transit cover.'],
    faqs: [['How many vehicles qualify for fleet insurance in Kenya?', 'Insurers define fleets differently. Tell us your vehicle count and we will advise what is available.']]
  },
  '/motor-insurance-kenya/psv/': {
    title: `PSV and Taxi Insurance Kenya | Matatu, Bus, Uber | ${B}`,
    desc: `Insurance for matatus, buses, taxis and ride-hailing vehicles in Kenya, including passenger liability. Request a PSV quote from ${B}.`,
    h1: 'PSV, Matatu and Taxi Insurance in Kenya',
    local: ['PSV operators in Kenya must meet licensing and insurance requirements set by the relevant authorities. Confirm current rules for your route and licence.', 'SACCOs and operator groups can sometimes negotiate group terms.'],
    faqs: [['Can I use private car insurance for Uber or Bolt in Kenya?', 'Not without telling the insurer. Hire and reward use normally needs declared cover.']]
  },
  '/medical-insurance-kenya/': {
    title: `Medical Insurance Kenya | Health Insurance for Individuals and Families | ${B}`,
    desc: `Medical and health insurance in Kenya for individuals, families and employers: inpatient, outpatient, maternity and group schemes. Compare plans with ${B}.`,
    h1: 'Medical Insurance in Kenya',
    blurb: 'Health cover for individuals, families and employers, alongside SHA.',
    lead: `A hospital stay in Nairobi can wipe out years of savings. Public cover through the Social Health Authority (SHA) provides a base, and private medical insurance adds wider hospital choice, higher limits and benefits such as outpatient, maternity, dental and optical. ${B} compares plans from licensed Kenyan insurers and explains limits, waiting periods and exclusions so you choose the plan that fits your family or your staff.`,
    local: ['SHA is the public health scheme. Many people keep private medical cover alongside it for broader access and benefits.', 'Plans are tied to hospital networks and regions. Check that the hospitals you actually use, in Nairobi and in your home county, are covered.', 'Pre-authorisation and co-payments are common. Understand them before you need them.', 'Medical underwriting applies. Declare your history fully and accurately.'],
    faqs: [['Do I still need private medical insurance if I am on SHA?', 'Many people keep both. SHA provides a public base, and private cover can give wider hospital choice and benefits. We help you compare.'], ['What is the difference between inpatient and outpatient cover?', 'Inpatient covers hospital admission and surgery. Outpatient covers consultations, tests and medication that do not need admission. Plans set separate limits for each.'], ['How much is medical insurance in Kenya?', 'It depends on age, benefits, limits, hospital network and medical history. We compare plans and show you real quotations.'], ['Are pre-existing conditions covered?', 'It depends on the plan. Many apply waiting periods, exclusions or loadings. Always disclose and ask us to confirm the terms.']]
  },
  '/medical-insurance-kenya/individual-family/': {
    title: `Individual and Family Medical Insurance Kenya | ${B}`,
    desc: `Individual and family medical insurance in Kenya with inpatient, outpatient, maternity, dental and optical options. Compare plans with ${B}.`,
    h1: 'Individual and Family Medical Insurance in Kenya',
    local: ['Family plans often share a single limit across members. Check limits per person and per family.', 'Maternity, dental and optical are often optional benefits with waiting periods.', 'Children and dependants are covered under defined age rules.'],
    faqs: [['Is maternity cover included in family medical insurance?', 'Often as an optional benefit with a waiting period. Confirm before you plan a pregnancy.'], ['Can I cover my parents?', 'Many insurers offer senior cover with different terms and age limits. Ask us to compare.']]
  },
  '/medical-insurance-kenya/group/': {
    title: `Group Medical Insurance Kenya | Employee Health Cover | ${B}`,
    desc: `Group medical insurance in Kenya for SMEs and corporates: benefit design, limits and claims administration. Quote from ${B}.`,
    h1: 'Group Medical Insurance for Kenyan Employers',
    local: ['Group schemes often accept staff regardless of individual history up to a free cover limit, subject to insurer terms.', 'Benefit tiers by grade help control cost and meet expectations.'],
    faqs: [['What size of company can buy group medical in Kenya?', 'Minimum group sizes vary by insurer. Tell us your headcount and we will advise what is available.'], ['How early should we start the renewal process?', 'Ideally two to three months before expiry so claims data can be gathered and the market approached.']]
  },
  '/travel-insurance-kenya/': {
    title: `Travel Insurance Kenya | Schengen, Student and Corporate | ${B}`,
    desc: `Travel insurance from Kenya for holidays, Schengen visas, students and business trips. Compare cover with ${B}.`,
    h1: 'Travel Insurance from Kenya',
    local: ['Many embassies require proof of medical travel insurance for visa applications. Check requirements for your destination.', 'Departures from JKIA and Moi International Airport are covered like any other origin. Your cover applies for the trip.'],
    faqs: [['Do I need travel insurance to travel from Kenya?', 'It is strongly advisable and often required for visas. Check the destination\u2019s rules.']]
  },
  '/travel-insurance-kenya/schengen/': {
    title: `Schengen Visa Travel Insurance Kenya | ${B}`,
    desc: `Schengen visa travel insurance for Kenyans: cover that meets consulate requirements, with repatriation. Get a compliant policy from ${B}.`,
    h1: 'Schengen Visa Travel Insurance for Kenyans',
    local: ['Schengen consulates generally ask for medical travel insurance valid across the Schengen area with a minimum medical and repatriation cover. Confirm the current figure with your consulate.', 'Apply for insurance before your visa appointment so you can attach the certificate.'],
    faqs: [['When should I buy Schengen travel insurance?', 'Before your visa application, so the policy certificate can be submitted with it.']]
  },
  '/travel-insurance-kenya/corporate/': {
    title: `Corporate Travel Insurance Kenya | Business Trip Cover | ${B}`,
    desc: `Corporate and annual multi-trip travel insurance for Kenyan companies and NGOs. Protect staff on business travel with ${B}.`,
    h1: 'Corporate Travel Insurance in Kenya',
    local: ['Regional and international travel is common for Kenyan NGOs, consultancies and corporates. An annual policy simplifies cover for frequent travellers.'],
    faqs: [['Is an annual policy better for frequent business travel?', 'Often yes. It covers multiple trips within set limits. We compare options against your travel pattern.']]
  },
  '/home-insurance-kenya/': {
    title: `Home Insurance Kenya | Domestic Package and Contents | ${B}`,
    desc: `Home insurance in Kenya for houses, apartments and contents, including domestic workers and burglary. Compare cover with ${B}.`,
    h1: 'Home Insurance in Kenya',
    local: ['Homeowners in Nairobi estates, Kiambu, Karen and coastal towns commonly insure buildings, contents and domestic staff together.', 'Security measures such as alarms, guards and electric fences can influence terms.'],
    faqs: [['Does home insurance cover house helps in Kenya?', 'Domestic workers can be covered under a domestic package or WIBA. We explain your options.']]
  },
  '/personal-accident-insurance-kenya/': {
    title: `Personal Accident Insurance Kenya | Chestnut Insurance Agency`,
    desc: `Personal accident insurance in Kenya pays defined benefits for accidental death or disability. Cover for individuals, families, riders and employees.`,
    h1: 'Personal Accident Insurance in Kenya',
    local: ['Personal accident cover is popular with motorcyclists, drivers, outdoor workers and parents looking for affordable protection.', 'It pays defined benefits and does not replace medical insurance.'],
    faqs: [['Does personal accident insurance cover medical bills?', 'Some plans include limited medical expenses. Primarily it pays fixed benefits for death or disability from accidents.']]
  },
  '/group-life-insurance-kenya/': {
    title: `Group Life Insurance Kenya | Employee Death Benefit | ${B}`,
    desc: `Group life insurance in Kenya for employers: death benefits as a multiple of salary, eligibility and how it differs from WIBA. Quote from ${B}.`,
    h1: 'Group Life Insurance in Kenya',
    local: ['Group life is a widely expected employee benefit in Kenya, usually set as a multiple of annual salary.', 'It differs from WIBA, which responds only to work injury and disease.'],
    faqs: [['What multiple of salary is typical for group life in Kenya?', 'Multiples vary by employer and insurer. We help you choose one that fits your budget and staff needs.']]
  }
};
