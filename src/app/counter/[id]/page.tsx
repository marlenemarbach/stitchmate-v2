"use client";

import {
  ActiveReminder,
  ActiveReminderCount,
} from "../../components/ActiveReminder";
import { RowCounter } from "../../components/RowCounter";
import { Toolbar } from "../../ui/Toolbar";
import { CountDirectionToggle } from "../../components/CountDirectionToggle";
import { ReminderSelection } from "../../components/ReminderSelection";
import { NeedleSelector } from "../../components/NeedleSelector";
import { Header } from "../../components/Header";
import { Bars, EllipsisVertical } from "../../ui/Icons";

export default function Counter({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <>
      <Header className="border-b border-foreground/15">
        <Bars />
        <p className="place-self-center text-center">Tupa Socks</p>
        <div className="flex gap-4">
          <EllipsisVertical />
        </div>
      </Header>
      <main className="mt-4 mb-8 grid flex-1 grid-cols-2 grid-rows-[min-content_min-content_1fr_min-content] gap-y-4 px-6">
        <h1 className="text-2xl">Cuff</h1>
        <p className="align-self-baseline text-right">60 sts</p>
        <NeedleSelector />
        <ActiveReminder>
          <ActiveReminderCount />
        </ActiveReminder>
        <div className="col-span-2 row-start-3 place-content-center">
          <RowCounter />
        </div>
        <Toolbar
          className="col-span-2 justify-self-center pr-2"
          aria-label="row counter toolbar"
        >
          <CountDirectionToggle />
          <ReminderSelection />
        </Toolbar>
      </main>
    </>
  );
}
