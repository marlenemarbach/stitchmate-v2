import { UpdateDirectionAction, CountDirection } from "@/stores/counter-store";
import { Minus, Plus } from "./icons";
import { RadioButton, RadioGroup } from "./ui";

type CountDirectionToggleProps = {
  direction: CountDirection;
  updateDirection: UpdateDirectionAction;
};

export function CountDirectionToggle({
  direction,
  updateDirection,
}: CountDirectionToggleProps) {
  function handleUpdateDirection(newDirection: CountDirection) {
    if (newDirection === direction) return;
    updateDirection(newDirection);
  }

  return (
    <RadioGroup className="bg-midnight-500 p-1">
      <RadioButton
        variant="primary"
        size="small"
        isActive={direction === "up"}
        onClick={() => handleUpdateDirection("up")}
      >
        <Plus className="size-4" />
      </RadioButton>
      <RadioButton
        variant="primary"
        size="small"
        isActive={direction === "down"}
        onClick={() => handleUpdateDirection("down")}
      >
        <Minus className="size-4" />
      </RadioButton>
    </RadioGroup>
  );
}
