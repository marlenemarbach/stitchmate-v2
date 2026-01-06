"use client";

import { CircleSlash2 } from "lucide-react";
import { useActionState } from "react";
import { Button } from "../ui/Button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import { Form, FormError } from "../ui/Form";
import { NeedleTabs } from "./NeedleTabs";

const initialState: ActionResponse = {
  success: false,
  message: "",
  error: undefined,
};

export function NeedleDialog({
  currentNeedleSize,
  projectId,
}: {
  currentNeedleSize: string | null;
  projectId: number;
}) {
  const [state, formAction, pending] = useActionState<
    NeedleActionResponse,
    FormData
  >(async (prev: NeedleActionResponse, formData: FormData) => {
    try {
      const result = await saveNeedleSize(formData, projectId);
      return { success: false, message: "not implemented" };
    } catch (error) {
      return { success: false, message: "An error occurred" };
    }
  }, initialState);

  return (
    <Dialog>
      <DialogTrigger size="small" className="w-fit" variant="ghost">
        <CircleSlash2 />
        <span>{currentNeedleSize?.split(" ")[1] ?? "--"}</span>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Needlesize</DialogTitle>
        <p className="-mt-3 text-sm text-muted-foreground">
          Set and save the needle size for your project.
        </p>
        <Form>
          <NeedleTabs isActive={true} />
          <Button>save needle</Button>
          {state?.error && <FormError>{state.message}</FormError>}
        </Form>
      </DialogContent>
    </Dialog>
  );
}
