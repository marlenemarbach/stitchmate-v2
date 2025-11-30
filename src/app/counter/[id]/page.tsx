"use client";

import { CountDirectionToggle } from "@/app/components/CountDirectionToggle";
import { Header } from "@/app/components/Header";
import { NeedleSelector } from "@/app/components/NeedleSelector";
import { Reminder } from "@/app/components/Reminder";
import { ReminderToggleGroup } from "@/app/components/ReminderToggleGroup";
import { UserMenu } from "@/app/components/UserMenu";
import { RowCounter } from "../../components/RowCounter";
import { Bars } from "../../ui/Icons";
import { Toolbar } from "../../ui/Toolbar";

export default function Counter({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <>
      <Header>
        <Bars />
        <h1 className="font-serif text-lg dark:text-white">Tupa Socks</h1>
        <UserMenu />
      </Header>
      <main className="mt-4 mb-8 flex flex-1 flex-col items-center justify-between gap-y-4 px-6">
        <div className="flex w-full flex-row justify-between sm:flex-col gap-4">
          <h1 className="text-2xl">Cuff</h1>
          <NeedleSelector />
        </div>
        <div className="flex flex-col gap-6">
          <Reminder />
          <RowCounter />
        </div>
        <Toolbar
          className="col-span-2 justify-self-center pr-2"
          aria-label="row counter settings"
        >
          <CountDirectionToggle />
          <ReminderToggleGroup />
        </Toolbar>
      </main>
    </>
  );
}
