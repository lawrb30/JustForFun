import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const STATUSES = ["pending", "approved", "paid", "reversed"];
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Example: /api/postback?secret=XXXX&click_id=...&txn=...&status=approved&payout=125.00
// Parameter names differ by network, so adjust to match their postback documentation.
export async function GET(req: NextRequest) {
    const sp = req.nextUrl.searchParams;
    if (sp.get("secret") !== process.env.POSTBACK_SECRET) {
        return NextResponse.json({ ok: false }, { status: 401 });
    }

    const clickId = sp.get("click_id") ?? "";
    const txn = sp.get("txn") ?? "";
    const status = sp.get("status") ?? "";
    const payout = Number(sp.get("payout"));

    if (!UUID.test(clickId) || !txn || !STATUSES.includes(status)) {
        return NextResponse.json({ ok: false, error: "bad params" }, { status: 400 });
    }

    const { error } = await supabase.from("conversions").upsert(
        {
            click_id: clickId,
            network_txn_id: txn,
            status,
            payout_cents: Number.isFinite(payout) ? Math.round(payout * 100) : null,
            updated_at: new Date().toISOString(),
            paid_at: status === "paid" ? new Date().toISOString() : null,
        },
        { onConflict: "network_txn_id" }
    );

    if (error) {
        console.error("postback failed:", error.message);
        return NextResponse.json({ ok: false }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
}