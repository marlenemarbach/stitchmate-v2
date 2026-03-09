import { cn } from "@/lib/utils";

export async function Footer() {
  return (
    <footer className={cn("mx-auto mt-auto pt-5 pb-6 text-xs")}>
      <p className="flex gap-1 text-muted-foreground/70">
        by
        <a
          className="ease transition-colors duration-150 outline-none hover:text-muted-foreground focus-visible:text-muted-foreground"
          href="mailto:m.marbach.me@gmail.com"
        >
          Marlene Marbach
        </a>
      </p>
    </footer>
  );
}
