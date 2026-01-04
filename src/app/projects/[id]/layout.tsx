import { Suspense } from "react";
import { CounterStoreProvider } from "@/providers/CounterStoreProvider";
import CounterPageSkeleton from "./loading";

export default function CounterLayout({ children }: React.PropsWithChildren) {
  return <CounterStoreProvider>{children}</CounterStoreProvider>;
}
