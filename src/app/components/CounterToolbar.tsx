"use client";

import { use, useState } from "react";
import { Notebook, Repeat } from "lucide-react";
import useMeasure from "react-use-measure";
import { ProjectWithSubCounter } from "@/lib/types";
import { CountDirectionToggle } from "./CountDirectionToggle";
import { CounterNotes } from "./CounterNotes";
import { SubCounterMenu } from "./SubCounterDialog";
import { Button } from "./ui/Button";
import { Toolbar, ToolbarMenu, ToolbarMenuContent } from "./ui/Toolbar";

type MenuContent = "subcounter" | "notes";

export function CounterToolbar({
  project,
}: {
  project: Promise<ProjectWithSubCounter>;
}) {
  const currentProject = use(project);
  const [showMenu, setShowMenu] = useState(true);
  const [menuContent, setMenuContent] = useState<MenuContent>("subcounter");

  const [ref, bounds] = useMeasure({ offsetSize: true });

  function handleMenu(content: MenuContent) {
    if (showMenu && content === menuContent) setShowMenu(false);
    if (!showMenu) setShowMenu(true);
    if (menuContent !== content) setMenuContent(content);
  }

  return (
    <Toolbar className="mt-auto w-max pr-2" aria-label="row counter settings">
      <CountDirectionToggle project={currentProject} />
      <div className="flex">
        <Button onClick={() => handleMenu("subcounter")}>
          <Repeat />
        </Button>
        <Button onClick={() => handleMenu("notes")}>
          <Notebook />
        </Button>
      </div>
      <ToolbarMenu open={showMenu} boundingHeight={bounds.height}>
        <div ref={ref}>
          {menuContent === "subcounter" ? (
            <ToolbarMenuContent key="subcounter">
              <SubCounterMenu project={currentProject} />
            </ToolbarMenuContent>
          ) : (
            <ToolbarMenuContent key="notes">
              <CounterNotes />
            </ToolbarMenuContent>
          )}
        </div>
      </ToolbarMenu>
    </Toolbar>
  );
}
