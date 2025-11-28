import { ComponentPropsWithoutRef } from "react";
import { cn } from "../lib/utils";

export function Squares({ ...props }: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
      />
    </svg>
  );
}

export function User({ ...props }: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
      />
    </svg>
  );
}

export function Check({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={3}
      stroke="currentColor"
      className={cn("size-6", className)}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 12.75 6 6 9-13.5"
      />
    </svg>
  );
}

export function Plus({ ...props }: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="size-6"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
}

export function Minus({ ...props }: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="size-6"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
    </svg>
  );
}

export function Increase({ ...props }: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className="size-6"
      {...props}
    >
      <path
        d="M16.25 18.75C16.6642 18.75 17 18.4142 17 18C17 17.5858 16.6642 17.25 16.25 17.25H7.75C7.33579 17.25 7 17.5858 7 18C7 18.4142 7.33579 18.75 7.75 18.75H16.25Z"
        fill="currentColor"
      />
      <path
        d="M18.25 12.75C18.6642 12.75 19 12.4142 19 12C19 11.5858 18.6642 11.25 18.25 11.25H5.75C5.33579 11.25 5 11.5858 5 12C5 12.4142 5.33579 12.75 5.75 12.75H18.25Z"
        fill="currentColor"
      />
      <path
        d="M20.25 6.75C20.6642 6.75 21 6.41421 21 6C21 5.58579 20.6642 5.25 20.25 5.25H3.75C3.33579 5.25 3 5.58579 3 6C3 6.41421 3.33579 6.75 3.75 6.75H20.25Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Decrease({ ...props }: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-6"
      {...props}
    >
      <path
        d="M16.25 5.25C16.6642 5.25 17 5.58579 17 6C17 6.41421 16.6642 6.75 16.25 6.75H7.75C7.33579 6.75 7 6.41421 7 6C7 5.58579 7.33579 5.25 7.75 5.25H16.25Z"
        fill="currentColor"
      />
      <path
        d="M18.25 11.25C18.6642 11.25 19 11.5858 19 12C19 12.4142 18.6642 12.75 18.25 12.75H5.75C5.33579 12.75 5 12.4142 5 12C5 11.5858 5.33579 11.25 5.75 11.25H18.25Z"
        fill="currentColor"
      />
      <path
        d="M20.25 17.25C20.6642 17.25 21 17.5858 21 18C21 18.4142 20.6642 18.75 20.25 18.75H3.75C3.33579 18.75 3 18.4142 3 18C3 17.5858 3.33579 17.25 3.75 17.25H20.25Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ShortRows({ ...props }: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-6"
      {...props}
    >
      <path
        d="M19.8096 14.3926C20.1444 14.1498 20.613 14.2241 20.8564 14.5586C21.1 14.8935 21.0262 15.3628 20.6914 15.6064L20.6904 15.6074L20.6885 15.6084C20.6874 15.6092 20.686 15.6103 20.6846 15.6113C20.6817 15.6134 20.6781 15.6162 20.6738 15.6191C20.6654 15.6251 20.6545 15.6331 20.6406 15.6426C20.6127 15.6616 20.5732 15.6871 20.5234 15.7187C20.4239 15.7821 20.2807 15.8687 20.0938 15.9707C19.7192 16.175 19.1686 16.4413 18.4434 16.7051C16.9915 17.233 14.8426 17.75 12 17.75C9.15743 17.75 7.00849 17.233 5.55664 16.7051C4.83137 16.4413 4.28076 16.175 3.90625 15.9707C3.71929 15.8687 3.57608 15.7821 3.47656 15.7187C3.42677 15.6871 3.38727 15.6616 3.35937 15.6426C3.34555 15.6331 3.33462 15.6251 3.32617 15.6191C3.32194 15.6162 3.3183 15.6134 3.31543 15.6113C3.31399 15.6103 3.31262 15.6092 3.31152 15.6084L3.31055 15.6074L3.30859 15.6064C2.9738 15.3628 2.89998 14.8935 3.14355 14.5586C3.38698 14.2242 3.85461 14.1509 4.18945 14.3936L4.19043 14.3926L4.28125 14.4531C4.35354 14.4991 4.4685 14.5689 4.625 14.6543C4.93792 14.825 5.41906 15.0588 6.06836 15.2949C7.36651 15.767 9.34288 16.25 12 16.25C14.6571 16.25 16.6335 15.767 17.9316 15.2949C18.5809 15.0588 19.0621 14.825 19.375 14.6543C19.5315 14.5689 19.6465 14.4991 19.7188 14.4531L19.8096 14.3926Z"
        fill="currentColor"
      />
      <path
        d="M4.19043 9.60742C3.85558 9.85023 3.38702 9.77591 3.14355 9.44141C2.89998 9.10649 2.9738 8.63723 3.30859 8.39356L3.30957 8.39258L3.31152 8.3916C3.31262 8.39081 3.31399 8.3897 3.31543 8.38867C3.3183 8.38662 3.32194 8.38384 3.32617 8.38086C3.33462 8.37491 3.34555 8.36685 3.35937 8.35742C3.38727 8.33841 3.42677 8.31294 3.47656 8.28125C3.57608 8.21793 3.71929 8.13128 3.90625 8.0293C4.28076 7.82502 4.83137 7.55866 5.55664 7.29492C7.00849 6.76704 9.15743 6.25 12 6.25C14.8426 6.25 16.9915 6.76703 18.4434 7.29492C19.1686 7.55866 19.7192 7.82502 20.0938 8.0293C20.2807 8.13128 20.4239 8.21793 20.5234 8.28125C20.5732 8.31293 20.6127 8.3384 20.6406 8.35742C20.6545 8.36685 20.6654 8.37491 20.6738 8.38086C20.6781 8.38384 20.6817 8.38662 20.6846 8.38867C20.686 8.3897 20.6874 8.39081 20.6885 8.3916L20.6895 8.39258L20.6914 8.39355C21.0262 8.63723 21.1 9.10649 20.8564 9.44141C20.613 9.77585 20.1454 9.8491 19.8105 9.60644L19.8096 9.60742L19.7188 9.54687C19.6465 9.50087 19.5315 9.43107 19.375 9.3457C19.0621 9.17504 18.5809 8.94121 17.9316 8.70508C16.6335 8.23302 14.6571 7.75 12 7.75C9.34288 7.75 7.36651 8.23303 6.06836 8.70508C5.41906 8.94122 4.93792 9.17504 4.625 9.3457C4.4685 9.43107 4.35354 9.50087 4.28125 9.54688L4.19043 9.60742Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Needles({ ...props }: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-6"
      {...props}
    >
      <path
        d="M9.5 20.3L7.04999 11.0126"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14.5 20.3L16.95 11.0126"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7 8.5C7 8.5 7 3.8 12 3.8C17 3.8 17 8.5 17 8.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ChevronDown({
  strokeWidth,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth ?? 1.5}
      stroke="currentColor"
      className={cn("size-6", className)}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export function ChevronUp({
  strokeWidth,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth ?? 1.5}
      stroke="currentColor"
      className={cn("size-6", className)}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 15.75 7.5-7.5 7.5 7.5"
      />
    </svg>
  );
}

