// The full planned advisory range from the Phase 1 report (section 5.3 and the services sitemap):
// Portfolio Review (incl. Gap Analysis), Risk Assessment, Policy/Contract Review, Renewal Management,
// Procurement Support, Tender/RFQ Support, Claims Assistance, Programme Management, Employee Insurance Education.
// `team` tags show which function in an organisation each service mainly serves.

export const services = [
  {
    path: '/insurance-portfolio-review/', kind: 'review', team: 'Finance, Admin',
    title: 'Insurance Portfolio Review and Gap Analysis Kenya | Chestnut Insurance Agency',
    h1: 'Insurance Portfolio Review and Gap Analysis for Kenyan Organisations',
    desc: 'Chestnut Insurance Agency reviews your insurance portfolio, finds gaps, overlaps and outdated sums insured, and prepares your renewal strategy. Request a review in Nairobi.',
    blurb: 'Find gaps, overlaps and outdated values across every policy you hold.',
    lead: 'Most Kenyan organisations buy insurance policy by policy, year after year. A portfolio review looks at everything together: what you hold, what you actually own and do, and what your contracts, lenders and landlords require. The gap analysis shows where cover is missing, and the review shows where you are paying for cover you do not need.',
    does: ['Read every schedule and key wording clause across your motor, property, liability, WIBA, medical and other covers', 'Compare sums insured with realistic replacement values, from stock in Industrial Area to equipment on a site in Thika', 'Run a gap analysis against your operations, for example a new activity with no liability cover or a fleet running without goods in transit cover', 'Spot overlaps and duplicated covers that add premium without adding protection', 'Check tender, lease and loan insurance conditions against what is actually in force', 'Give Finance a clear summary of premium by class and a renewal strategy'],
    need: ['Current policy schedules and, where available, full wording', 'Premiums paid and renewal dates', 'Asset register, stock and payroll summaries', 'Claims record for the last three to five years', 'Contracts and lease or loan agreements that mention insurance'],
    steps: [['Share your documents', 'Send what you have by email or WhatsApp. We tell you what is missing.'], ['We review and test', 'We map your risks to your covers and list gaps, overlaps and questions.'], ['We explain in plain language', 'You receive a clear summary and prioritised recommendations.'], ['You decide', 'We act only on your instruction, including approaching insurers for terms.']],
    limits: ['A review is advice based on the information you provide. It does not promise lower premiums or claim outcomes.', 'Insurers decide whether to offer terms and on what basis.'],
    faqs: [['When should we do a portfolio review?', 'Six to eight weeks before your main renewal date is ideal, because there is still time to gather information and approach the market. A review is also sensible after expansion, a new contract or a major claim.'], ['Do we have to move our insurance to get a review?', 'No. You can ask for a review of your existing programme. If changes are worthwhile we explain them and you decide.'], ['What does a review cost?', 'Please ask us. Any fee or remuneration arrangement is explained to you before you proceed.']]
  },
  {
    path: '/business-risk-assessment/', kind: 'risk', team: 'Admin, Finance',
    title: 'Business Risk Assessment for Insurance Kenya | Chestnut Insurance Agency',
    h1: 'Business Risk Assessment for Kenyan Businesses',
    desc: 'A structured review of your business risks and how insurance and practical controls can address them. Request a business risk assessment from Chestnut Insurance Agency.',
    blurb: 'A structured view of what can go wrong in your operations and what to do about it.',
    lead: 'Insurance works best when it follows a clear view of your risks. Chestnut Insurance Agency walks through your premises, people, vehicles, stock, contracts and systems to identify what can go wrong, how badly, and which risks to insure, reduce or retain.',
    does: ['Map your operations, locations, staff, vehicles and key suppliers', 'Identify exposures to fire, theft, liability, work injury, transit, cyber and business interruption', 'Consider Kenyan realities such as flooding in the rainy seasons, road risk and political or civil disruption', 'Suggest practical controls, such as fire safety, security and driver management, alongside insurance options', 'Prioritise what to insure, what to retain and what to fix first', 'Prepare a summary you can share with your board, lender or partners'],
    need: ['A short description of the business and its locations', 'Asset and stock summary', 'Employee numbers and roles', 'Existing policies, if any'],
    steps: [['Intake', 'Complete a short form and send basic documents.'], ['Conversation', 'We talk through how the business really runs, by call, video or on site.'], ['Findings', 'We summarise risks, gaps and options in plain language.'], ['Action plan', 'You choose what to act on, with our help if you want it.']],
    limits: ['A risk assessment is advisory. It is not an engineering survey, a safety audit or a legal opinion.', 'Insurer terms and availability apply to any cover that follows.'],
    faqs: [['Is a risk assessment only for large companies?', 'No. Small businesses often gain the most because one loss can threaten the whole business.'], ['Do you visit our premises?', 'We can discuss your operations remotely and, where useful, arrange a visit. Tell us your location and we will advise.']]
  },
  {
    path: '/insurance-policy-review/', kind: 'policy', team: 'Procurement, Admin',
    title: 'Insurance Policy and Contract Review Kenya | Chestnut Insurance Agency',
    h1: 'Insurance Policy and Contract Review',
    desc: 'Have your policy wording and contract insurance clauses reviewed in plain language. Chestnut Insurance Agency explains exclusions, limits and conditions for Kenyan organisations.',
    blurb: 'Plain-language review of policy wording and contract insurance clauses.',
    lead: 'The policy schedule tells you the sums insured. The wording tells you what happens when you claim. We read your policies and the insurance clauses in your contracts, then explain in plain English what they mean for your organisation, where the traps are and what to ask the insurer to change.',
    does: ['Summarise cover, limits, excesses, exclusions and conditions in plain language', 'Flag clauses that commonly cause disputes, such as warranties, notification periods and security conditions', 'Check contract insurance clauses, including required covers, limits, joint names and waiver of subrogation', 'Compare the policy against what the contract or lender requires', 'Suggest wording changes or endorsements to request from the insurer'],
    need: ['Full policy wording and schedule', 'The contract, tender or lease clauses that mention insurance', 'Any correspondence with the insurer on terms'],
    steps: [['Send the documents', 'Share the policy and the contract clauses.'], ['We read and annotate', 'We mark what matters and what is missing.'], ['We explain', 'You get a short written summary and a call to discuss.'], ['Negotiate changes', 'If you want, we approach the insurer for amendments.']],
    limits: ['This is insurance advice, not legal advice. For legal interpretation, consult an advocate.', 'Insurers decide whether to agree to wording changes.'],
    faqs: [['Can you review a policy we did not buy through Chestnut Insurance Agency?', 'Yes. Send us the documents and we will explain what we find.']]
  },
  {
    path: '/insurance-renewal-management/', kind: 'renewal', team: 'Finance, Admin',
    title: 'Insurance Renewal Management Kenya | Chestnut Insurance Agency',
    h1: 'Insurance Renewal Management',
    desc: 'Let Chestnut Insurance Agency manage your insurance renewals in Kenya: timelines, data, market approach and comparisons so renewal dates stop being a scramble.',
    blurb: 'A managed renewal calendar so no policy lapses and every renewal is tested.',
    lead: 'Renewals are where organisations most often overpay or lapse. Chestnut Insurance Agency runs the renewal process for you: building the calendar, gathering the data, approaching insurers and comparing terms, so your decision-makers receive a clear recommendation in good time.',
    does: ['Build a renewal calendar across all your policies', 'Start early and gather updated values, payroll, fleet and claims data', 'Approach suitable insurers for terms and compare them like for like, including limits and exclusions', 'Prepare a renewal report for Finance with premium movements and recommendations', 'Help you avoid lapses, which matter especially for motor, WIBA and contract-required covers'],
    need: ['Current policies and expiry dates', 'Updated asset, fleet and payroll information', 'Claims experience'],
    steps: [['Calendar', 'We list every policy and expiry date.'], ['Data', 'We collect updated information well ahead of expiry.'], ['Market', 'We approach insurers and compare terms.'], ['Decision', 'You receive a recommendation and we handle the paperwork.']],
    limits: ['We cannot guarantee a lower premium. Pricing depends on your risk, claims record and market conditions.'],
    faqs: [['How early should renewal work start?', 'Eight weeks before expiry is a sensible target for business programmes. Group medical and larger programmes may need more time.']]
  },
  {
    path: '/insurance-procurement-support/', kind: 'procurement', team: 'Procurement',
    title: 'Insurance Procurement Support Kenya | Chestnut Insurance Agency',
    h1: 'Insurance Procurement Support for Kenyan Organisations',
    desc: 'Help for procurement teams buying insurance: specifications, insurer quotations and comparisons. Chestnut Insurance Agency supports private and institutional buyers in Kenya.',
    blurb: 'Specifications, quotations and fair comparisons for procurement teams.',
    lead: 'Buying insurance is not like buying stationery. The cheapest quotation can have the narrowest cover. We support procurement teams with specifications that describe what you actually need, insurer quotations and a comparison that looks beyond the premium.',
    does: ['Help draft an insurance specification and schedule of covers', 'Approach suitable insurers and collect quotations on a comparable basis', 'Prepare a side-by-side comparison of cover, limits, excesses, exclusions and premium', 'Advise on evaluation criteria that reflect cover quality and not only price', 'Support your internal approval documents'],
    need: ['What you need to insure and why', 'Your procurement timeline and rules', 'Existing policies, if any'],
    steps: [['Brief', 'You tell us what you are buying and your timeline.'], ['Specification', 'We help define cover and limits.'], ['Quotations', 'We obtain and compare quotations.'], ['Recommendation', 'You receive a clear comparison for your approval.']],
    limits: ['The procurement decision and contract remain yours. We provide advice and information.'],
    faqs: [['Do you work with institutions that follow formal procurement rules?', 'Yes. Tell us your process and we will structure the information to fit it. See also our tender and RFQ support.']]
  },
  {
    path: '/insurance-tender-support/', kind: 'tender', team: 'Procurement, Admin',
    title: 'Insurance Tender and RFQ Support Kenya | Chestnut Insurance Agency',
    h1: 'Insurance Tender and RFQ Support in Kenya',
    desc: 'Meet the insurance requirements in Kenyan tenders, contracts and RFQs: correct covers, limits and certificates. Chestnut Insurance Agency supports bidders and procuring entities.',
    blurb: 'Meet the insurance requirements of your next tender, contract or RFQ.',
    lead: 'Kenyan tenders and contracts often set minimum insurance requirements such as public liability, professional indemnity, contractors all risks or WIBA. Missing a certificate or a limit can disqualify a bid. Chestnut Insurance Agency helps you work out what is required, arrange suitable cover and prepare the documents.',
    does: ['Read the insurance clauses in the tender or contract', 'Identify the covers, limits and endorsements required', 'Arrange or adjust cover where you instruct us to', 'Help you obtain the certificates and letters you need before the deadline', 'Flag requirements that need clarification from the procuring entity'],
    need: ['The tender or contract insurance clause', 'Submission deadline', 'Your existing policies, if any'],
    steps: [['Share the requirement', 'Send the insurance section and your deadline.'], ['We interpret', 'We list what is required and what you already hold.'], ['We arrange', 'We obtain quotations and arrange cover as you instruct.'], ['Documents', 'We help you obtain the certificates and evidence for submission.']],
    limits: ['Winning a tender depends on many factors outside insurance.', 'Timelines depend on insurers and on the information provided, so contact us early.'],
    faqs: [['How early should I contact you?', 'As soon as you see the requirement. Some covers take time to arrange.'], ['Do you help with performance bonds?', 'Bonds and guarantees are covered on our bonds and guarantees page. Tell us what your tender requires.']]
  },
  {
    path: '/claims-assistance/', kind: 'claims', team: 'Admin, HR',
    title: 'Insurance Claims Assistance Kenya | Chestnut Insurance Agency',
    h1: 'Insurance Claims Assistance in Kenya',
    desc: 'Practical help preparing and following up an insurance claim in Kenya: what to do first, what to document and how Chestnut Insurance Agency supports you.',
    blurb: 'Prepare, submit and follow up a claim with confidence.',
    lead: 'A claim goes better when the first steps are right. Chestnut Insurance Agency helps clients understand their policy, prepare documents and follow up with the insurer. Settlement depends on the policy terms and the facts of the loss, so we never promise an outcome, but we make sure your claim is presented properly.',
    does: ['Help you understand what your policy says about your loss', 'Tell you what documents the insurer is likely to ask for, such as a police abstract for theft or accident, repair quotations and photographs', 'Help you prepare and submit a clear claim', 'Follow up with the insurer and keep you informed', 'Explain assessor, repair and settlement steps as they arise', 'Support HR with work injury claims and notifications under WIBA'],
    need: ['Policy number and insurer', 'Date, place and description of the incident', 'Photos, police abstract or other evidence where relevant', 'Quotations or invoices for repair or replacement'],
    steps: [['Report to your insurer', 'Notify the insurer as your policy requires, as soon as reasonably possible. Do not wait to contact us first if a deadline applies.'], ['Protect the evidence', 'Take photos, keep damaged items where it is safe to do so and do not admit liability to others.'], ['Contact Chestnut Insurance Agency', 'Tell us what happened by phone or WhatsApp. We guide you on documents and next steps.'], ['Submit and follow up', 'We help you file, chase and explain the insurer\u2019s response.']],
    limits: ['Settlement depends on the policy, its exclusions and conditions, and the insurer\u2019s assessment.', 'We do not guarantee any claim outcome or timeline.', 'In an emergency, contact the relevant emergency services first.'],
    faqs: [['How soon should I report a claim?', 'As soon as reasonably possible. Many policies set time limits for notification. Check your policy and notify the insurer.'], ['What do I need after a road accident?', 'Usually a police abstract, photographs, your policy details, driving licence and repair quotations. Your insurer will confirm exactly what it needs.'], ['Can you help with a claim on a policy I did not buy through you?', 'Please contact us and tell us what happened. We will explain what help we can offer.']]
  },
  {
    path: '/insurance-programme-management/', kind: 'programme', team: 'Admin, Finance, HR',
    title: 'Insurance Programme Management Kenya | Chestnut Insurance Agency',
    h1: 'Insurance Programme Management',
    desc: 'Ongoing management of your organisation\u2019s insurance programme in Kenya: renewals, endorsements, claims and reporting through one Chestnut Insurance Agency contact.',
    blurb: 'One accountable team managing your insurance year-round.',
    lead: 'For organisations with several policies, vehicles, sites and employees, insurance becomes an administrative load. Chestnut Insurance Agency can act as your outsourced insurance desk: one accountable contact managing endorsements, renewals, claims and reporting across your whole programme.',
    does: ['Maintain a register of policies, sums insured and expiry dates', 'Process endorsements for new vehicles, new staff, new locations and asset changes', 'Coordinate claims across insurers', 'Prepare periodic reports for management and Finance', 'Flag changes in your operations that affect cover'],
    need: ['Your current policy list', 'A named contact in Admin, HR or Finance', 'Updates when the business changes'],
    steps: [['Onboard', 'We build the register from your policies.'], ['Operate', 'We handle endorsements and queries as they arise.'], ['Report', 'You receive periodic summaries.'], ['Review', 'We revisit the programme at each renewal.']],
    limits: ['Scope and fees are agreed with you in advance.'],
    faqs: [['Is this only for large organisations?', 'No. Any organisation with several policies and a small admin team can benefit.']]
  },
  {
    path: '/employee-insurance-education/', kind: 'education', team: 'HR',
    title: 'Employee Insurance Education Kenya | Chestnut Insurance Agency',
    h1: 'Employee Insurance Education for Kenyan Employers',
    desc: 'Staff sessions that explain medical, group life, WIBA and pension benefits so employees understand and use them. Chestnut Insurance Agency supports HR teams in Kenya.',
    blurb: 'Sessions that help staff understand and use their benefits.',
    lead: 'Employers spend real money on medical cover, group life, WIBA and pensions, and many employees do not know what they are entitled to or how to claim. Chestnut Insurance Agency runs practical sessions and prepares plain-language material for your HR team, so benefits are understood and used properly.',
    does: ['Explain medical cover: inpatient, outpatient, limits, pre-authorisation and what is not covered', 'Explain group life and what it means for employees\u2019 families', 'Explain WIBA and what to do after a workplace injury', 'Explain how private cover relates to public arrangements such as SHA and NSSF', 'Prepare simple handouts, FAQs and claim-process guides for your staff'],
    need: ['Your benefit schedule', 'The number of staff and locations', 'Preferred format: on site, virtual or recorded'],
    steps: [['Brief', 'We review your benefits.'], ['Prepare', 'We tailor content to your schemes.'], ['Deliver', 'We run the sessions.'], ['Follow up', 'We answer questions and refresh as benefits change.']],
    limits: ['Sessions explain cover in general terms and your scheme. Individual medical or legal advice is outside their scope.'],
    faqs: [['Can you run sessions for staff in different counties?', 'Virtual sessions work well for teams outside Nairobi. Tell us where your staff are based.']]
  }
];
