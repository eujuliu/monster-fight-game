import { FormDialog, type FormField } from "@/components/form-dialog";
import { MonsterSelect } from "@/components/monster-select";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import { Slider } from "@/components/ui/slider";
import type { Monster } from "@/utils/monsters";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { NavLink } from "react-router";
import {
  getDefaultMonsters,
  getLocalStorageMonsters,
  setLocalStorageMonsters,
} from "@/utils/monsters";
import { MonsterCard } from "@/components/monster-card";

const formSchema = z.object({
  name: z
    .string()
    .nonempty()
    .min(3)
    .refine(
      (val) =>
        !getDefaultMonsters().some(
          (m) => m.name.toLowerCase().trim() == val.toLowerCase().trim(),
        ),
      { message: "This monster name is already in use" },
    ),
  image_url: z.string().url().nonempty(),
  hp: z.number().min(1).max(100),
  attack: z.number().min(1).max(100),
  defense: z.number().min(1).max(100),
  speed: z.number().min(1).max(100),
});

const fields: FormField[] = [
  {
    name: "name",
    label: "Name",
    control: (field) => (
      <Input placeholder="Type your monster name..." {...field} />
    ),
  },
  {
    name: "image_url",
    label: "Image",
    control: (field) => (
      <Input placeholder="Send your image link..." {...field} />
    ),
  },
  {
    name: "hp",
    label: "HP",
    description: "This is your monster life",
    control: (field) => (
      <div className="flex items-center gap-2">
        <Slider
          min={0}
          max={100}
          value={[field.value]}
          onValueChange={(value) => field.onChange(value[0])}
        />
        <Input
          className="w-min"
          min={0}
          max={100}
          type="number"
          value={field.value}
          onChange={(value) => field.onChange(Number(value.target.value))}
        />
      </div>
    ),
  },
  {
    name: "attack",
    label: "Attack",
    description: "This is your monster attack",
    control: (field) => (
      <div className="flex items-center gap-2">
        <Slider
          min={0}
          max={100}
          value={[field.value]}
          onValueChange={(value) => field.onChange(value[0])}
        />
        <Input
          className="w-min"
          min={0}
          max={100}
          type="number"
          value={field.value}
          onChange={(value) => field.onChange(Number(value.target.value))}
        />
      </div>
    ),
  },
  {
    name: "defense",
    label: "Defense",
    description: "This is your monster defense",
    control: (field) => (
      <div className="flex items-center gap-2">
        <Slider
          min={0}
          max={100}
          value={[field.value]}
          onValueChange={(value) => field.onChange(value[0])}
        />
        <Input
          className="w-min"
          min={0}
          max={100}
          type="number"
          value={field.value}
          onChange={(value) => field.onChange(Number(value.target.value))}
        />
      </div>
    ),
  },
  {
    name: "speed",
    label: "Speed",
    description: "This is your monster speed",
    control: (field) => (
      <div className="flex items-center gap-2">
        <Slider
          min={0}
          max={100}
          value={[field.value]}
          onValueChange={(value) => field.onChange(value[0])}
        />
        <Input
          className="w-min"
          min={0}
          max={100}
          type="number"
          value={field.value}
          onChange={(value) => field.onChange(Number(value.target.value))}
        />
      </div>
    ),
  },
];

function MonsterSelector() {
  const [selected, setSelected] = useState<
    Record<"left" | "right", Monster | null>
  >({
    left: null,
    right: null,
  });
  const [currentSelecting, setCurrentSelecting] = useState<"left" | "right">(
    "left",
  );
  const [monsters, setMonsters] = useState<Monster[]>([
    ...getDefaultMonsters(),
    ...getLocalStorageMonsters(),
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image_url: "",
      hp: 33,
      attack: 33,
      defense: 33,
      speed: 33,
    },
  });

  function getMonster(side: "left" | "right") {
    if (isMobile) {
      return selected[currentSelecting];
    }

    return selected[side];
  }

  function getCardShadow(side: "left" | "right") {
    const leftShadow =
      "shadow-[0px_0px_35px_0px_#4299e1] border-3 border-blue-500";
    const rightShadow =
      "shadow-[0px_0px_35px_0px_#f56565] border-3 border-red-500";

    if (isMobile) {
      return currentSelecting === "left" ? leftShadow : rightShadow;
    }

    if (side == "left" && currentSelecting == "left") return leftShadow;

    if (side == "right" && currentSelecting == "right") return rightShadow;

    return "";
  }

  function handleMonsterSelection(value: Monster) {
    setSelected({ ...selected, [currentSelecting]: value });
  }

  function onSubmit(values: Monster) {
    const newMonster = { ...values, id: monsters.length + 2 };
    setMonsters([...monsters, newMonster]);
    setLocalStorageMonsters(newMonster);
    form.reset();
    setDialogOpen(false);
  }

  return (
    <div className="bg-[url(/images/backgrounds/tavern.png)] h-full bg-cover bg-center ">
      <div className="flex justify-center h-full relative backdrop-blur-sm overflow-auto p-2 py-4 md:p-6">
        <div className="flex justify-center flex-col gap-2 md:gap-6 max-w-[1200px]">
          <header className="flex justify-end gap-2 w-full">
            <div className="w-full flex items-center justify-end gap-2">
              <Button
                asChild
                className="bg-white hover:bg-neutral-300 text-neutral-800"
              >
                <NavLink to="/">Back</NavLink>
              </Button>

              <FormDialog<Monster>
                open={dialogOpen}
                form={form}
                fields={fields}
                trigger={
                  <Button className="bg-white hover:bg-neutral-300 text-neutral-800">
                    New
                  </Button>
                }
                triggerAsChild
                title="Create a Monster"
                description="Here you will create your monster that will be used in the battles, choose the stats in a carefull way"
                onSubmit={onSubmit}
                onChangeOpen={setDialogOpen}
              />

              <Button
                asChild
                className={`bg-red-500 hover:bg-red-600-300 text-neutral-50 ${!selected.left || !selected.right ? "pointer-events-none opacity-50" : ""}`}
              >
                <NavLink
                  to={`/battle?left=${selected.left?.id}&right=${selected.right?.id}`}
                >
                  Fight
                </NavLink>
              </Button>
            </div>
          </header>

          <div className="absolute right-2 top-1/2 z-10 flex flex-col gap-2 md:hidden">
            <Button
              className={`bg-blue-500 hover:bg-blue-700 ${currentSelecting == "left" ? "pointer-events-none opacity-50" : ""}`}
              onClick={() => setCurrentSelecting("left")}
            >
              Left
            </Button>
            <Button
              className={`bg-red-500 hover:bg-red-700 ${currentSelecting == "right" ? "pointer-events-none opacity-50" : ""}`}
              onClick={() => setCurrentSelecting("right")}
            >
              Right
            </Button>
          </div>

          <div className="flex justify-around w-full my-auto">
            <MonsterCard
              monster={getMonster("left")}
              className={`${getCardShadow("left")}`}
              onClick={() => setCurrentSelecting("left")}
            />

            {!isMobile && (
              <MonsterCard
                monster={getMonster("right")}
                className={`${getCardShadow("right")}`}
                onClick={() => setCurrentSelecting("right")}
              />
            )}
          </div>

          <MonsterSelect
            monsters={monsters}
            onChangeMonster={handleMonsterSelection}
            value={selected}
            multiple
            pageSize={isMobile ? 12 : 30}
          />
        </div>
      </div>
    </div>
  );
}

export default MonsterSelector;
