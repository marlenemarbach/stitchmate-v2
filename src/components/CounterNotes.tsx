"use client";

import { useState } from "react";
import {
  CircleSlash2,
  Notebook,
  RulerDimensionLine,
  Shirt,
  Volleyball,
} from "lucide-react";
import { Button } from "./ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog";

export function CounterNotes() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex gap-2">
      <CategoryButton>
        <span className="sr-only">NeedleSize</span>
        <CircleSlash2 />
      </CategoryButton>

      <CategoryButton>
        <span className="sr-only">Gauge</span>
        <RulerDimensionLine />
      </CategoryButton>

      <CategoryButton>
        <span className="sr-only">Measurements</span>
        <Shirt />
      </CategoryButton>

      <CategoryButton>
        <span className="sr-only">Yarn</span>
        <Volleyball />
      </CategoryButton>
      <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-border">
        <p>coming soon</p>
      </div>
    </div>
  );
}

function CategoryButton({ children }: React.PropsWithChildren) {
  return (
    <Button
      disabled
      className="w-9 border border-border bg-transparent opacity-100"
    >
      {children}
    </Button>
  );
}
