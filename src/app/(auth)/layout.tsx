import { Link } from "../ui/Link";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function UserLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Header>
        <p className="m-auto text-sm">stitchmate</p>
      </Header>
      <main className="mt-5 flex flex-1 flex-col items-center justify-center gap-8 sm:mt-8 sm:mb-16">
        {children}
      </main>
      <Footer>
        <div className="mx-auto flex w-fit gap-8">
          <Link variant="ghost" size="small" href="/privacy">
            Privacy
          </Link>
          <Link variant="ghost" size="small" href="/contact">
            Contact
          </Link>
        </div>
      </Footer>
    </>
  );
}
