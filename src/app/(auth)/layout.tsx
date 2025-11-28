import { Footer } from "../components/Footer";
import { Link } from "../ui/Link";

export default function UserLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <header>
        <h1 className="text-lg font-serif font-medium tracking-wide h-20 flex items-center justify-center">
          stitchmate
        </h1>
      </header>
      <main className="flex flex-1 flex-col items-center gap-8">
        {children}
      </main>
      <Footer>
        <div className="mx-auto flex w-fit gap-6">
          <Link size="fit" href="/privacy">
            Privacy
          </Link>
          <Link size="fit" href="/contact">
            Contact
          </Link>
        </div>
      </Footer>
    </>
  );
}
