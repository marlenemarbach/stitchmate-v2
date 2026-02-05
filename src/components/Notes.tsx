import { Plus } from "lucide-react";
import { DialogDescription, DialogTitle } from "./ui/Dialog";

export function Notes() {
  return (
    <div className="grid w-full gap-6">
      <DialogTitle className="text-lg font-medium">Notes</DialogTitle>
      <DialogDescription>
        This is a preview of an upcoming feature that will allow you to view and
        add short text notes that can be assigned to categories such as needle
        size or gauge.
      </DialogDescription>

      <p className="text-muted-foreground">...coming soon</p>
      <button className="ml-auto flex items-center gap-2 opacity-30" disabled>
        <Plus className="size-4 stroke-3" />
        Add Note
      </button>
    </div>
  );
}

function Category({ children }: React.PropsWithChildren) {
  return <div className="place-self-center">{children}</div>;
}
