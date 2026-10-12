import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { supabase } from "@/lib/supabase";

const AFFILIATE_URLS: Record<string, string> = {
  // "personal-loans-1": "https://network.example/click?aff=YOURID&offer=123",
};
const DEV_TEST_URL = "https://example.com/";

export async function GET(req: NextRequest, { params }: { params: Promise<{ lender: string }> }) {
  const { lender } = await params;
  const clickId = randomUUID();
  const sp = req.nextUrl.searchParams;

  const base =
      AFFILIATE_URLS[lender] ?? (process.env.NODE_ENV === "development" ? DEV_TEST_URL : undefined);

  // Save the click first. If the database is down, still send the visitor on.
  const { error } = await supabase.from("clicks").insert({
    click_id: clickId,
    lender_id: lender,
    category: sp.get("src"),
    source_page: req.headers.get("referer"),
    campaign: sp.get("cmp"),
    redirected: Boolean(base),
  });
  if (error) console.error("click insert failed:", error.message);

  if (!base) return NextResponse.redirect(new URL("/", req.url));

  const url = new URL(base);
  url.searchParams.set("subid", clickId); // use your network's parameter name
  return NextResponse.redirect(url, 302);
}