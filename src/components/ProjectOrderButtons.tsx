"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Order, OrderButton } from "./ui/OrderButton";

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

    const orderParams = ["statusOrder", "updatedOrder", "nameOrder"].filter(
      (p) => p !== param,
    );
    orderParams.forEach((p) => params.delete(p));

    params.set("page", "1");
    params.set(param, currentValue === "asc" ? "desc" : "asc");
    replace(`${pathName}?${params.toString()}`);
  }

  return (
    <>
      <OrderButton
        className="ml-1"
        order={nameOrder}
        onOrderChange={() => toggleOrder("nameOrder")}
        aria-label={nameOrder === undefined ? "Order by Name" : nameOrder}
      >
        Name
      </OrderButton>

      <OrderButton
        className="sm:-translate-x-[6px]"
        order={statusOrder}
        onOrderChange={() => toggleOrder("statusOrder")}
        aria-label={statusOrder === undefined ? "Order by Status" : statusOrder}
      >
        Status
      </OrderButton>

      <OrderButton
        className="sm:-translate-x-2"
        order={updatedOrder}
        defaultOrder="asc"
        onOrderChange={() => toggleOrder("updatedOrder")}
        aria-label={updatedOrder === undefined ? "Order by Date" : updatedOrder}
      >
        Last knit
      </OrderButton>
    </>
  );
}
