"use client";

import { use } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Project } from "@/lib/types";
import { OrderButton } from "./OrderButton";

export function ProjectSort({ projects }: { projects: Promise<Project[]> }) {
  const searchParams = useSearchParams();

  const statusOrder = searchParams.get("statusOrder");
  const updatedOrder = searchParams.get("updatedOrder");
  const nameOrder = searchParams.get("nameOrder");

  const pathName = usePathname();
  const { replace } = useRouter();

  const currentProjects = use(projects);

  function toggleOrder(param: "statusOrder" | "updatedOrder" | "nameOrder") {
    const params = new URLSearchParams(searchParams);
    const currentValue = params.get(param);

    switch (param) {
      case "updatedOrder":
        params.delete("nameOrder");
        params.delete("statusOrder");
        break;
      case "statusOrder":
        params.delete("nameOrder");
        break;
      case "nameOrder":
        params.delete("statusOrder");
        params.delete("updatedOrder");
        break;
    }

    params.set(param, currentValue === "asc" ? "desc" : "asc");
    replace(`${pathName}?${params.toString()}`);
  }

  if (currentProjects.length) {
    return (
      <div className="flex w-full items-center gap-2 border-b border-border px-4 text-muted-foreground sm:mb-3 sm:grid sm:grid-cols-12 sm:px-0 sm:pb-2">
        <OrderButton
          className="sm:col-span-7 sm:-translate-x-3"
          order={nameOrder}
          onClick={() => toggleOrder("nameOrder")}
        >
          Name
        </OrderButton>

        <OrderButton
          className="sm:-translate-x-4"
          order={statusOrder}
          onClick={() => toggleOrder("statusOrder")}
        >
          Status
        </OrderButton>

        <OrderButton
          className="sm:-translate-x-4"
          order={updatedOrder}
          onClick={() => toggleOrder("updatedOrder")}
          defaultOrder={!nameOrder ? "desc" : undefined}
        >
          Last knit
        </OrderButton>
      </div>
    );
  }
}
