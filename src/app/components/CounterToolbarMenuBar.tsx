"use client";

import { use, useState } from "react";
import { Notebook, Repeat } from "lucide-react";
import { ProjectWithSubCounter } from "@/lib/types";
import { CounterNotes } from "./CounterNotes";
import { SubCounterMenu } from "./SubCounterMenu";
import { Button } from "./ui/Button";
import { ToolbarMenu, ToolbarMenuContent } from "./ui/ToolbarMenu";

type MenuContent = "subcounter" | "notes";

export function CounterToolbarMenuBar({
  project,
}: {
  project: Promise<ProjectWithSubCounter>;
}) {
  const currentProject = use(project);

  const [showMenu, setShowMenu] = useState(false);
  const [menuContent, setMenuContent] = useState<MenuContent>("subcounter");

  function handleMenu(contentId: MenuContent) {
    if (showMenu && contentId === menuContent) setShowMenu(false);
    if (!showMenu) setShowMenu(true);
    if (menuContent !== contentId) setMenuContent(contentId);
  }

  return (
    <>
      <div className="flex">
        <Button
          onClick={() => handleMenu("subcounter")}
          variant="ghost"
          size="icon"
          className="data-[state=open]:bg-foreground/10"
          data-state={menuContent === "subcounter" ? "open" : "closed"}
          aria-haspopup
          aria-expanded={menuContent === "subcounter" ? "true" : "false"}
        >
          <span className="sr-only">Subcounter</span>
          <Repeat />
        </Button>
        <Button
          onClick={() => handleMenu("notes")}
          variant="ghost"
          size="icon"
          className="data-[state=open]:bg-foreground/10"
          data-state={menuContent === "notes" ? "open" : "closed"}
          aria-haspopup
          aria-expanded={menuContent === "notes" ? "true" : "false"}
        >
          <span className="sr-only">Notes</span>
          <Notebook />
        </Button>
      </div>
      <ToolbarMenu open={showMenu}>
        {menuContent === "subcounter" ? (
          <ToolbarMenuContent key="subcounter">
            <SubCounterMenu project={currentProject} />
          </ToolbarMenuContent>
        ) : (
          <ToolbarMenuContent key="notes">
            <CounterNotes />
          </ToolbarMenuContent>
        )}
      </ToolbarMenu>
    </>
  );
}
