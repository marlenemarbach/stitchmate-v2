import { and, eq, inArray, lt } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";

export async function cleanupGuestUsers(maxAge: number) {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - maxAge);
  const cutoffTimestamp = cutoffDate
    .toISOString()
    .replace("T", " ")
    .split(".")[0];

  console.log(
    `[Cleanup] Finding guests older than ${maxAge} days (before ${cutoffTimestamp})`,
  );

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

  await db.delete(users).where(inArray(users.id, userIds));

  console.log(
    `[Cleanup] Successfully cleaned up ${staleGuests.length} guest accounts`,
  );
}
