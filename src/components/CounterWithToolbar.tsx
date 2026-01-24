import { redirect } from "next/navigation";
import { CountDirectionProvider } from "@/contexts/CountDirectionContext";
import { SubCounterProvider } from "@/contexts/SubCounterContext";
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
      <SubCounterProvider
        initialState={{
          count: project.count,
          state: project.subCounter.active ? "on" : "off",
        }}
      >
        <CountDirectionProvider
          initialDirection={project.direction as CountDirection}
        >
          <div className="relative mt-24 place-self-center">
            <SubCounter
              className="-translate-x-18 translate-y-8"
              subCounter={project.subCounter}
            />
            <Counter project={project} />
          </div>
          <Toolbar
            className="absolute bottom-12 left-1/2 mt-auto -translate-x-1/2"
            aria-label="Counter settings"
            loop
          >
            <CountDirectionToggle projectId={project.id} />
            <CounterMenu project={project} />
          </Toolbar>
        </CountDirectionProvider>
      </SubCounterProvider>
    </>
  );
}
