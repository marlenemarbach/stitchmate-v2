import { type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";
import NextLink, { type LinkProps } from "next/link";
import { buttonVariants } from "./Button";

type LinkComponentProps = LinkProps &
  VariantProps<typeof buttonVariants> & {
    children: React.ReactNode;
    className?: string;
  };

export function Link({
  variant,
  size,
  children,
  className,
  ...props
}: LinkComponentProps) {
  return (
    <NextLink
      className={cn(
        buttonVariants({ variant, size }),
        "text-foreground-muted hover:text-foreground transition-color duration-250 ease-out",
        className,
      )}
      {...props}
    >
      {children}
    </NextLink>
  );
}
