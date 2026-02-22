import { cleanupGuestUsers } from "@/lib/cleanupGuests";

const GUEST_MAX_AGE_DAYS = parseInt(process.env.GUEST_MAX_AGE_DAYS || "7", 10);

try {
  await cleanupGuestUsers(GUEST_MAX_AGE_DAYS);
} catch (err) {
  console.error("[Cleanup] Failed:", err);
  process.exit(1);
}