export function Step({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-6", className)}
      {...props}
    >
      <path d="M16.7197 7.71978C17.0126 7.42689 17.4874 7.42689 17.7803 7.71978L21.5303 11.4698C21.5787 11.5182 21.616 11.5732 21.6484 11.6299C21.664 11.6571 21.6803 11.6838 21.6924 11.7129C21.7131 11.7629 21.7279 11.8146 21.7373 11.8672C21.745 11.9104 21.75 11.9547 21.75 12.0001C21.75 12.0448 21.7448 12.0883 21.7373 12.1309C21.7279 12.1839 21.7132 12.2358 21.6924 12.2862C21.6803 12.3154 21.6639 12.342 21.6484 12.3692C21.616 12.4261 21.5789 12.4817 21.5303 12.5303L17.7803 16.2803C17.4874 16.5732 17.0126 16.5732 16.7197 16.2803C16.4268 15.9874 16.4269 15.5127 16.7197 15.2198L19.1895 12.7501H4.81055L7.28027 15.2198C7.57314 15.5127 7.57316 15.9874 7.28027 16.2803C6.98739 16.5732 6.51261 16.5732 6.21973 16.2803L2.46973 12.5303C2.42101 12.4816 2.3831 12.4263 2.35059 12.3692C2.33511 12.342 2.31868 12.3153 2.30664 12.2862C2.28591 12.2359 2.27105 12.1838 2.26172 12.1309C2.25423 12.0884 2.25 12.0447 2.25 12.0001C2.25 11.9548 2.25402 11.9103 2.26172 11.8672C2.27081 11.8164 2.28505 11.7663 2.30469 11.7178L2.30859 11.7081C2.32018 11.6807 2.33596 11.6556 2.35059 11.6299C2.38303 11.5731 2.42121 11.5183 2.46973 11.4698L6.21973 7.71978C6.51262 7.42689 6.98738 7.42689 7.28027 7.71978C7.57314 8.01268 7.57316 8.48744 7.28027 8.78033L4.81055 11.2501H19.1895L16.7197 8.78033C16.4268 8.48744 16.4269 8.01268 16.7197 7.71978Z" />
    </svg>
  );
}

export function XCircle({
  className,
  ...props
}: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={cn("size-6", className)}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
}

export function EllipsisVertical({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={cn("size-6", className)}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
      />
    </svg>
  );
}

export function Moon({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={cn("size-6", className)}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
      />
    </svg>
  );
}

export function Bars({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={cn("size-6", className)}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
}
