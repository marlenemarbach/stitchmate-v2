"use client";

import { useState } from "react";
import { Asterisk, NotepadText } from "lucide-react";
import { ProjectWithSubCounter } from "@/lib/types";
import { CounterNotes } from "./CounterNotes";
import { SubCounterMenu } from "./SubCounterMenu";
import { ToolbarButton } from "./ui/Toolbar";
import { ToolbarMenu } from "./ui/ToolbarMenu";

type MenuContent = "subcounter" | "notes";

export function CounterMenu({ project }: { project: ProjectWithSubCounter }) {
  const [showMenu, setShowMenu] = useState(false);
  const [menuContent, setMenuContent] = useState<MenuContent>("subcounter");

  function handleMenu(contentId: MenuContent) {
    if (showMenu && contentId === menuContent) setShowMenu(false);
    if (!showMenu) setShowMenu(true);
    if (menuContent !== contentId) setMenuContent(contentId);
  }

  return (
    <>
      <div className="flex gap-1 pr-1">
        <ToolbarButton
          onClick={() => handleMenu("subcounter")}
          className="size-10 data-[state=open]:bg-foreground/10"
          data-state={menuContent === "subcounter" ? "open" : "closed"}
          aria-haspopup
          aria-expanded={menuContent === "subcounter" ? "true" : "false"}
        >
          <span className="sr-only">Subcounter</span>
          <Asterisk />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => handleMenu("notes")}
          className="size-10 data-[state=open]:bg-foreground/10"
          data-state={menuContent === "notes" ? "open" : "closed"}
          aria-haspopup
          aria-expanded={menuContent === "notes" ? "true" : "false"}
        >
          <span className="sr-only">Notes</span>
          <NotepadText />
        </ToolbarButton>
      </div>
      <ToolbarMenu open={showMenu}>
        {menuContent === "subcounter" ? (
          <SubCounterMenu key="subcounter" project={project} />
        ) : (
          <CounterNotes key="notes" />
        )}
      </ToolbarMenu>
    </>
  );
}
