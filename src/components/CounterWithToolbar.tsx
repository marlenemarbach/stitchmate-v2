"use client";

import { use } from "react";
import { CountDirectionProvider } from "@/contexts/CountDirectionContext";
import { SubCounterProvider } from "@/contexts/SubCounterContext";
import { CountDirection, ProjectWithSubCounter } from "@/lib/types";
import { CountDirectionToggle } from "./CountDirectionToggle";
import { Counter } from "./Counter";
import { CounterMenu } from "./CounterMenu";
import { SubCounter } from "./SubCounter";
import { Toolbar } from "./ui/Toolbar";

export function CounterWithToolbar({
  project,
}: {
  project: Promise<ProjectWithSubCounter>;
}) {
  const currentProject = use(project);

  return (
    <SubCounterProvider
      initialState={{
        count: currentProject.count,
        state: currentProject.subCounter.active ? "on" : "off",
      }}
    >
      <CountDirectionProvider
        initialDirection={currentProject.direction as CountDirection}
      >
        <div>
          <SubCounter
            className="-translate-x-18 translate-y-8"
            subCounter={currentProject.subCounter}
          />
          <Counter project={currentProject} />
        </div>
        <Toolbar className="mt-auto" aria-label="Counter settings" loop>
          <CountDirectionToggle projectId={currentProject.id} />
          <CounterMenu project={currentProject} />
        </Toolbar>
      </CountDirectionProvider>
    </SubCounterProvider>
  );
}
