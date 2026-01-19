"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "./ui/Button";

export function StatusOrderButton({
  statusOrder,
}: {
  statusOrder?: "asc" | "desc";
}) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  function toggleOrder() {
    const params = new URLSearchParams(searchParams);

    if (!statusOrder || statusOrder === "desc") {
      params.set("statusOrder", "asc");
    } else {
      params.set("statusOrder", "desc");
    }

    replace(`${pathName}?${params.toString()}`);
  }

  return (
    <Button
      className="w-fit -translate-x-2 rounded-lg px-2 py-1 text-sm hover:text-foreground"
      size="small"
      variant="ghost"
      onClick={() => toggleOrder()}
    >
      Status
      {statusOrder === "desc" ? (
        <ArrowDown className="size-4" />
      ) : (
        <ArrowUp className="size-4" />
      )}
    </Button>
  );
}
