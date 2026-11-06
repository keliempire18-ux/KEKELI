import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Webhook Sanity : https://votre-site.vercel.app/api/revalidate?secret=...
export async function POST(req: NextRequest) {
  if (req.nextUrl.searchParams.get("secret") !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  revalidateTag("products");
  return NextResponse.json({ ok: true });
}
