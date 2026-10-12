"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CATEGORIES } from "@/lib/loans";

export default function Nav() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    // Close the menu after navigating, and on Escape
    useEffect(() => setOpen(false), [pathname]);
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    return (
        <header className="sticky top-0 z-20 border-b border-[#C9D5CF] bg-[#F1F5F3]/95 backdrop-blur">
            <nav className="relative mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
                <Link href="/" className="font-display text-xl font-semibold">
                    Loan comparison
                </Link>

                <div className="flex items-center gap-5 text-sm">
                    <Link href="/#how-it-works" className="hidden text-[#33463E] hover:underline sm:inline">
                        How it works
                    </Link>
                    <button
                        type="button"
                        aria-expanded={open}
                        aria-controls="loan-menu"
                        onClick={() => setOpen((o) => !o)}
                        className="rounded border border-[#1F6B4F] px-4 py-2 font-semibold text-[#1F6B4F] hover:bg-[#1F6B4F] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F6B4F]"
                    >
                        Loan types {open ? "▴" : "▾"}
                    </button>
                </div>

                {open && (
                    <ul
                        id="loan-menu"
                        className="absolute right-4 top-full mt-2 w-[min(22rem,calc(100vw-2rem))] divide-y divide-[#E1E9E5] rounded-md border border-[#C9D5CF] bg-white shadow-lg"
                    >
                        {CATEGORIES.map((c) => (
                            <li key={c.slug}>
                                <Link
                                    href={`/loans/${c.slug}`}
                                    className="block px-4 py-3 hover:bg-[#F1F5F3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1F6B4F]"
                                >
                                    <span className="block font-semibold text-[#14211C]">{c.name}</span>
                                    <span className="block text-sm text-[#4B5E56]">
                    APR {c.apr[0]}% to {c.apr[1]}%
                  </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </nav>
        </header>
    );
}