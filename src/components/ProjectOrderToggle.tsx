"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CalendarArrowDown, CalendarArrowUp } from "lucide-react";
import { ProjectOrder } from "@/lib/types";
import { Button } from "./ui/Button";

export function ProjectOrderToggle({ order }: { order: string }) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  function toggleOrder() {
    const params = new URLSearchParams(searchParams);

    if (!order || order === "desc") {
      params.set("order", "asc");
    } else {
      params.set("order", "desc");
    }

    replace(`${pathName}?${params.toString()}`);
  }

  return (
    <Button
      className="row-start-2 sm:row-start-1"
      variant="ghost"
      size="icon"
      onClick={() => toggleOrder()}
    >
      {order === "desc" ? (
        <CalendarArrowDown className="size-4" />
      ) : (
        <CalendarArrowUp className="size-4" />
      )}
    </Button>
  );
}
