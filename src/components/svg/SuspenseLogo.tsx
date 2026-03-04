export function SuspenseLogo({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      className={className}
      width="50"
      height="68"
      viewBox="0 0 70 95"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 2.505C0 0.286704 2.67435 -0.832731 4.25456 0.724125L33.2454 29.2866C34.2187 30.2454 35.7813 30.2454 36.7546 29.2866L65.7454 0.724127C67.3256 -0.832728 70 0.286702 70 2.505V60.0941C70 61.7188 69.3412 63.2739 68.1742 64.4042L37.7828 93.8374C36.2317 95.3396 33.7683 95.3396 32.2172 93.8374L1.82584 64.4042C0.658812 63.2739 0 61.7188 0 60.0941V2.505Z"
        fill="url(#paint0_linear_1047_2707)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1047_2707"
          x1="11.5741"
          y1="-23"
          x2="34.6023"
          y2="67.1236"
          gradientUnits="userSpaceOnUse"
        >
          <stop className="dark:[stop-color:var(--color-neutral-700)]" />
          <stop
            offset="1"
            className="dark:[stop-color:var(--color-neutral-800)]"
          />
        </linearGradient>
      </defs>
    </svg>
  );
}
