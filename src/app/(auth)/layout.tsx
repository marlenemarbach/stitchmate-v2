import { Footer } from "@/components/Footer";

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <div className="grid flex-1 place-content-center">{children}</div>
      <Footer />
    </>
  );
}
