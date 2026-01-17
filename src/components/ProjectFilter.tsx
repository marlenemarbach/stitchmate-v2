"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { ProjectStatus } from "@/lib/types";
import { Button } from "./ui/Button";

export function ProjectFilter({ filter }: { filter: string }) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  function filterProjects(newFilter: ProjectStatus | "") {
    const params = new URLSearchParams(searchParams);

    if (filter === newFilter) return;

    if (!newFilter) params.delete("filter");
    else params.set("filter", newFilter);

    replace(`${pathName}?${params.toString()}`);
  }

  return (
    <>
      <Button
        className=""
        size="small"
        variant="secondary"
        data-state={!filter ? "active" : "inActive"}
        onClick={() => filterProjects("")}
      >
        all projects
      </Button>
      <Button
        className=""
        size="small"
        variant="secondary"
        data-state={filter === "wip" ? "active" : "inActive"}
        onClick={() => filterProjects("wip")}
      >
        <ArrowUpRight className="size-4" />
        wips
      </Button>
      <Button
        className=""
        size="small"
        variant="secondary"
        data-state={filter === "finished" ? "active" : "inActive"}
        onClick={() => filterProjects("finished")}
      >
        <BadgeCheck className="size-4" />
        finished
      </Button>
    </>
  );
}
