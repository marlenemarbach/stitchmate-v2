import { cn } from "@/lib/utils";

export function Form({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  return (
    <form className={cn("flex w-full flex-col gap-6", className)} {...props}>
      {children}
    </form>
  );
}

export function FormField({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-3 [&_label]:pl-1", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function FormError({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"p">) {
  return (
    <p className={cn("text-sm text-destructive", className)} {...props}>
      {children}
    </p>
  );
}
