"use client";

import Link from "next/link";
import { type Project } from "@/lib/types";
import { calculateTimeSince } from "@/lib/utils";
import { ProjectListMenu } from "./ProjectListMenu";
import { StatusBadge } from "./StatusBadge";
import { DataListItem } from "./ui/DataList";

export function ProjectListItem({ project }: { project: Project }) {
  return (
    <DataListItem className="data-[state=active]:bg-foreground/5">
      <Link
        href={`/projects/${project.id}`}
        className="col-span-5 grid grid-cols-subgrid gap-1 sm:gap-2"
      >
        <h3 className="col-span-5 font-medium sm:col-span-3">{project.name}</h3>
        <div className="col-span-5 flex gap-2 sm:col-span-2 sm:grid sm:grid-cols-subgrid">
          <StatusBadge status={project.status} />
          <p className="text-sm text-muted-foreground">
            {calculateTimeSince(project.updatedAt)}
          </p>
        </div>
      </Link>
      <ProjectListMenu project={project} />
    </DataListItem>
  );
}
