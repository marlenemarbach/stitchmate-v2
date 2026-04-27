import { NextRequest, NextResponse } from "next/server";
import { cleanupGuestUsers } from "@/lib/cleanupGuests";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  await cleanupGuestUsers(7);
  return NextResponse.json({ ok: true });
}
