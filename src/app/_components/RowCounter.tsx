import { Button } from "./ui";

type RowCounterProps = {
  count: number;
  updateCount: () => void;
};

export function RowCounter({ count, updateCount }: RowCounterProps) {
  return (
    <>
      <h1 className="text-center">{count}</h1>
      <Button className="m-auto" onClick={() => updateCount()}>
        {count}
      </Button>
    </>
  );
}
