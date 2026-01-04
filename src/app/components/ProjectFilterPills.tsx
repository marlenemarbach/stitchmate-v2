"use client";

import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { Project } from "@/lib/types";
import { cn } from "@/lib/utils";
import { FilterPill } from "./ui/FilterPill";

export type ProjectFilter = "wip" | "finished" | "all";

type ProjectFilterPillsProps = {
  activeFilter: ProjectFilter;
  updateFilterAction: (filter: ProjectFilter) => void;
  projects: Project[];
  className?: string;
};

export function ProjectFilterPills({
  className,
  activeFilter,
  updateFilterAction,
  projects,
}: ProjectFilterPillsProps) {
  const finishedProjectsCount = getFinishedProjectsCount(projects);
  const wipCount = getWipCount(projects);

  return (
    <div className={cn("group flex gap-4", className)}>
      <FilterPill
        data-state={activeFilter === "all" ? "active" : "inActive"}
        onClick={() => updateFilterAction("all")}
        className="text-foreground-muted border border-foreground/50 bg-muted pl-3"
      >
        all ({projects.length})
      </FilterPill>
      {wipCount >= 1 && (
        <FilterPill
          data-state={activeFilter === "wip" ? "active" : "inActive"}
          disabled={wipCount === 0}
          onClick={() => updateFilterAction("wip")}
          className="border border-amber-200 bg-amber-500/20 text-amber-200"
        >
          <ArrowUpRight className="size-4" />
          wips ({wipCount})
        </FilterPill>
      )}
      {finishedProjectsCount >= 1 && (
        <FilterPill
          data-state={activeFilter === "finished" ? "active" : "inActive"}
          onClick={() => updateFilterAction("finished")}
          disabled={finishedProjectsCount === 0}
          className="border border-emerald-200 bg-emerald-200/10 text-emerald-200"
        >
          <BadgeCheck className="size-4" />
          finished ({finishedProjectsCount})
        </FilterPill>
      )}
    </div>
  );
}

function getWipCount(projects: Project[]) {
  return projects.filter((project) => project.status === "wip").length;
}

function getFinishedProjectsCount(projects: Project[]) {
  return projects.filter((project) => project.status === "finished").length;
}
