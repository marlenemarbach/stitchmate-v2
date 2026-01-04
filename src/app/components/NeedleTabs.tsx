"use client";
import { useState } from "react";
import { cn } from "../lib/utils";
import { RadioButton, RadioGroup } from "../ui/RadioGroup";
import { Tab, TabContent, TabList, Tabs } from "../ui/Tabs";

const needleSizes = {
  mm: [
    "2.00",
    "2.25",
    "2.50",
    "3.00",
    "3.25",
    "3.50",
    "3.75",
    "4.00",
    "4.50",
    "5.00",
    "5.50",
    "6.00",
    "6.50",
    "7.00",
    "7.50",
    "8.00",
    "9.00",
    "10.00",
    "12.00",
  ],
  us: [0, 1, 1.5, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10.5, 11, 13, 15, 17],
  uk: [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
} as const;

type NeedleMetric = keyof typeof needleSizes;

export function NeedleTabs({
  className,
  isActive,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & { isActive: boolean }) {
  const [activeNeedleMetric, setActiveNeedleMetric] = useState("mm");
  const [currentNeedleSize, setCurrentNeedleSize] = useState("mm 3.50");

  return (
    <div
      className={cn(className, "group")}
      {...props}
      data-state={isActive ? "active" : "inactive"}
    >
      <Tabs activeTab={activeNeedleMetric} setActiveTab={setActiveNeedleMetric}>
        <TabList>
          {Object.keys(needleSizes).map((metric) => (
            <Tab
              key={metric}
              value={metric as NeedleMetric}
              className="min-w-10"
            >
              {metric}
            </Tab>
          ))}
        </TabList>
        {Object.keys(needleSizes).map((metric) => {
          return (
            <TabContent key={metric} value={metric}>
              <RadioGroup className="grid grid-cols-5 sm:grid-cols-6 grid-rows-4">
                {needleSizes[metric as NeedleMetric].map((size) => (
                  <RadioButton
                    name="needleSize"
                    key={`${metric} ${size}`}
                    value={`${metric} ${size}`}
                    checked={`${metric} ${size}` === currentNeedleSize}
                    onChange={(e) => setCurrentNeedleSize(e.target.value)}
                    size="small"
                  >
                    {size}
                  </RadioButton>
                ))}
              </RadioGroup>
            </TabContent>
          );
        })}
      </Tabs>
    </div>
  );
}
