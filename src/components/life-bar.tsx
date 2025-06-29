type Props = {
	image_url: string;
	name: string;
	totalHp: number;
	partialHp: number;
	direction: "left" | "right";
};

function LifeBar({ image_url, name, totalHp, partialHp, direction }: Props) {
	return (
		<div
			className={`flex gap-2 w-full ${direction == "left" && "flex-row-reverse"}`}
		>
			<div
				className={`bg-neutral-100 w-[75px] h-[70px] rounded-full border-2 ${direction == "left" ? "border-blue-500" : "border-red-500"}`}
			>
				<img
					className="w-full h-full object-cover object-top"
					src={image_url || "/monsters/humanoid.jpg"}
					alt={`A monster with name ${name}`}
				/>
			</div>
			<div
				className={`flex flex-col w-full gap-2 ${direction == "left" && "items-end"}`}
			>
				<div className="text-lg text-white px-2 font-bold rounded-lg border-1 bg-black/70 w-fit">
					{name || "?????"}
				</div>
				<div
					className={`w-full h-3.5 border-1 rounded-sm flex ${direction == "left" && "justify-end"}`}
				>
					<div
						className="bg-red-500 h-full rounded-sm "
						style={{ width: `${(partialHp / totalHp) * 100}%` }}
					></div>
				</div>
			</div>
		</div>
	);
}

export { LifeBar };
