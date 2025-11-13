export function Footer({ children }: React.PropsWithChildren) {
  return (
    <footer className="text-center text-xs text-foreground-muted">
      {children}
      <p>
        {"created by "}
        <a
          className="transition-color cursor-pointer duration-250 ease-out hover:text-foreground"
          href="https://www.instagram.com/crafty_stitchess/"
          target="_blank"
        >
          @crafty_stitchess
        </a>
      </p>
    </footer>
  );
}
