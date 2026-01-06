"use client";

import { use } from "react";
import { Project } from "../lib/types";

export function CounterPageTitle({
  project,
}: {
  project: Promise<Project | null>;
}) {
  const currentProject = use(project);

  return <h1 className="justify-self-center">{currentProject?.name}</h1>;
}
