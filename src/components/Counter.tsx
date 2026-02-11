"use client";

import { startTransition, useEffect } from "react";
import { animate, useMotionValue } from "motion/react";
import { useCount } from "@/contexts/CountContext";
import { useCountDirection } from "@/contexts/CountDirectionContext";
import { useThrottle } from "@/hooks/useThrottle";
import { CountDirection, type Project } from "@/lib/types";
import { RowCounterBackCover } from "./svg/RowCounterBackCover";
import { RowCounterButton } from "./svg/RowCounterButton";
import { RowCounterFrontCover } from "./svg/RowCounterFrontCover";
import { RowCounterInner } from "./svg/RowCounterInner";
import { RowCounterLeftGear } from "./svg/RowCounterLeftGear";
import { RowCounterRightGear } from "./svg/RowCounterRightGear";
import { RowCounterSpring } from "./svg/RowCounterSpring";

export function Counter({ project }: { project: Project }) {
  const [direction] = useCountDirection();
  const { count, updateCount } = useCount();

  // const handleCount = useThrottle(() => {
  //   if (count + direction < 1 || count + direction > 99) return;
  //   updateCount(direction, project.id);
  // }, 300);

  return (
    <button
      onClick={() => updateCount(direction, project.id)}
      className="relative h-fit w-fit"
    >
      <Cover>
        <TopButton count={count} direction={direction} />
        <Gears count={count} />
      </Cover>
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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[70%]"
        style={direction === 1 ? { y } : undefined}
      />
      <RowCounterSpring
        className="absolute top-0 left-1/2 origin-bottom -translate-x-1/2 -translate-y-[6px] fill-white opacity-15"
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
        className="absolute top-1/2 left-0 -translate-x-[16%] -translate-y-1/2 rotate-36 drop-shadow"
        initial={{}}
        animate={{ rotate: rotation.left }}
      />
      <RowCounterRightGear
        className="absolute top-1/2 right-0 translate-x-[16%] -translate-y-1/2 -rotate-36 drop-shadow"
        initial={{}}
        animate={{ rotate: rotation.right }}
      />
    </>
  );
}

export function Cover({ children }: React.PropsWithChildren) {
  return (
    <>
      <RowCounterBackCover className="absolute top-1/2 left-1/2 -translate-1/2 fill-ultramarine-700 opacity-50" />
      <span className="absolute top-1/4 left-1/2 h-1 w-8 -translate-1/2 rounded-lg bg-white/20"></span>
      <RowCounterInner className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fill-white opacity-20" />
      {children}
      <RowCounterFrontCover className="fill-ultramarine-800 opacity-80 drop-shadow-md drop-shadow-zinc-900" />
    </>
  );
}
