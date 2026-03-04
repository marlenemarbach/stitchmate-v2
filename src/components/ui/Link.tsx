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
        "cursor-default rounded text-neutral-600 focus-visible:text-foreground focus-visible:outline-none dark:text-neutral-300 hover:dark:text-foreground",
        className,
      )}
      href={href}
      {...props}
    >
      {children}
    </NextLink>
  );
}
