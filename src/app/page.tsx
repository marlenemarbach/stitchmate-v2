import {
  ActiveReminder,
  ActiveReminderCount,
} from "./components/ActiveReminder";
import { RowCounter } from "./components/RowCounter";
import { Toolbar } from "./ui/Toolbar";
import { CountDirectionToggle } from "./components/CountDirectionToggle";
import { ReminderSelection } from "./components/ReminderSelection";
import { NeedleSelector } from "./components/NeedleSelector";

export default function Home() {
  return (
    <main className="flex-1 grid grid-cols-2 grid-rows-[min-content_min-content_1fr_min-content] gap-y-4 mt-4 mb-8">
      <h1 className="text-2xl">Tupa Socks / Cuff</h1>
      <p className="text-right align-self-baseline">60 sts</p>
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
  );
}
