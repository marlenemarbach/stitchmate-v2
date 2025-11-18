import { CountDirectionToggle } from "./components/CountDirectionToggle";
import { Header } from "./components/Header";
import { NeedleSelector } from "./components/NeedleSelector";
import { Reminder } from "./components/Reminder";
import { ReminderToggleGroup } from "./components/ReminderToggleGroup";
import { RowCounter } from "./components/RowCounter";
import { UserMenu } from "./components/UserMenu";
import { Bars } from "./ui/Icons";
import { Toolbar } from "./ui/Toolbar";

export default function Home() {
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
