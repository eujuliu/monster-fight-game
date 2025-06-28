import { Circle } from "lucide-react";

function RoundTimer() {
  return (
    <div className="flex items-center gap-2 flex-col">
      <div className="text-2xl font-bold">59</div>
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          <Circle />
          <Circle />
        </div>

        <div className="flex gap-2">
          <Circle />
          <Circle />
        </div>
      </div>
    </div>
  );
}

export { RoundTimer };
