import { NextResponse } from "next/server";
import { cleanupGuestUsers } from "@/lib/cleanupGuests";

export async function GET() {
  await cleanupGuestUsers(7);
  return NextResponse.json({ ok: true });
}
