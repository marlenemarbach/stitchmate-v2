export default function UserLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <header>
        <h1 className="flex h-20 items-center justify-center font-serif text-lg font-medium tracking-wide">
          stitchmate
        </h1>
      </header>
      <main className="flex flex-1 flex-col items-center gap-8">
        {children}
      </main>
    </>
  );
}
