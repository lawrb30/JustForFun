import type { Metadata } from "next";
import { Newsreader, Public_Sans } from "next/font/google";
import Nav from "@/components/Nav";
import "./globals.css";

const display = Newsreader({ subsets: ["latin"], variable: "--font-newsreader" });
const body = Public_Sans({ subsets: ["latin"], variable: "--font-public-sans" });

export const metadata: Metadata = {
    title: { default: "Loan comparison", template: "%s | Loan comparison" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${display.variable} ${body.variable}`}>
        <body className="bg-[#F1F5F3] font-body text-[#14211C] antialiased">
        <Nav />
        {children}
        <footer className="mx-auto mt-16 max-w-5xl border-t border-[#C9D5CF] px-4 py-8 text-sm text-[#4B5E56]">
            <p>
                <strong>Advertiser disclosure:</strong> We earn compensation from some lenders when you
                click through and are approved. We are not a lender and do not make credit decisions.
            </p>
            <p className="mt-2">Add your Privacy Policy and Terms links here.</p>
        </footer>
        </body>
        </html>
    );
}