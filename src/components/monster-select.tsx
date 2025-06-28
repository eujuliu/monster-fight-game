import { Button } from "./ui/button";
import type { Monster } from "@/utils/monsters";
import type { HTMLAttributes } from "react";
import { X } from "lucide-react";

type Value = number | Record<"left" | "right", Monster | null>;

type Props = {
  monsters: Monster[];
  value?: Value;
  onChangeMonster?: (monster: Monster) => void;
  multiple?: boolean;
} & HTMLAttributes<HTMLDivElement>;

function MonsterSelect({
  monsters,
  value,
  onChangeMonster,
  multiple,
  ...rest
}: Props) {
  const styles = `flex flex-wrap justify-center gap-2 p-2 border-1 rounded-lg bg-neutral-200 max-h-[215px] overflow-y-auto ${rest.className}`;

  function getSelectedStyle(id: number) {
    if (!value) return "";

    if (!(typeof value === "object"))
      return value == id && "border-blue-400 scale-105";

    if (value.left && value.left.id === id) return "border-blue-400 scale-105";
    if (value.right && value.right.id === id)
      return "border-pink-400 scale-105";
  }

  return (
    <div {...rest} className={styles}>
      {monsters.map((monster) => (
        <Button
          key={monster.id}
          asChild
          className={`border-2 border-neutral-500 rounded-md bg-white cursor-pointer h-auto w-auto p-0 relative ${getSelectedStyle(monster.id)}`}
          variant="ghost"
          onClick={() => onChangeMonster && onChangeMonster(monster)}
        >
          <div>
            {monster.id === value ? (
              <>
                <Button
                  variant="ghost"
                  className="!p-0 h-fit w-fit absolute -top-2 -right-2 bg-white cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <X />
                </Button>
              </>
            ) : null}

            <img
              src={monster.image_url}
              alt={`A monster with name ${monster.name}`}
              className="w-14 h-14 rounded-md object-cover object-top"
            />
          </div>
        </Button>
      ))}
    </div>
  );
}

export { MonsterSelect };
