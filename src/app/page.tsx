import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

export default async function Home() {
  const session = getSession();
  if (!session) redirect("/auth");
  redirect("/projects");
}
