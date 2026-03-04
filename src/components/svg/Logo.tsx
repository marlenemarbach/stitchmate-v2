import { cn } from "@/lib/utils";

export function Logo({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      className={cn("text-foreground", className)}
      width="20"
      height="28"
      viewBox="0 0 20 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 1.00201C0 0.10291 1.09409 -0.339453 1.71899 0.306989L9.28101 8.12977C9.67409 8.53641 10.3259 8.53641 10.719 8.12977L18.281 0.306989C18.9059 -0.339453 20 0.102912 20 1.00201V17.1318C20 17.9188 19.6908 18.6742 19.139 19.2353L11.426 27.0786C10.6423 27.8755 9.35766 27.8755 8.57399 27.0786L0.860983 19.2353C0.309211 18.6742 0 17.9188 0 17.1318V1.00201Z"
        fill="currentColor"
      />
    </svg>
  );
}
