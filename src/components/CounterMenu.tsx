"use client";

import { useState } from "react";
import { Asterisk, NotepadText, Wrench } from "lucide-react";
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

  function handleOnCloseAutoFocus() {
    const currentTrigger = document.getElementById(menuContent);
    currentTrigger?.focus();
  }

  return (
    <>
      <ToolbarButton
        id={"subcounter"}
        onClick={() => handleMenu("subcounter")}
        className="ml-1 data-[state=open]:bg-foreground/10"
        data-state={
          showMenu && menuContent === "subcounter" ? "open" : "closed"
        }
        aria-haspopup
        aria-expanded={menuContent === "subcounter" ? "true" : "false"}
      >
        <span className="sr-only">Subcounter</span>
        <Asterisk />
      </ToolbarButton>
      <ToolbarButton
        id={"notes"}
        onClick={() => handleMenu("notes")}
        className="data-[state=open]:bg-foreground/10"
        data-state={showMenu && menuContent === "notes" ? "open" : "closed"}
        aria-haspopup
        aria-expanded={menuContent === "notes" ? "true" : "false"}
      >
        <span className="sr-only">Notes</span>
        <NotepadText />
      </ToolbarButton>
      <ToolbarButton
        id={"settings"}
        className="mr-1 data-[state=open]:bg-foreground/10"
        // data-state={showMenu && menuContent === "notes" ? "open" : "closed"}
        aria-haspopup
        // aria-expanded={menuContent === "notes" ? "true" : "false"}
      >
        <span className="sr-only">Rowcounter settings</span>
        <Wrench />
      </ToolbarButton>
      <ToolbarMenu
        open={showMenu}
        onOpenChange={setShowMenu}
        onCloseAutoFocus={(e) => {
          e.preventDefault;
          handleOnCloseAutoFocus();
        }}
      >
        {menuContent === "subcounter" ? (
          <SubCounterMenu
            key="subcounter"
            project={project}
            setShowMenu={setShowMenu}
          />
        ) : (
          <CounterNotes key="notes" />
        )}
      </ToolbarMenu>
    </>
  );
}
