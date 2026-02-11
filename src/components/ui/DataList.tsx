import { cn } from "../../lib/utils";

export function DataList({
  children,
  className,
}: React.PropsWithChildren & { className?: string }) {
  return (
    <div className={cn("grid w-screen max-w-3xl", className)}>{children}</div>
  );
}

export function DataListHeader({
  children,
  className,
}: React.PropsWithChildren & { className?: string }) {
  return (
    <>
      <div
        className={cn(
          "fixed z-1 mx-auto flex h-34 w-screen max-w-3xl flex-col items-start gap-6 bg-background mask-b-from-78% mask-b-to-90% pt-2 sm:h-41 sm:pt-8",
          className,
        )}
      >
        {children}
      </div>
    </>
  );
}

export function DataColumnHeader({
  children,
  className,
}: React.PropsWithChildren & { className?: string }) {
  return (
    <>
      <div className={cn("w-full border-b border-border", className)}>
        {children}
      </div>
    </>
  );
}

export function DataListContent({
  children,
  className,
}: React.PropsWithChildren & { className?: string }) {
  return (
    <div className={cn("mt-6 grid w-full sm:gap-1", className)}>{children}</div>
  );
}

export function DataListItem({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "grid min-h-11 grid-cols-6 items-center gap-2 border-b border-border/50 px-4 py-3 focus-within:bg-foreground/3 hover:bg-foreground/3 sm:rounded-full sm:border-none sm:py-2",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
