import { cn } from "@/lib/utils";

export function FilterPill({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={cn(
        "transition-[color, border] flex h-8 cursor-pointer items-center gap-1 rounded-full bg-slate-900 py-1 pr-3 pl-2 text-sm duration-200 ease-out group-hover:opacity-50 hover:!opacity-100 disabled:!opacity-50 data-[state=inActive]:opacity-50 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
