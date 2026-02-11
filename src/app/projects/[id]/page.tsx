import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { CounterWithToolbar } from "@/components/CounterWithToolbar";
import { Header } from "@/components/Header";
import { SignOutButton } from "@/components/SignOutButton";

export default async function Project({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <>
      <Header className="flex justify-between border-b border-border">
        <Link
          href="/projects"
          className="flex items-center justify-center gap-1 rounded-full p-1 pr-3 hover:bg-foreground/5"
        >
          <ChevronLeft className="size-5" />
          Projects
        </Link>
        <SignOutButton />
      </Header>
      <main className="grid px-6 pt-4">
        <CounterWithToolbar urlParams={params} />
      </main>
    </>
  );
}
