import { startTransition } from "react";
import { Minus, Plus } from "lucide-react";
import { useCountDirection } from "@/contexts/CountDirectionContext";
import { updateProject } from "../actions/projects";
import { RadioSwitch, RadioSwitchItem } from "./ui/RadioSwitch";

type CountDirectionToggleProps = {
  projectId: number;
  onDirectionChange?: () => void;
};

export function CountDirectionToggle({
  projectId,
  onDirectionChange,
}: CountDirectionToggleProps) {
  const [direction, toggleDirection] = useCountDirection();

  function handleUpdateDirection(newDirection: string) {
    const numDirection = newDirection === "up" ? 1 : -1;

    // optimistic update via context. In this case we don't want to revert to the previous value if the operation fails.
    toggleDirection();
    startTransition(async () => {
      try {
        await updateProject({ direction: numDirection }, projectId);
      } catch (e) {
        // ignore this error since it's not critical if the newDirection isn't actually saved
        console.error("UpdateProject error:", e);
      }
    });

    onDirectionChange?.();
  }

  return (
    <RadioSwitch
      className="h-fit py-1"
      defaultValue={direction === 1 ? "up" : "down"}
      onValueChange={(value) => handleUpdateDirection(value)}
    >
      <RadioSwitchItem value="up" className="size-7">
        <Plus />
      </RadioSwitchItem>
      <RadioSwitchItem value="down" className="size-7">
        <Minus />
      </RadioSwitchItem>
    </RadioSwitch>
  );
}
