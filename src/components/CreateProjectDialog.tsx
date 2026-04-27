"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { ProjectActionResponse } from "../actions/types";
import { ProjectForm } from "./ProjectForm";
import { Button } from "./ui/Button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/Dialog";

export function CreateProjectDialog() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function handleSuccess(result: ProjectActionResponse) {
    setOpen(false);
    router.push(`/projects/${result.project?.id}`);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="small" className="w-8 sm:w-fit" aria-label="Add Project">
          <Plus className="stroke-3" />
          <span className="hidden sm:flex">Add Project</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <ProjectForm onSuccess={handleSuccess} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
