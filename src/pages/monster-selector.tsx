import { FormDialog, type FormField } from "@/components/form-dialog";
import { MonsterSelect } from "@/components/monster-select";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import type { Monster, MonsterInfoKeys } from "@/utils/monsters";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { NavLink } from "react-router";
import { Information } from "@/components/information";
import {
  getDefaultMonsters,
  getLocalStorageMonsters,
  setLocalStorageMonsters,
} from "@/utils/monsters";

type Info = {
  label: string;
  name: MonsterInfoKeys;
};

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
const informations: Info[] = [
  { label: "HP", name: "hp" },
  { label: "Attack", name: "attack" },
  { label: "Defense", name: "defense" },
  { label: "Speed", name: "speed" },
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

  function handleMonsterSelection(value: Monster) {
    if (!selected.left) {
      setSelected({ ...selected, left: value });
      setCurrentSelecting("right");
    }
    if (selected.left && !selected.right)
      setSelected({ ...selected, right: value });
  }

  function onSubmit(values: Monster) {
    const newMonster = { ...values, id: monsters.length + 2 };
    setMonsters([...monsters, newMonster]);
    setLocalStorageMonsters(newMonster);
    form.reset();
    setDialogOpen(false);
  }

  return (
    <div className="flex items-center justify-center flex-col gap-2 h-full relative">
      <header className="flex justify-between gap-2 w-full pt-2">
        <div>
          <Button
            variant="ghost"
            className={currentSelecting == "left" ? "font-bold" : ""}
            onClick={() => setCurrentSelecting("left")}
          >
            Left
          </Button>
          <Button
            variant="ghost"
            className={currentSelecting == "right" ? "font-bold" : ""}
            onClick={() => setCurrentSelecting("right")}
          >
            Right
          </Button>
        </div>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button>Informations</Button>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-2">
              {informations.map(({ label, name }) => (
                <Information
                  key={name}
                  name={name}
                  label={label}
                  value={(selected[currentSelecting]?.[name] as number) || 0}
                />
              ))}
            </PopoverContent>
          </Popover>

          <FormDialog<Monster>
            open={dialogOpen}
            form={form}
            fields={fields}
            trigger={<Button>New</Button>}
            triggerAsChild
            title="Create a Monster"
            description="Here you will create your monster that will be used in the battles, choose the stats in a carefull way"
            onSubmit={onSubmit}
            onChangeOpen={setDialogOpen}
          />
        </div>
      </header>

      <img
        src={
          selected[currentSelecting]?.image_url ||
          "/images/monsters/humanoid.jpg"
        }
        alt={`A monster with name ${selected[currentSelecting]?.name}`}
        className="h-full max-h-[calc(100vh-426px)] w-full object-contain"
      />
      <div className="text-2xl font-bold self-start">
        {selected[currentSelecting]?.name || "?????"}
      </div>

      <MonsterSelect
        monsters={monsters}
        className="mt-auto"
        onChangeMonster={handleMonsterSelection}
        value={selected}
      />

      <div className="w-full flex items-center justify-end gap-2">
        <Button asChild>
          <NavLink to="/">Back</NavLink>
        </Button>
        <Button asChild>
          <NavLink
            to={`/battle?left=${selected.left?.id}&right=${selected.right?.id}`}
          >
            Fight
          </NavLink>
        </Button>
      </div>
    </div>
  );
}

export default MonsterSelector;
