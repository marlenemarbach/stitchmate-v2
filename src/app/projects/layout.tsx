import { GuestUserToast } from "@/components/GuestUserToast";

export default function ProjectLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      {children}
      <GuestUserToast />
    </>
  );
}
