import { SuspenseLogo } from "@/components/svg/SuspenseLogo";

export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <SuspenseLogo className="text-planned opacity-25" />
    </div>
  );
}
