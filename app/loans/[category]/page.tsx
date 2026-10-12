import { notFound } from "next/navigation";
import type { Metadata } from "next";
import LenderCard from "@/components/LenderCard";
import { CATEGORIES, SAMPLE_DATA, getCategory, getLenders } from "@/lib/loans";
import { UPDATED, getContent } from "@/lib/content";

export const generateStaticParams = () => CATEGORIES.map((c) => ({ category: c.slug }));

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
    const c = getCategory((await params).category);
    if (!c) return {};
    const { title, description } = getContent(c.slug, c.name, c.blurb);
    return { title, description, alternates: { canonical: `/loans/${c.slug}` } };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const slug = (await params).category;
    const c = getCategory(slug);
    if (!c) notFound();
    const content = getContent(c.slug, c.name, c.blurb);
    const lenders = getLenders(slug);

    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: content.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
    };

    return (
        <main className="mx-auto max-w-5xl px-4 py-10">
            <h1 className="font-display text-4xl text-[#14211C]">{content.h1}</h1>
            <p className="mt-2 text-sm text-[#4B5E56]">Last updated {UPDATED}</p>
            <p className="mt-4 max-w-prose text-lg text-[#33463E]">{content.intro}</p>

            {SAMPLE_DATA && (
                <p className="mt-5 rounded border border-[#E2B04A] bg-[#FFF6E0] p-3 text-sm text-[#5C3D00]">
                    Sample data. Replace the placeholder lenders in lib/loans.ts with real, verified offers before launch.
                </p>
            )}
            <p className="mt-5 text-sm text-[#4B5E56]">
                We may earn a commission when you click a link and are approved. This does not change our ratings.
                Rates and terms are set by lenders and may change.
            </p>

            <div className="mt-6 space-y-4">
                {lenders.map((l) => <LenderCard key={l.id} l={l} />)}
            </div>

            <div className="mt-14 max-w-prose space-y-8">
                {content.sections.map((s) => (
                    <section key={s.h}>
                        <h2 className="font-display text-2xl text-[#14211C]">{s.h}</h2>
                        <p className="mt-2 text-[#33463E]">{s.p}</p>
                    </section>
                ))}

                <section>
                    <h2 className="font-display text-2xl text-[#14211C]">Frequently asked questions</h2>
                    <div className="mt-3 divide-y divide-[#C9D5CF] border-y border-[#C9D5CF]">
                        {content.faqs.map((f) => (
                            <details key={f.q} className="py-3">
                                <summary className="cursor-pointer font-semibold text-[#14211C]">{f.q}</summary>
                                <p className="mt-2 text-[#33463E]">{f.a}</p>
                            </details>
                        ))}
                    </div>
                </section>
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
        </main>
    );
}