export type Content = {
    title: string;        // browser tab and search result title
    description: string;  // search result snippet (about 150 characters)
    h1: string;
    intro: string;        // put the main keyword in the first sentence
    sections: { h: string; p: string }[];
    faqs: { q: string; a: string }[];
};

// Update this whenever you review rates and copy.
export const UPDATED = "October 2026";

export const CONTENT: Record<string, Content> = {
    "personal-loans": {
        title: "Compare Personal Loans: Rates, Amounts and Terms",
        description: "Compare personal loan offers side by side, including APR ranges, loan amounts, terms, and minimum credit scores, before you apply.",
        h1: "Compare personal loans",
        intro: "A personal loan lets you borrow a fixed amount and repay it in equal monthly payments over a set term. Compare personal loan rates, amounts, and requirements from several lenders below, then check your own rate with the lender you choose.",
        sections: [
            { h: "How personal loans work", p: "Most personal loans are unsecured, meaning you don't pledge a car or home as collateral. The lender sets your APR based on your credit, income, and the amount and term you choose, then pays out the funds in one lump sum." },
            { h: "What affects your personal loan rate", p: "Your credit score, debt-to-income ratio, income stability, and loan term all play a part. A shorter term usually means a higher monthly payment but less total interest. Some lenders also charge an origination fee, so compare the APR, not just the interest rate." },
            { h: "When a personal loan may make sense", p: "People commonly use personal loans for home repairs, medical bills, moving costs, or consolidating higher-interest debt. Borrow only what you can repay comfortably, and compare at least a few offers first." },
        ],
        faqs: [
            { q: "What credit score do I need for a personal loan?", a: "It depends on the lender. Higher scores generally qualify for lower rates, and some lenders consider applicants with fair credit. Each lender lists its own minimum." },
            { q: "Does checking my rate affect my credit score?", a: "Many lenders let you see estimated rates with a soft credit check, which doesn't affect your score. A formal application usually involves a hard inquiry. Check the lender's terms before you apply." },
            { q: "How fast can I get the money?", a: "Funding time varies by lender and by how quickly you submit documents. Some lenders fund within a few business days, and others take longer." },
            { q: "What is an origination fee?", a: "It's a fee some lenders charge for processing the loan, often deducted from the amount you receive. It's included in the APR." },
        ],
    },
    "debt-consolidation": {
        title: "Debt Consolidation Loans: Compare Rates and Lenders",
        description: "Compare debt consolidation loans from multiple lenders, including APR ranges, loan amounts, and terms, to combine your debts into one payment.",
        h1: "Compare debt consolidation loans",
        intro: "A debt consolidation loan combines several debts, such as credit cards, into one loan with a single monthly payment. Compare debt consolidation loan rates and terms below to see whether it could lower your cost.",
        sections: [
            { h: "How debt consolidation works", p: "You take out a new loan and use it to pay off your existing balances. You then repay the new loan on a fixed schedule, usually at a fixed rate." },
            { h: "When it can save money", p: "It tends to help when the new APR, including any fees, is lower than the average rate on the debts you're replacing, and when you can commit to not running balances back up." },
            { h: "What to compare", p: "Look at the APR, origination fees, term length, and total cost over the life of the loan. A lower monthly payment over a longer term can still cost more in total interest." },
        ],
        faqs: [
            { q: "Is a debt consolidation loan a good idea?", a: "It depends on your rate, fees, and spending habits. It helps most when it lowers your total interest cost and you avoid taking on new debt." },
            { q: "Will consolidating debt hurt my credit?", a: "A hard inquiry can cause a small, temporary dip. Over time, paying down balances and making on-time payments can help, but results vary." },
            { q: "Can I consolidate with bad credit?", a: "Some lenders work with lower credit scores, usually at higher rates. Compare offers carefully, because a high APR may not save you money." },
        ],
    },
};

export function getContent(slug: string, name: string, blurb: string): Content {
    const n = name.toLowerCase();
    return (
        CONTENT[slug] ?? {
            title: `Compare ${name}: Rates, Amounts and Terms`,
            description: `Compare ${n} from multiple lenders, including APR ranges, loan amounts, and terms, before you apply.`,
            h1: `Compare ${n}`,
            intro: `${blurb} Compare ${n} offers below, then check your rate with the lender you choose.`,
            sections: [
                { h: `What to compare in ${n}`, p: "Look at the APR, fees, loan amount, term, and minimum credit requirements. The lowest advertised rate isn't always the one you'll be offered." },
            ],
            faqs: [
                { q: `How do I choose among ${n}?`, a: "Compare the full APR, fees, repayment term, and eligibility requirements, and check your personal rate with a few lenders before you decide." },
            ],
        }
    );
}