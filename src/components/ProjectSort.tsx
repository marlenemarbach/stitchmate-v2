"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "./ui/Button";

type Order = "asc" | "desc";

export function ProjectSort({
  updatedOrder,
  statusOrder,
}: {
  updatedOrder?: Order;
  statusOrder?: Order;
}) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  function toggleOrder(order: string) {
    const params = new URLSearchParams(searchParams);

    if (order === "updatedOrder") {
      if (!updatedOrder || updatedOrder === "desc") {
        params.set("updatedOrder", "asc");
      } else {
        params.set("updatedOrder", "desc");
      }
    }
    if (order === "statusOrder") {
      if (!statusOrder || statusOrder === "desc") {
        params.set("statusOrder", "asc");
      } else {
        params.set("statusOrder", "desc");
      }
    }
    replace(`${pathName}?${params.toString()}`);
  }

  return (
    <div className="grid w-full grid-cols-8 items-center px-4 pb-10 text-muted-foreground">
      <span className="col-span-5 text-sm">Name</span>
      <Button
        className="w-fit -translate-x-4 hover:text-foreground"
        size="small"
        variant="ghost"
        onClick={() => toggleOrder("statusOrder")}
      >
        Status
        {statusOrder === "desc" ? (
          <ArrowDown className="size-4" />
        ) : (
          <ArrowUp className="size-4" />
        )}
      </Button>

      <Button
        className="w-fit -translate-x-4 hover:text-foreground"
        size="small"
        variant="ghost"
        onClick={() => toggleOrder("updatedOrder")}
      >
        Last knit
        {updatedOrder === "desc" ? (
          <ArrowDown className="size-4" />
        ) : (
          <ArrowUp className="size-4" />
        )}
      </Button>
    </div>
  );
}
