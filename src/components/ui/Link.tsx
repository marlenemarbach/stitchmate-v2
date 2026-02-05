import NextLink from "next/link";
import { cn } from "@/lib/utils";

export function Link({
  children,
  className,
  href,
  ...props
}: React.ComponentPropsWithoutRef<typeof NextLink>) {
  return (
    <NextLink
      className={cn(
        "cursor-default rounded text-neutral-600 decoration-neutral-400 decoration-[1.5px] underline-offset-2 hover:underline focus-visible:underline focus-visible:outline-none dark:text-neutral-300 dark:decoration-muted-foreground/60",
        className,
      )}
      href={href}
      {...props}
    >
      {children}
    </NextLink>
  );
}
