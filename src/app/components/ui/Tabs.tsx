"use client";

import { createContext, useContext } from "react";
import { cn } from "@/lib/utils";

const TabContext = createContext<
  | {
      activeTab: string;
      setActiveTab: React.Dispatch<React.SetStateAction<string>>;
    }
  | undefined
>(undefined);

type TabsProps = {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
};

export function Tabs({
  children,
  activeTab,
  setActiveTab,
  className,
  ...props
}: React.PropsWithChildren &
  TabsProps &
  React.ComponentPropsWithoutRef<"div">) {
  return (
    <TabContext value={{ activeTab, setActiveTab }}>
      <div
        className={cn("flex flex-col justify-center gap-3", className)}
        {...props}
      >
        {children}
      </div>
    </TabContext>
  );
}

export function TabList({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex gap-1", className)} {...props}>
      {children}
    </div>
  );
}

export function Tab({
  value,
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"button"> & { value: string }) {
  const ctx = useContext(TabContext);
  if (!ctx) throw new Error("<Tab> must be used within <Tabs>");

  const { setActiveTab, activeTab } = ctx;

  return (
    <button
      type="button"
      className={cn(
        "200ms flex h-7 items-center justify-center rounded-full border border-transparent px-2 text-sm text-muted-foreground transition-all ease-out",
        "data-[state=active]:border-primary data-[state=active]:bg-primary/20 data-[state=active]:text-foreground",
        "group-data-[state=inactive]:data-[state=active]:border-border group-data-[state=inactive]:data-[state=active]:bg-transparent",
        className,
      )}
      {...props}
      data-state={value === activeTab ? "active" : "inactive"}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
}

export function TabContent({
  value,
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & { value: string }) {
  const ctx = useContext(TabContext);
  if (!ctx) throw new Error("<TabContent> must be used within <Tabs>");

  const { activeTab } = ctx;

  return (
    <div
      className={cn(
        "hidden rounded-lg border border-border p-3 data-[state=active]:block",
        className,
      )}
      {...props}
      data-state={value === activeTab ? "active" : "inactive"}
    >
      {children}
    </div>
  );
}
