"use client";
import { useContext, useState, createContext } from "react";
import { Button } from "../ui/Button";
import { ChevronDown, Needles } from "../ui/Icons";
import { Menu, MenuContent, MenuTrigger } from "../ui/Menu";

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

type NeedleMetrics = keyof typeof needleSizes;

type NeedleSizeForMetric<T extends NeedleMetrics> =
  (typeof needleSizes)[T][number];

type CurrentNeedle = {
  metric: NeedleMetrics;
  size: NeedleSizeForMetric<NeedleMetrics>;
};

const TabContext = createContext<{
  activeTab: NeedleMetrics;
  setActiveTab: React.Dispatch<React.SetStateAction<NeedleMetrics>>;
} | null>(null);

export function NeedleSelector() {
  const [currentNeedle, setCurrentNeedle] = useState<CurrentNeedle>({
    metric: "mm",
    size: "3.50",
  });

  const [activeTab, setActiveTab] = useState<NeedleMetrics>("mm");
  const selectedNeedle =
    currentNeedle.metric === "mm"
      ? `${currentNeedle.size}`
      : `${currentNeedle.metric} ${currentNeedle.size}`;

  return (
    <>
      <Menu className="row-start-2" position="bottomLeft">
        <MenuTrigger className="pr-2 pl-1">
          <Needles className="size-6" />
          <span className="w-9">{selectedNeedle}</span>
          <ChevronDown className="size-3" strokeWidth={2} />
        </MenuTrigger>
        <MenuContent className="w-[28rem]">
          <TabContext value={{ activeTab, setActiveTab }}>
            <ul className="mb-2 flex gap-2">
              {Object.keys(needleSizes).map((metric) => (
                <NeedleSelectorTab key={metric} id={metric as NeedleMetrics}>
                  {metric}
                </NeedleSelectorTab>
              ))}
            </ul>
            <NeedleSizeList
              currentNeedle={currentNeedle.size}
              setCurrentNeedle={setCurrentNeedle}
            />
          </TabContext>
        </MenuContent>
      </Menu>
    </>
  );
}

function NeedleSelectorTab({
  children,
  id,
}: React.PropsWithChildren & { id: NeedleMetrics }) {
  const ctx = useContext(TabContext);

  if (!ctx)
    throw new Error("<NeedleSelectorTab> must be used withing <TabContext>");

  const { activeTab, setActiveTab } = ctx;
  return (
    <li>
      <Button
        size="xs"
        variant="ghost"
        data-active={activeTab === id}
        className="text-zinc-200/50 data-[active=true]:text-zinc-200"
        onClick={() => {
          setActiveTab(id);
        }}
      >
        {children}
      </Button>
    </li>
  );
}

function NeedleSizeList({
  currentNeedle,
  setCurrentNeedle,
}: {
  currentNeedle: NeedleSizeForMetric<NeedleMetrics>;
  setCurrentNeedle: React.Dispatch<React.SetStateAction<CurrentNeedle>>;
}) {
  const ctx = useContext(TabContext);

  if (!ctx)
    throw new Error("<NeedleSelectorTab> must be used withing <TabContext>");

  const { activeTab } = ctx;

  return (
    <ul className="grid grid-cols-7 gap-2">
      {needleSizes[activeTab].map((size) => {
        return (
          <li key={size + activeTab}>
            <Button
              className="w-full data-[active=true]:bg-midnight-300"
              data-active={size === currentNeedle}
              onClick={() => setCurrentNeedle({ size, metric: activeTab })}
            >
              {size}
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
