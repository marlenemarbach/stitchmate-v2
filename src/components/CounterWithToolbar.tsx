"use client";

import { use } from "react";
import { CountDirectionProvider } from "@/contexts/CountDirectionContext";
import { CounterContextProvider } from "@/contexts/SubCounterContext";
import { ProjectWithSubCounter } from "@/lib/types";
import { CountDirectionToggle } from "./CountDirectionToggle";
import { Counter } from "./Counter";
import { CounterToolbarMenuBar } from "./CounterToolbarMenuBar";
import { SubCounter } from "./SubCounter";
import { Toolbar } from "./ui/Toolbar";

export function CounterWithToolbar({
  project,
}: {
  project: Promise<ProjectWithSubCounter>;
}) {
  const currentProject = use(project);

  return (
    <>
      <CounterContextProvider
        initialState={{
          countDirection: currentProject.direction,
          count: currentProject.count,
          subCounterActive: currentProject.subCounter.active,
        }}
      >
        <CountDirectionProvider initialDirection={currentProject.direction}>
          <div className="flex h-24 items-center">
            <SubCounter subCounter={currentProject.subCounter} />
          </div>
          <div className="flex flex-col gap-6">
            <Counter project={project} />
          </div>
          <Toolbar
            className="place-self-center"
            aria-label="Counter settings"
            loop
          >
            <CountDirectionToggle projectId={currentProject.id} />
            <CounterToolbarMenuBar project={currentProject} />
          </Toolbar>
        </CountDirectionProvider>
      </CounterContextProvider>
    </>
  );
}
