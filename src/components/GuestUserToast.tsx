"use server";

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/dal";
import { GuestToast } from "./GuestToast";

export async function GuestUserToast() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return <GuestToast isGuest={user.role === "guest"} />;
}
