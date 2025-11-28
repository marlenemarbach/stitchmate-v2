"use client";

import { createContext, useContext } from "react";
import { cn } from "../lib/utils";

const TabContext = createContext<
  | {
      activeTab: string;
      setActiveTab: React.Dispatch<React.SetStateAction<string>>;
      disabled: boolean;
    }
  | undefined
>(undefined);

type TabsProps = {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  disabled?: boolean;
};

export function Tabs({
  children,
  disabled = false,
  activeTab,
  setActiveTab,
  className,
  ...props
}: React.PropsWithChildren &
  TabsProps &
  React.ComponentPropsWithoutRef<"div">) {
  return (
    <TabContext value={{ disabled, activeTab, setActiveTab }}>
      <div className={cn("flex flex-col gap-2", className)} {...props}>
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

  const { setActiveTab, activeTab, disabled } = ctx;

  const getDataState = () => {
    if (value === activeTab && !disabled) return "active";
    if (value === activeTab && disabled) return "selected";
    return "inactive";
  };

  return (
    <button
      type="button"
      className={cn(
        "data-[state=active]:text-foreground data-[state=active]:bg-primary/20 border border-transparent data-[state=active]:border-primary  rounded-full px-2 text-muted-foreground transition-all ease-out 200ms text-sm data-[state=selected]:border-border",
        className,
      )}
      {...props}
      data-state={getDataState()}
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
        "border border-border rounded-lg p-2 hidden data-[state=active]:block",
        className,
      )}
      {...props}
      data-state={value === activeTab ? "active" : "inactive"}
    >
      {children}
    </div>
  );
}
