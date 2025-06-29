import type { HTMLAttributes } from "react";
import type { Monster } from "@/utils/monsters";
import { cn } from "@/utils/shadcn";
import { Information, type MonsterInformation } from "./information";

type Props = {
	monster: Monster | null;
} & HTMLAttributes<HTMLDivElement>;

const informations: MonsterInformation[] = [
	{ label: "HP", name: "hp" },
	{ label: "Attack", name: "attack" },
	{ label: "Defense", name: "defense" },
	{ label: "Speed", name: "speed" },
];

function MonsterCard({ monster, ...rest }: Props) {
	return (
		<div
			{...rest}
			className={cn(
				"w-full h-full min-h-[400px] max-w-[350px] max-h-[450px] rounded-xl bg-[url(/images/backgrounds/guillaume-lucbert-sewers.jpg)] bg-cover bg-center",
				rest.className,
			)}
		>
			<div
				className="flex items-start flex-col gap-4 w-full h-full backdrop-blur-xs p-4 relative rounded-lg bg-cover bg-center"
				style={{
					backgroundImage: `url(${monster?.image_url || "/images/monsters/humanoid.jpg"})`,
				}}
			>
				<div className="p-1 rounded-full text-xs font-bold bg-white">
					#{monster?.id || "?"}
				</div>

				<div className="relative self-end bg-black/70 p-4 rounded-lg mt-auto w-full">
					<div className="absolute w-[80%] text-center -top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg text-white py-1 px-4 font-bold rounded-lg border-1 bg-black/85">
						{monster?.name || "????????"}
					</div>
					<div className="flex flex-col gap-2">
						{informations.map(({ label, name }) => (
							<Information
								key={name}
								name={name}
								label={label}
								value={monster?.[name] || 0}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export { MonsterCard };
