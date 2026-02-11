"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { OrderButton } from "./ui/OrderButton";

export function ProjectOrderButtons() {
  const searchParams = useSearchParams();

  const statusOrder = searchParams.get("statusOrder");
  const updatedOrder = searchParams.get("updatedOrder");
  const nameOrder = searchParams.get("nameOrder");

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
    <div className="grid grid-cols-4 items-start gap-2 px-4 sm:grid-cols-6">
      <OrderButton
        order={nameOrder}
        className="sm:col-span-3"
        onClick={() => toggleOrder("nameOrder")}
      >
        Name
      </OrderButton>

      <OrderButton
        order={statusOrder}
        onClick={() => toggleOrder("statusOrder")}
      >
        Status
      </OrderButton>

      <OrderButton
        order={updatedOrder ?? "desc"}
        onClick={() => toggleOrder("updatedOrder")}
      >
        Last knit
      </OrderButton>
    </div>
  );
}
