"use client";

import { useState } from "react";
import { ChevronRight, ChevronsUpDown } from "lucide-react";
import { toast } from "sonner";
import { updateSubCounter } from "@/actions/subCounter";
import { ProjectWithSubCounter } from "@/lib/types";
import { CountDialog } from "./CountDialog";
import { CountDirectionToggle } from "./CountDirectionToggle";
import { SubCounterDialog } from "./SubCounterDialog";
import {
  PopoverMenu,
  PopoverMenuContent,
  PopoverMenuItem,
  PopoverMenuTrigger,
} from "./ui/PopoverMenu";
import { Switch } from "./ui/Switch";

export function CounterMenu({ project }: { project: ProjectWithSubCounter }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showSubCounterDialog, setShowSubCounterDialog] = useState(false);
  const [showCountDialog, setShowCountDialog] = useState(false);

  async function toggleSubcounter(active: boolean) {
    try {
      const success = await updateSubCounter(project.id, { active });
      if (!success) toast.error("An error occured updating your subcounter");
    } catch (error) {
      console.error("Update subcounter error:", error);
      toast.error("An error occured updating your subcounter");
    }
  }

  return (
    <>
      <PopoverMenu open={showMenu} onOpenChange={setShowMenu}>
        <PopoverMenuTrigger
          aria-label="expand menu"
          className="fixed bottom-10 left-1/2 flex size-11 items-center justify-center border-popup bg-popup focus-visible:outline-none sm:bottom-14"
        >
          <ChevronsUpDown />
        </PopoverMenuTrigger>
        <PopoverMenuContent
          side="top"
          sideOffset={-44}
          className="w-xs max-w-[calc(screen-1rem)]"
        >
          <PopoverMenuItem
            className="pr-0"
            onSelect={(e) => e.preventDefault()}
          >
            Countdirection
            <CountDirectionToggle projectId={project.id} />
          </PopoverMenuItem>
          <PopoverMenuItem asChild className="pr-1">
            <button
              onClick={() => {
                setShowMenu(false);
                setShowCountDialog(true);
              }}
              className="flex w-full items-center justify-between pr-1"
            >
              Count
              <span className="flex items-center gap-2">
                <span className="text-foreground/80">{project.count}</span>
                <ChevronRight className="text-foreground/80" />
              </span>
            </button>
          </PopoverMenuItem>
          <PopoverMenuItem
            className="relative pr-1"
            onSelect={(e) => e.preventDefault()}
            asChild
          >
            <button
              className="flex w-full items-start justify-between"
              onClick={() => {
                setShowMenu(false);
                setShowSubCounterDialog(true);
              }}
            >
              Subcounter
              <ChevronRight className="text-foreground/80" />
            </button>
            <span className="absolute top-0 right-7 flex items-center">
              <Switch
                defaultActive={project.subCounter.active}
                onSwitchChange={(active) => toggleSubcounter(active)}
              />
            </span>
          </PopoverMenuItem>
        </PopoverMenuContent>
      </PopoverMenu>
      <SubCounterDialog
        project={project}
        open={showSubCounterDialog}
        setOpen={setShowSubCounterDialog}
      />
      <CountDialog
        project={project}
        open={showCountDialog}
        setOpen={setShowCountDialog}
      />
    </>
  );
}
