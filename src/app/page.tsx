import { CreateProject } from "./components/CreateProjects";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { ThemeSwitch } from "./components/ThemeSwitch";
import { UserMenu } from "./components/UserMenu";
import { Squares } from "./ui/Icons";

export default function Home() {
  return (
    <>
      <Header>
        <Squares />
        <h1 className="font-serif text-lg dark:text-white">Projects</h1>
        <div className="flex gap-3">
          <ThemeSwitch />
          <UserMenu />
        </div>
      </Header>
      <main className="relative mt-4 mb-8 flex flex-1 flex-col items-center justify-center gap-y-4 px-6">
        <p className="font-serif tracking-wide text-xl text-center">
          No projects yet.
          <br /> Create one and start crafting
        </p>
        <CreateProject />
      </main>
      <Footer />
    </>
  );
}
