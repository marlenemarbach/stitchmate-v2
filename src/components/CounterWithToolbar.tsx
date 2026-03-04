"use server";

import { CountProvider } from "@/contexts/CountContext";
import { CountDirectionProvider } from "@/contexts/CountDirectionContext";
import { CountDirection, ProjectWithSubCounter } from "@/lib/types";
import { Counter } from "./Counter";
import { CounterMenu } from "./CounterMenu";
import { SubCounter } from "./SubCounter";

export async function CounterWithToolbar({
  project,
}: {
  project: ProjectWithSubCounter;
}) {
  return (
    <>
      <CountDirectionProvider
        initialDirection={project.direction as CountDirection}
      >
        <CountProvider count={project.count}>
          <div className="relative mt-[16vh] place-self-center">
            <SubCounter
              className="absolute top-0 right-0 translate-x-[75%] -translate-y-[80%]"
              subCounter={project.subCounter}
            />
            <Counter project={project} />
          </div>
          <CounterMenu project={project} />
        </CountProvider>
      </CountDirectionProvider>
    </>
  );
}
