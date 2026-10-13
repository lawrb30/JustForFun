export type Category = {
  slug: string; name: string; blurb: string;
  apr: [number, number]; amount: [number, number]; term: [number, number]; // term in months
};

export type Lender = {
  id: string; category: string; name: string;
  aprMin: number; aprMax: number; amountMin: number; amountMax: number;
  termMin: number; termMax: number; minCredit: number; funding: string; note: string;
  featured?: boolean;
};

// Set to false once you replace the placeholders below with real, verified lender data.
export const SAMPLE_DATA = true;

export const CATEGORIES: Category[] = [
  { slug: "personal-loans", name: "Personal loans", blurb: "Flexible loans for large purchases, moving costs, or unexpected bills.", apr: [7, 36], amount: [1000, 50000], term: [12, 84] },
  { slug: "debt-consolidation", name: "Debt consolidation", blurb: "Combine credit cards and other debts into one fixed monthly payment.", apr: [8, 35], amount: [2000, 75000], term: [24, 84] },
  { slug: "auto-refinance", name: "Auto refinance", blurb: "Replace your current car loan with a lower rate or smaller payment.", apr: [5, 20], amount: [5000, 100000], term: [24, 84] },
  { slug: "student-loan-refinance", name: "Student loan refinance", blurb: "Refinance education debt into a single loan with new terms.", apr: [4, 17], amount: [5000, 300000], term: [60, 240] },
  { slug: "small-business-loans", name: "Small business loans", blurb: "Funding for equipment, inventory, payroll, or growth.", apr: [7, 40], amount: [5000, 500000], term: [6, 120] },
  { slug: "home-equity", name: "Home equity loans", blurb: "Borrow against the equity you have built in your home.", apr: [7, 14], amount: [10000, 400000], term: [60, 360] },
];

// PLACEHOLDER DATA ONLY. Replace with real lenders and approved figures from each affiliate program.
const FEATURES = ["No origination fee", "Same-day decision", "Soft credit check to see rates", "Autopay discount", "Flexible payment dates", "Fast funding", "No prepayment penalty", "Joint applications accepted", "Co-signer option", "Low minimum income"];
const FUNDING = ["Same day", "1 business day", "2 business days", "3 to 5 business days"];

function placeholders(c: Category): Lender[] {
  return Array.from({ length: 5 }, (_, i) => {
    const aprMin = +(c.apr[0] + i * 0.55).toFixed(2);
    const aprMax = +Math.min(c.apr[1], aprMin + 12 + (i % 4) * 3).toFixed(2);
    return {
      id: `${c.slug}-${i + 1}`, category: c.slug, name: `Sample Lender ${i + 1}`,
      aprMin, aprMax,
      amountMin: c.amount[0] * (1 + (i % 3)),
      amountMax: Math.round((c.amount[1] * (1 - (i % 5) * 0.12)) / 1000) * 1000,
      termMin: c.term[0], termMax: Math.round(c.term[1] - (i % 3) * 12),
      minCredit: 580 + (i % 6) * 20, funding: FUNDING[i % FUNDING.length],
      note: FEATURES[i % FEATURES.length], featured: i === 0,
    };
  });
}

export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
export const getLenders = (slug: string) => { const c = getCategory(slug); return c ? placeholders(c) : []; };
