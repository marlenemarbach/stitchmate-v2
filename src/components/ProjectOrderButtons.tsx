"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DataListColumnTitle, Order } from "./ui/DataList";

export function ProjectOrderButtons() {
  const searchParams = useSearchParams();

  const statusOrder = searchParams.get("statusOrder") as Order;
  const updatedOrder = searchParams.get("updatedOrder") as Order;
  const nameOrder = searchParams.get("nameOrder") as Order;

  const pathName = usePathname();
  const { replace } = useRouter();

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

  return (
    <>
      <DataListColumnTitle
        className="sm:col-span-3"
        isActive={nameOrder !== undefined}
        order={nameOrder}
        onOrderChange={() => toggleOrder("nameOrder")}
      >
        Name
      </DataListColumnTitle>

      <DataListColumnTitle
        isActive={statusOrder !== undefined}
        order={statusOrder}
        onOrderChange={() => toggleOrder("statusOrder")}
      >
        Status
      </DataListColumnTitle>

      <DataListColumnTitle
        isActive={updatedOrder !== undefined}
        order={updatedOrder ?? "desc"}
        onOrderChange={() => toggleOrder("updatedOrder")}
      >
        Last knit
      </DataListColumnTitle>
    </>
  );
}
