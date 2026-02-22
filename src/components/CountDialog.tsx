import { useEffect, useState, useTransition } from "react";
import { IterationCw, Loader } from "lucide-react";
import { updateProject } from "@/actions/projects";
import { useCount } from "@/contexts/CountContext";
import { type ProjectWithSubCounter } from "@/lib/types";
import { Button } from "./ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "./ui/Dialog";
import { FormError } from "./ui/Form";
import {
  SpinButton,
  SpinButtonDecrement,
  SpinButtonError,
  SpinButtonField,
  SpinButtonGroup,
  SpinButtonIncrement,
  SpinButtonLabel,
} from "./ui/SpinButton";

export function CountDialog({
  project,
  open,
  setOpen,
}: {
  project: ProjectWithSubCounter;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { count } = useCount();
  const [value, setValue] = useState(count.toString());
  const [message, setMessage] = useState("");

  useEffect(() => {
    setValue(count.toString());
  }, [count]);

  const [pending, startTransition] = useTransition();

  function submitProjectCount() {
    startTransition(async () => {
      try {
        const result = await updateProject(
          { count: parseInt(value) },
          project.id,
        );
        if (result.success) {
          setOpen(false);
        } else {
          setMessage("An error occured while saving your row count");
        }
      } catch (error) {
        console.error("Update project error:", error);
        setMessage("An error occured while saving your row count");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogClose />
        <DialogTitle>Row Count</DialogTitle>
        <DialogDescription>
          Set your current row count or reset your counter to start from the
          beginning.
        </DialogDescription>
        <div className="grid gap-3">
          <div className="flex items-center gap-4">
            <SpinButton
              id="rowCount"
              min={1}
              max={99}
              defaultValue={count}
              value={value}
              onValueChange={setValue}
            >
              <SpinButtonGroup>
                <SpinButtonLabel className="sr-only">
                  currentCount
                </SpinButtonLabel>
                <SpinButtonDecrement title="decrement current count by 1" />
                <SpinButtonField />
                <SpinButtonIncrement title="increment current count by 1" />
              </SpinButtonGroup>
              <SpinButtonError />
            </SpinButton>
            <Button
              onClick={() => setValue("1")}
              type="button"
              variant="ghost"
              className="w-fit p-0 text-base text-muted-foreground hover:bg-transparent hover:text-foreground/80 focus-visible:text-foreground focus-visible:ring-transparent focus-visible:outline-none active:text-foreground dark:hover:bg-transparent"
            >
              <IterationCw className="size-4" />
              set to 1
            </Button>
          </div>
        </div>

        {message && <FormError>{message}</FormError>}
        <DialogFooter className="mt-6">
          <Button
            className="ml-auto w-[4.75rem]"
            onClick={() => {
              setOpen(false);
            }}
            variant="secondary"
            disabled={pending}
          >
            cancel
          </Button>
          <Button
            disabled={pending}
            onClick={submitProjectCount}
            className="w-[4.75rem]"
          >
            {pending ? <Loader className="animate-spin" /> : "save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
