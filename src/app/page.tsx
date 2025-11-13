import { Reminder } from "./components/Reminder";
import { RowCounter } from "./components/RowCounter";
import { Toolbar } from "./ui/Toolbar";
import { CountDirectionToggle } from "./components/CountDirectionToggle";
import { ReminderSelection } from "./components/ReminderSelection";
import { NeedleSelector } from "./components/NeedleSelector";
import { Header } from "./components/Header";
import { Bars, Moon, User } from "./ui/Icons";
import { Menu, MenuContent, MenuTrigger } from "./ui/Menu";
import { Link } from "./ui/Link";

export default function Home() {
  return (
    <>
      <Header className="border-b border-foreground/15">
        <Bars />
        <p className="place-self-center text-sm">Tupa Socks</p>
        <div className="ml-auto flex w-fit items-center gap-4">
          <Moon />
          <Menu position="bottomRight">
            <MenuTrigger variant="ghost">
              <User />
            </MenuTrigger>
            <MenuContent>
              <ul>
                <li>
                  <Link href="/account" variant="ghost">
                    Account
                  </Link>
                </li>
                <li>
                  <Link href="/login" variant="ghost">
                    Logout
                  </Link>
                </li>
              </ul>
            </MenuContent>
          </Menu>
        </div>
      </Header>
      <main className="mt-4 mb-8 grid flex-1 grid-cols-2 grid-rows-[min-content_min-content_1fr_min-content] gap-y-4 px-6">
        <h1 className="text-2xl">Cuff</h1>
        <NeedleSelector />
        <Reminder />
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
