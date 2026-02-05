"use server";

import { redirect } from "next/navigation";
import { CountProvider } from "@/contexts/CountContext";
import { CountDirectionProvider } from "@/contexts/CountDirectionContext";
import { getCurrentUser, getProjectById } from "@/lib/dal";
import { CountDirection } from "@/lib/types";
import { CountDirectionToggle } from "./CountDirectionToggle";
import { Counter } from "./Counter";
import { CounterMenu } from "./CounterMenu";
import { SubCounter } from "./SubCounter";
import { Toolbar } from "./ui/Toolbar";

export async function CounterWithToolbar(props: {
  urlParams: Promise<{ id: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const urlParams = await props.urlParams;
  const project = await getProjectById(parseInt(urlParams.id), user.id);

  return (
    <>
      <h1 className="text-xl font-medium text-balance">{project.name}</h1>
      <CountDirectionProvider
        initialDirection={project.direction as CountDirection}
      >
        <div className="relative mt-[16vh] place-self-center">
          <CountProvider count={project.count}>
            <SubCounter
              className="absolute top-0 right-0 translate-x-[75%] -translate-y-[80%]"
              subCounter={project.subCounter}
            />
            <Counter project={project} />
          </CountProvider>
        </div>
        <Toolbar
          className="absolute bottom-8 left-1/2 mt-auto -translate-x-1/2"
          aria-label="Counter settings"
          loop
        >
          <CountDirectionToggle projectId={project.id} />
          <CounterMenu project={project} />
        </Toolbar>
      </CountDirectionProvider>
    </>
  );
}
