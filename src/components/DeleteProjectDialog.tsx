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
  setOpen: (open: boolean) => void;
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
      <DialogContent open={open}>
        <DialogClose />
        <DialogTitle className="sr-only">Delete Project</DialogTitle>
        <p className="mt-6 flex items-center gap-2 text-balance">
          <CircleAlert className="size-4 text-destructive" />
          {`Are you sure you want to delete ${project.name}?`}
        </p>
        <DialogFooter>
          <Button
            className="col-span-3 col-start-6 w-fit place-self-end"
            variant="secondary"
            onClick={() => setOpen(false)}
          >
            cancel
          </Button>
          <Button
            type="submit"
            variant="destructive"
            className="w-fit place-self-end"
            onClick={() => handleDelete()}
          >
            delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
