import { CircleAlert } from "lucide-react";
import { toast } from "sonner";
import { Project } from "@/lib/types";
import { deleteProject } from "../actions/projects";
import { Button } from "./ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "./ui/Dialog";

type DeleteProjectProps = {
  project: Project;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function DeleteProjectDialog({
  project,
  open,
  setOpen,
}: DeleteProjectProps) {
  async function handleDelete() {
    try {
      await deleteProject(project.id);
    } catch (e) {
      console.error("Delete project error:", e);
      toast.error("An error occured deleting your project.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} modal>
      <DialogContent>
        <DialogClose onClick={() => setOpen(false)} />
        <DialogTitle className="sr-only">Delete Project</DialogTitle>
        <p className="mt-6 flex items-baseline gap-2">
          <CircleAlert className="size-5 translate-y-1 text-destructive" />
          {`Are you sure you want to delete "${project.name}"?`}
        </p>
        <DialogFooter className="border-none">
          <Button
            className="col-span-3 col-start-6 w-[4.75rem] place-self-end"
            variant="secondary"
            onClick={() => setOpen(false)}
          >
            cancel
          </Button>
          <Button
            type="submit"
            variant="destructive"
            className="w-[4.75rem] place-self-end"
            onClick={() => handleDelete()}
          >
            delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
