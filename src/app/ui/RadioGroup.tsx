import { cn } from "../lib/utils";

export function RadioGroup({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      role="radiogroup"
      className={cn("flex items-center justify-center gap-2", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function RadioButton({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"input">) {
  return (
    <label
      className={cn(
        "flex has-checked:bg-primary data[-state=inactive]:bg-blue hover:bg-foreground/20 justify-center items-center rounded-full  border border-transparent py-1 px-2 h-7 text-sm",
        className,
      )}
    >
      <input className="appearance-none" type="radio" {...props} />
      {children}
    </label>
  );
}
