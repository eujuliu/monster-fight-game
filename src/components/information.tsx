import type { MonsterInfoKeys } from "@/utils/monsters";

type Props = {
	name: MonsterInfoKeys;
	label: string;
	value: number;
};

export type MonsterInformation = {
	label: string;
	name: MonsterInfoKeys;
};

const infoColor: Record<MonsterInfoKeys, string> = {
	hp: "bg-red-500",
	attack: "bg-orange-500",
	defense: "bg-blue-500",
	speed: "bg-green-500",
};

function Information({ name, label, value }: Props) {
	return (
		<div className="flex flex-col gap-1">
			<div className="flex justify-between">
				<span className="text-xs font-bold text-neutral-100">{label}</span>
				<span className="text-xs font-medium text-neutral-300">{value}</span>
			</div>
			<div className="w-full h-2.5 border-1 border-neutral-50/10 rounded">
				<div
					className={`h-full ${infoColor[name]} rounded`}
					style={{ width: `${value}%` }}
				></div>
			</div>
		</div>
	);
}

export { Information };
