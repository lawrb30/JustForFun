import Link from "next/link";
import { CATEGORIES } from "@/lib/loans";

const STEPS = [
    { t: "Choose a loan type", d: "Pick what you need money for, from personal loans to business funding." },
    { t: "Compare lenders", d: "See rates, loan amounts, terms, and minimum credit scores in one place." },
    { t: "Check your rate", d: "Continue to the lender's own site to see your personal offer and apply." },
];

export default function Home() {
    return (
        <main>
            {/* Hero */}
            <section className="mx-auto max-w-5xl px-4 pb-14 pt-16">
                <p className="text-sm font-semibold uppercase tracking-wide text-[#1F6B4F]">Loan comparison</p>
                <h1 className="font-display mt-3 max-w-3xl text-5xl leading-tight sm:text-6xl">
                    Compare loan offers before you apply.
                </h1>
                <p className="mt-5 max-w-prose text-lg text-[#33463E]">
                    Look at rates, amounts, and terms from many lenders side by side, then go straight to the
                    lender you choose. No account needed, and we never ask for your personal information.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                        href="/loans/personal-loans"
                        className="rounded bg-[#1F6B4F] px-6 py-3 font-semibold text-white hover:bg-[#17523C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F6B4F]"
                    >
                        Compare personal loans
                    </Link>
                    <Link
                        href="#loan-types"
                        className="rounded border border-[#1F6B4F] px-6 py-3 font-semibold text-[#1F6B4F] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F6B4F]"
                    >
                        Browse all loan types
                    </Link>
                </div>
            </section>

            {/* Loan types */}
            <section id="loan-types" className="border-y border-[#C9D5CF] bg-white py-14">
                <div className="mx-auto max-w-5xl px-4">
                    <h2 className="font-display text-3xl">What do you need a loan for?</h2>
                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {CATEGORIES.map((c) => (
                            <Link
                                key={c.slug}
                                href={`/loans/${c.slug}`}
                                className="group flex flex-col rounded-md border border-[#C9D5CF] bg-[#F1F5F3] p-5 hover:border-[#1F6B4F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1F6B4F]"
                            >
                                <span className="font-display text-xl">{c.name}</span>
                                <span className="mt-2 flex-1 text-[#4B5E56]">{c.blurb}</span>
                                <span className="mt-4 text-sm font-semibold text-[#1F6B4F] group-hover:underline">
                  Compare lenders →
                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section id="how-it-works" className="mx-auto max-w-5xl px-4 py-14">
                <h2 className="font-display text-3xl">How it works</h2>
                <ol className="mt-8 grid gap-8 sm:grid-cols-3">
                    {STEPS.map((s, i) => (
                        <li key={s.t}>
                            <span className="font-display text-4xl text-[#1F6B4F]">{i + 1}</span>
                            <h3 className="mt-2 text-lg font-semibold">{s.t}</h3>
                            <p className="mt-1 text-[#4B5E56]">{s.d}</p>
                        </li>
                    ))}
                </ol>
            </section>

            {/* Transparency */}
            <section className="mx-auto max-w-5xl px-4">
                <div className="rounded-md border border-[#C9D5CF] bg-white p-6 sm:p-8">
                    <h2 className="font-display text-2xl">How we make money</h2>
                    <p className="mt-3 max-w-prose text-[#33463E]">
                        We&apos;re paid by some lenders when you click through and are approved. That
                        compensation doesn&apos;t cost you anything. We&apos;re not a lender, we don&apos;t make
                        credit decisions, and rates and terms are set by each lender and can change.
                    </p>
                </div>
            </section>
        </main>
    );
}