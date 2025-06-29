import type { Battle } from "@/utils/battles";
import { formatTimestampToDate } from "@/utils/date";
import { BattleLogPanel } from "./battle-log-panel";

type Props = {
	battle: Battle;
};

function BattleInfo({ battle }: Props) {
	return (
		<div className="flex flex-col gap-2 w-full">
			<div className="text-sm font-bold">ID</div>
			<div>{battle?.id}</div>

			<div className="text-sm font-bold">Winner</div>
			<div>{battle?.winner?.name}</div>

			<div className="text-sm font-bold">Left Monster</div>
			<div>{battle?.leftMonster.name}</div>

			<div className="text-sm font-bold">Right Monster</div>
			<div>{battle?.rightMonster.name}</div>

			<div className="text-sm font-bold">Duration</div>
			<div>{`${formatTimestampToDate(battle.start)} to ${formatTimestampToDate(battle.end)}`}</div>

			<BattleLogPanel logs={battle?.logs || []} className="w-full mt-2" />
		</div>
	);
}

export { BattleInfo };
