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
      className={`flex items-center gap-2 ${direction == "left" && "flex-row-reverse"}`}
    >
      <img
        className="w-16 h-16 border-2 rounded-full object-cover object-top"
        src={image_url || "/monsters/humanoid.jpg"}
        alt={`A monster with name ${name}`}
      />
      <div
        className={`flex flex-col w-full ${direction == "left" && "items-end"}`}
      >
        <div className="text-lg font-bold">{name || "?????"}</div>
        <div className="w-full h-3.5 border-2 rounded-sm">
          <div
            className="bg-red-500 h-full rounded-sm"
            style={{ width: `${(partialHp / totalHp) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export { LifeBar };
