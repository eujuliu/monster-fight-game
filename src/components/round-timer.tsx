import { Badge, BadgeX } from "lucide-react";

type Props = {
	count: number;
	rounds: Record<string, boolean>;
};

function RoundTimer({ count, rounds }: Props) {
	const allRounds = Object.keys(rounds);
	const leftRounds = allRounds.slice(0, 2);
	const rightRounds = allRounds.slice(2);

	return (
		<div className="flex items-center gap-2 flex-col">
			<div className="text-xl font-black">{count}</div>
			<div className="flex items-center gap-1 ">
				<div className="flex gap-1 mr-4">
					{leftRounds.map((round) =>
						rounds[round] ? (
							<BadgeX key={round} color="red" />
						) : (
							<Badge key={round} color="white" />
						),
					)}
				</div>

				<div className="flex gap-1">
					{rightRounds.map((round) =>
						rounds[round] ? (
							<BadgeX key={round} color="red" />
						) : (
							<Badge key={round} color="white" />
						),
					)}
				</div>
			</div>
		</div>
	);
}

export { RoundTimer };
