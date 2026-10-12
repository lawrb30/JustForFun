import type { Lender } from "@/lib/loans"

const usd = (n: number) => "$" + n.toLocaleString("en-US");
const yrs = (m: number) => (m >= 24 && m % 12 === 0 ? `${m / 12} yrs` : `${m} mo`);

export default function LenderCard({ l }: { l: Lender }) {
  const stats: [string, string][] = [
    ["APR", `${l.aprMin}% to ${l.aprMax}%`],
    ["Loan amount", `${usd(l.amountMin)} to ${usd(l.amountMax)}`],
    ["Term", `${yrs(l.termMin)} to ${yrs(l.termMax)}`],
    ["Min. credit score", `${l.minCredit}+`],
    ["Funding", l.funding],
  ];
  return (
    <article className="grid gap-5 rounded-md border border-[#C9D5CF] bg-white p-5 md:grid-cols-[1.2fr_3fr_auto] md:items-center">
      <div>
        {l.featured && <p className="mb-1 text-sm font-semibold text-[#8A5A00]">Editor&apos;s pick</p>}
        <h3 className="font-display text-xl text-[#14211C]">{l.name}</h3>
        <p className="mt-1 text-sm text-[#4B5E56]">{l.note}</p>
      </div>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
        {stats.map(([k, v]) => (
          <div key={k}>
            <dt className="text-sm text-[#4B5E56]">{k}</dt>
            <dd className="font-semibold text-[#14211C]">{v}</dd>
          </div>
        ))}
      </dl>
      <a
        href={`/go/${l.id}?src=${l.category}`}
        rel="sponsored nofollow"
        className="rounded bg-[#1F6B4F] px-5 py-3 text-center font-semibold text-white hover:bg-[#17523C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F6B4F]"
      >
        Check rates
      </a>
    </article>
  );
}
