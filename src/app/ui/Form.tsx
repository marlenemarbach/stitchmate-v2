export function Form({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  return (
    <form className="grid gap-6 w-full" {...props}>
      {children}
    </form>
  );
}
