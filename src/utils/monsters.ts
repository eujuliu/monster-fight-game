import { defaultMonsters } from "@/data/monsters.json";

export type Monster = {
  id: number;
  name: string;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  image_url: string;
};

export type MonsterInfoKeys = "hp" | "attack" | "defense" | "speed";

const key = "monster-fight:monsters";

function getLocalStorageMonsters(): Monster[] {
  const str = localStorage.getItem(key);

  if (str) {
    return JSON.parse(str);
  }

  return [];
}

function setLocalStorageMonsters(monster: Monster): Monster[] {
  const old = getLocalStorageMonsters();

  localStorage.setItem(key, JSON.stringify([...old, monster]));

  return getLocalStorageMonsters();
}

function getDefaultMonsters() {
  return defaultMonsters || [];
}

function getAllMonsters(): Monster[] {
  return [...getDefaultMonsters(), ...getLocalStorageMonsters()];
}

function getMonster(id?: number, name?: string): Monster | undefined {
  if (!id && !name) return undefined;

  return getAllMonsters().find(
    (monster) => monster.id === id || monster.name === name,
  );
}

export {
  getLocalStorageMonsters,
  setLocalStorageMonsters,
  getDefaultMonsters,
  getAllMonsters,
  getMonster,
};
