"use client";

import { useEffect } from "react";
import { animate, useMotionValue } from "motion/react";
import { useCount } from "@/contexts/CountContext";
import { useCountDirection } from "@/contexts/CountDirectionContext";
import { CountDirection, type Project } from "@/lib/types";
import { RowCounterButton } from "./svg/RowCounterButton";
import { RowCounterFrontCover } from "./svg/RowCounterFrontCover";
import { RowCounterInner } from "./svg/RowCounterInner";
import { RowCounterLeftGear } from "./svg/RowCounterLeftGear";
import { RowCounterRightGear } from "./svg/RowCounterRightGear";
import { RowCounterSpring } from "./svg/RowCounterSpring";

export function Counter({ project }: { project: Project }) {
  const [direction] = useCountDirection();
  const { count, updateCount } = useCount();

  console.log(count, project.count);

  return (
    <button
      onClick={() => updateCount(direction, project.id)}
      className="relative h-fit w-fit"
    >
      <TopButton count={count} direction={direction} />
      <RowCounterInner className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <Gears count={count} />
      <RowCounterFrontCover />
    </button>
  );
}

function TopButton({
  count,
  direction,
}: {
  count: number;
  direction: CountDirection;
}) {
  const y = useMotionValue(0);
  const scaleY = useMotionValue(1);

  useEffect(() => {
    animate(y, [5, 0]);
    animate(scaleY, [0.9, 1]);
  }, [count, y, scaleY]);

  return (
    <>
      <RowCounterButton
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[18%] opacity-50"
        style={direction === 1 ? { y } : undefined}
      />
      <RowCounterSpring
        className="absolute top-0 left-1/2 origin-bottom -translate-x-1/2 -translate-y-[17px] scale-y-95 fill-white opacity-15"
        style={direction === 1 ? { scaleY } : undefined}
      />
    </>
  );
}

export function Gears({ count }: { count: number }) {
  const rotation = calculateRotation();

  function calculateRotation() {
    const left = Math.floor(count / 10) * 36;
    const right = count * -36;
    return { left, right };
  }

  return (
    <>
      <RowCounterLeftGear
        className="absolute top-1/2 left-0 -translate-x-[25%] -translate-y-1/2"
        initial={{}}
        animate={{ rotate: rotation.left }}
      />
      <RowCounterRightGear
        className="absolute top-1/2 right-0 translate-x-[23%] -translate-y-1/2"
        initial={{}}
        animate={{ rotate: rotation.right }}
      />
    </>
  );
}
