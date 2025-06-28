import type { Monster } from "@/utils/monsters";
import { type HTMLAttributes, type ReactNode } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { chunkArray } from "@/utils/arrays";
import { Button } from "./ui/button";
import { cn } from "@/utils/shadcn";

type Value = number | Record<"left" | "right", Monster | null>;

type Props = {
  monsters: Monster[];
  value?: Value;
  onChangeMonster: (monster: Monster) => void;
  multiple?: boolean;
  pageSize?: number;
} & HTMLAttributes<HTMLDivElement>;

function MonsterSelect({
  monsters,
  value,
  onChangeMonster,
  multiple,
  pageSize = 12,
  ...rest
}: Props) {
  const chunkedMonsters = chunkArray(monsters, pageSize);

  function getSelected(id: number) {
    let one = false;
    let two = false;

    if (multiple && value && typeof value === "object") {
      one = value.left?.id === id;
      two = value.right?.id === id;
    } else if (!multiple && value && typeof value === "number") {
      one = value === id;
    }

    const Parent = ({ children }: { children?: ReactNode }) => (
      <div className="absolute w-full h-full bg-neutral-600/60 rounded-md flex items-center justify-center text-xl font-bold">
        {children}
      </div>
    );
    const left = <span className="text-blue-500">L</span>;
    const right = <span className="text-red-500">R</span>;

    if (one && two)
      return (
        <Parent>
          {left}/{right}
        </Parent>
      );
    if (one) return <Parent>{left}</Parent>;
    if (two) return <Parent>{right}</Parent>;

    return "";
  }

  return (
    <Carousel
      {...rest}
      className={cn("p-2 mb-2 md:mx-10", rest.className)}
      opts={{
        align: "center",
        loop: true,
      }}
    >
      <CarouselContent>
        {chunkedMonsters.map((chunk, key) => (
          <CarouselItem
            className="grid grid-cols-4 grid-rows-3 gap-4 md:grid-cols-10"
            key={key}
          >
            {chunk.map((monster) => (
              <Button
                key={monster.id}
                className={`relative w-full max-w-[90px] h-full max-h-[90px] p-0 bg-white hover:bg-neutral-200 border-2`}
                onClick={() => onChangeMonster(monster)}
              >
                <img
                  src={monster.image_url}
                  className="h-20 w-full rounded-md object-cover object-top"
                />

                {getSelected(monster.id)}
              </Button>
            ))}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-0 md:-left-4" />
      <CarouselNext className="-right-0 md:-right-4" />
    </Carousel>
  );
}

export { MonsterSelect };
