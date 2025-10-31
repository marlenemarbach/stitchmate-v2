import { Link } from "../ui/Link";
import { Header } from "../components/Header";

export default function UserLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Header>
        <p className="m-auto text-sm">stitchmate</p>
      </Header>
      <main className="flex-1 flex flex-col gap-8 justify-center items-center mt-5 sm:mt-8 sm:mb-16">
        {children}
      </main>
      <footer className="text-foreground-muted text-center text-xs">
        <div className="flex gap-8 w-fit mx-auto">
          <Link variant="ghost" size="small" href="/privacy">
            Privacy
          </Link>
          <Link variant="ghost" size="small" href="/contact">
            Contact
          </Link>
        </div>
        <p>
          {"created by "}
          <a
            className="transition-color ease-out duration-250 cursor-pointer hover:text-foreground"
            href="https://www.instagram.com/crafty_stitchess/"
            target="_blank"
          >
            @crafty_stitchess
          </a>
        </p>
      </footer>
    </>
  );
}
