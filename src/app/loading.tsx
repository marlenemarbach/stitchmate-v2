import { SuspenseLogo } from "@/components/svg/SuspenseLogo";

export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <SuspenseLogo className="mb-10 opacity-50" />
    </div>
  );
}
