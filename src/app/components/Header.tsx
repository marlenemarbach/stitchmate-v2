export function Header({ children }: React.PropsWithChildren) {
  return (
    <header className="flex justify-between items-center">{children}</header>
  );
}
