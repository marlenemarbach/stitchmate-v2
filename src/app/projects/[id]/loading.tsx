import Link from "next/link";
import { List, Minus, Notebook, Plus, Repeat } from "lucide-react";
import { Header } from "@/app/components/Header";
import { Reminder } from "@/app/components/Reminder";
import { RowCounter } from "@/app/components/RowCounter";
import { SignOutButton } from "@/app/components/SignOutButton";
import { Button } from "@/app/components/ui/Button";
// import { ToggleGroup, ToggleGroupItem } from "@/app/components/ui/ToggleGroup";
import { Toolbar } from "@/app/components/ui/Toolbar";

export default function CounterPageSkeleton() {
  return (
    <>
      <Header className="top-0 border-b border-border">
        <Link href="/projects">
          <List />
        </Link>
        <SignOutButton className="col-start-3 justify-self-end" />
      </Header>

      <main className="relative mt-4 mb-8 flex flex-1 flex-col items-center justify-center gap-y-4 px-6">
        <div className="flex w-full flex-row justify-between gap-4 sm:flex-col"></div>
        <div className="flex flex-col gap-6">
          <Reminder />
          {/* <RowCounter project={}/> */}
        </div>
        <Toolbar className="col-span-2 mt-auto pr-2">
          <Button variant="ghost" size="small" className="w-7" disabled>
            <Repeat />
          </Button>
          <Button variant="ghost" size="icon" className="w-7" disabled>
            <Notebook />
          </Button>
        </Toolbar>
      </main>
    </>
  );
}
