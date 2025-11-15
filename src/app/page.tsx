import { Reminder } from "./components/Reminder";
import { RowCounter } from "./components/RowCounter";
import { Toolbar } from "./ui/Toolbar";
import { CountDirectionToggle } from "./components/CountDirectionToggle";
import { ReminderToggleGroup } from "./components/ReminderToggleGroup";
import { NeedleSelector } from "./components/NeedleSelector";
import { Header } from "./components/Header";
import { Bars } from "./ui/Icons";
import { UserMenu } from "./components/UserMenu";

export default function Home() {
  return (
    <>
      <Header>
        <Bars />
        <h1 className="font-serif text-lg dark:text-white">Tupa Socks</h1>
        <UserMenu />
      </Header>
      <main className="mt-4 mb-8 flex flex-1 flex-col items-center justify-between gap-y-4 px-6">
        <div className="flex w-full justify-between">
          <h1 className="text-2xl">Cuff</h1>
          <NeedleSelector />
        </div>
        <div className="col-span-2 row-start-3 place-content-center">
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
