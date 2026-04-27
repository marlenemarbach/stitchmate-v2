import { Project } from "@/lib/types";
import { ProjectForm } from "./ProjectForm";
import { Dialog, DialogContent } from "./ui/Dialog";

type EditProjectProps = {
  project: Project;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
};

export function EditProjectDialog({
  project,
  children,
  open,
  setOpen,
}: React.PropsWithChildren & EditProjectProps) {
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)} isDrawer>
      {children}
      <DialogContent
        onClick={(e) => e.stopPropagation()}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <ProjectForm
          onSuccess={() => setOpen(false)}
          setOpen={setOpen}
          project={project}
        />
      </DialogContent>
    </Dialog>
  );
}
