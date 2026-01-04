import { useActionState, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Project } from "@/db/schema";
import { ActionResponse } from "../actions/auth";
import { updateProject } from "../actions/projects";
import { Button } from "../ui/Button";
import { FieldError } from "../ui/Form";
import { Input } from "../ui/Input";

export function UpdateProjectNameInput({
  projectName,
  projectId,
}: {
  projectName: string;
  projectId: number;
}) {
  const [value, setValue] = useState(projectName);

  const isDirty = value !== projectName;

  return (
    <div>
      <form
        action={formAction}
        className="flex w-[300px] items-center rounded-lg border border-border/70 transition-[border-color,box-shadow] has-[:focus-visible]:border-ring has-[:focus-visible]:ring-[2px] has-[:focus-visible]:ring-ring/30"
      >
        <Input
          id="name"
          name="projectName"
          type="text"
          autoComplete="off"
          onChange={(e) => setValue(e.currentTarget.value)}
          value={value}
          placeholder="Project name"
          className="border-0 bg-transparent text-sm focus-visible:border-0 focus-visible:ring-0 dark:bg-black/10"
          required
        />
        {isDirty && (
          <Button variant="ghost" size="icon" className="rounded-lg">
            <ArrowRight />
          </Button>
        )}
      </form>
      {state.errors && (
        <FieldError className="absolute bottom-1 left-0 text-xs">
          {state.errors.name}
        </FieldError>
      )}
    </div>
  );
}
