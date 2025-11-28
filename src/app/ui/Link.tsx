import { cn } from "@/app/lib/utils";
import { VariantProps } from "class-variance-authority";
import NextLink, { type LinkProps } from "next/link";
import { buttonVariants } from "./Button";

type LinkComponentProps = LinkProps &
  VariantProps<typeof buttonVariants> & {
    className?: string;
    children: React.ReactNode;
  };

export function Link({
  children,
  className,
  variant = "ghost",
  size,
  ...props
}: LinkComponentProps) {
  return (
    <NextLink
      className={cn("", buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </NextLink>
  );
}
