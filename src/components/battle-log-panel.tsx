import type { Monster } from "@/utils/monsters";
import { cn } from "@/utils/shadcn";
import type { HTMLAttributes } from "react";

export type LogType =
  | "attack"
  | "defeat"
  | "start"
  | "end"
  | "roundStart"
  | "roundEnd";

type BaseLog = {
  id: number;
  timestamp: number;
  message: string;
  round: number;
};

type AttackLogFields = {
  type: "attack";
  damage: number;
  hp: number;
  attacker: Monster;
  defenser: Monster;
  side: "left" | "right";
};

type RoundStartFields = {
  type: "roundStart";
  leftMonster: Monster;
  rightMonster: Monster;
};

type DefeatFields = {
  type: "defeat";
  loser: Monster;
  side: "left" | "right";
  winnerVictories: number;
};

type EndLogFields = {
  type: "end";
  damage: number;
  hp: number;
  winner: Monster;
};

type OtherLogFields = {
  type: Exclude<LogType, "attack" | "end" | "roundStart" | "defeat">;
  damage?: number;
  hp?: number;
  attacker?: Monster;
  defenser?: Monster;
  side?: "left" | "right";
};

export type BattleLog =
  | (BaseLog & AttackLogFields)
  | (BaseLog & EndLogFields)
  | (BaseLog & RoundStartFields)
  | (BaseLog & DefeatFields)
  | (BaseLog & OtherLogFields);

type Props = {
  logs: BattleLog[];
} & HTMLAttributes<HTMLDivElement>;

const typeColors: Record<LogType, string> = {
  attack: "text-red-500",
  defeat: "text-gray-800 font-bold",
  start: "text-blue-500",
  end: "text-purple-500",
  roundEnd: "text-purple-500",
  roundStart: "text-blue-500",
};

function BattleLogPanel({ logs, className }: Props) {
  function getFormatedDateFromTimestamp(timestamp: number) {
    const date = new Date(timestamp);

    return `${date.toLocaleTimeString()}`;
  }

  return (
    <div
      className={cn(
        "rounded-xl p-3 border border-gray-200 bg-neutral-50",
        className,
      )}
    >
      <h2 className="text-lg font-semibold mb-2">Battle Log</h2>
      <div className="w-full max-h-80 h-full overflow-y-auto">
        <ul className="space-y-2 text-sm font-mono">
          {logs.map((log) => (
            <li key={log.id} className="flex items-start gap-2">
              <span className="text-gray-400 shrink-0">
                {getFormatedDateFromTimestamp(log.timestamp)}
              </span>
              <span className={`${typeColors[log.type]}`}>{log.message}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export { BattleLogPanel };
