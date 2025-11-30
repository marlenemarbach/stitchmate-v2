import { cn } from "../lib/utils";

export function Footer({
  children,
}: React.PropsWithChildren & { className?: string }) {
  const date = new Date();

  return (
    <footer
      className={cn(
        "flex flex-col gap-3 pb-6 mt-6 text-center text-sm text-muted-foreground",
      )}
    >
      {children}
      <p>
        {`stitchmate ${date.getFullYear()} by `}
        <a
          className="outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-all rounded-md cursor-pointer duration-250 ease-out hover:text-foreground/90"
          href="https://www.instagram.com/crafty_stitchess/"
          target="_blank"
        >
          @crafty_stitchess
        </a>
      </p>
    </footer>
  );
}
