import { cn } from "../lib/utils";

export function Form({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  return (
    <form className={cn("flex flex-col gap-3 w-full", className)} {...props}>
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
    <div className={cn("flex flex-col gap-3", className)} {...props}>
      {children}
    </div>
  );
}

export function FieldError({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn("text-destructive ml-1 -mt-1 h-6 text-sm", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function FormError({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn("text-center text-destructive h-6 text-sm", className)}
      {...props}
    >
      {children}
    </p>
  );
}
