import { and, eq, inArray, lt } from "drizzle-orm";
import { db } from "./index";
import { users } from "./schema";

async function cleanupGuestUsers(maxAge: number) {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - maxAge);
  const cutoffTimestamp = cutoffDate
    .toISOString()
    .replace("T", " ")
    .split(".")[0];

  console.log(
    `[Cleanup] Finding guests older than ${maxAge} days (before ${cutoffTimestamp})`,
  );

  // 2. Find stale guest users
  const staleGuests = await db
    .select({ id: users.id })
    .from(users)
    .where(and(eq(users.role, "guest"), lt(users.createdAt, cutoffTimestamp)));

  if (staleGuests.length === 0) {
    console.log("[Cleanup] No stale guest users found");
    return;
  }

  const userIds = staleGuests.map((u) => u.id);
  console.log(`[Cleanup] Found ${staleGuests.length} guest users to delete`);

  // Delete users
  await db.delete(users).where(inArray(users.id, userIds));

  console.log(
    `[Cleanup] Successfully cleaned up ${staleGuests.length} guest accounts`,
  );
}

const GUEST_MAX_AGE_DAYS = parseInt(process.env.GUEST_MAX_AGE_DAYS || "7", 10);

// Run and handle errors
cleanupGuestUsers(GUEST_MAX_AGE_DAYS)
  .then(() => {
    console.log("[Cleanup] Done");
    process.exit(0);
  })
  .catch((err) => {
    console.error("[Cleanup] Failed:", err);
    process.exit(1);
  });
