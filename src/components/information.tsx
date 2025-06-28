import type { MonsterInfoKeys } from "@/utils/monsters";

type Props = {
  name: MonsterInfoKeys;
  label: string;
  value: number;
};

const infoColor: Record<MonsterInfoKeys, string> = {
  hp: "bg-red-500",
  attack: "bg-orange-500",
  defense: "bg-blue-500",
  speed: "bg-green-500",
};

function Information({ name, label, value }: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <span className="text-sm font-bold">{label}</span>
        <span className="text-xs font-bold">{value}</span>
      </div>
      <div className="w-full h-3 border-2 rounded-sm">
        <div
          className={`h-full ${infoColor[name]} rounded-sm`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}

export { Information };
