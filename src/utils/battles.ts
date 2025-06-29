import type { BattleLog, LogType } from "@/components/battle-log-panel";
import type { Monster } from "./monsters";

const MINUTE_IN_MS = 60000;

type GenerateLogData = {
	id: number;
	timestamp: number;
	round: number;
	loser?: Monster;
	winner?: Monster;
	attacker?: Monster;
	defenser?: Monster;
	leftMonster?: Monster;
	rightMonster?: Monster;
	damage?: number;
	hp?: number;
	side?: "left" | "right";
	winnerVictories?: number;
};

export type Battle = {
	id: number;
	start: number;
	end: number;
	logs: BattleLog[];
	leftMonster: Monster;
	rightMonster: Monster;
	winner: Monster | null;
};

const key = "monster-fight:battles";

function setLocalStorageBattle(battle: Battle): Battle[] {
	const old = getLocalStorageBattles();

	localStorage.setItem(key, JSON.stringify([...old, battle]));

	return getLocalStorageBattles();
}

function getLocalStorageBattles(): Battle[] {
	const str = localStorage.getItem(key);

	if (str) {
		return JSON.parse(str);
	}

	return [];
}

function getBattleById(id: number) {
	return getLocalStorageBattles().find((battle) => battle.id == id);
}

function createBattle(leftMonster: Monster, rightMonster: Monster) {
	const battle: Battle = {
		id: getLocalStorageBattles().length + 1,
		logs: [],
		start: new Date().getTime(),
		end: 0,
		leftMonster,
		rightMonster,
		winner: null,
	};

	const firstToAttack = getFirstMonsterToAttack([leftMonster, rightMonster]);
	const firstToDefese =
		firstToAttack == leftMonster ? rightMonster : leftMonster;

	const data = {
		start: battle.start,
		victories: {
			[leftMonster.id]: 0,
			[rightMonster.id]: 0,
		},
		round: 1,
		timestamp: battle.start,
		attacker: structuredClone(firstToAttack),
		defenser: structuredClone(firstToDefese),
	};

	while (true) {
		if (
			data.timestamp > data.start + MINUTE_IN_MS ||
			data.attacker.hp < 1 ||
			data.defenser.hp < 1
		) {
			const winner = data.attacker.hp > 1 ? data.attacker : data.defenser;
			const loser = data.defenser.hp < 1 ? data.defenser : data.attacker;

			data.victories[winner.id] += 1;

			battle.logs.push(
				generateLog("defeat", {
					id: getLogId(battle.logs),
					round: data.round,
					timestamp: data.timestamp,
					loser: structuredClone(loser),
					side: winner.id === leftMonster.id ? "left" : "right",
					winnerVictories: data.victories[winner.id],
				}),
			);

			if (
				data.round > 3 ||
				Object.values(data.victories).some((victory) => victory == 2)
			) {
				battle.logs.push(
					generateLog("end", {
						id: getLogId(battle.logs),
						round: data.round,
						timestamp: data.timestamp,
						winner,
					}),
				);
				battle.end = data.timestamp;
				battle.winner = winner;

				break;
			}

			data.round += 1;
			data.attacker = structuredClone(firstToAttack);
			data.defenser = structuredClone(firstToDefese);
			data.start = data.timestamp;

			battle.logs.push(
				generateLog("roundEnd", {
					id: getLogId(battle.logs),
					round: data.round - 1,
					timestamp: data.timestamp,
				}),
			);

			if (data.round < 4) {
				battle.logs.push(
					generateLog("roundStart", {
						id: getLogId(battle.logs),
						round: data.round,
						timestamp: data.timestamp,
						leftMonster,
						rightMonster,
					}),
				);
			}

			continue;
		}

		const damage = calculateDamage(data.attacker.attack, data.defenser.defense);
		data.defenser.hp -= damage;

		if (data.defenser.hp < 0) data.defenser.hp = 0;

		battle.logs.push(
			generateLog("attack", {
				id: getLogId(battle.logs),
				timestamp: data.timestamp,
				damage,
				hp: data.defenser.hp,
				round: data.round,
				attacker: structuredClone(data.attacker),
				defenser: structuredClone(data.defenser),
				side: data.attacker.id === leftMonster.id ? "right" : "left",
			}),
		);

		const attacker = data.attacker;
		data.attacker = data.defenser;
		data.defenser = attacker;
		data.timestamp += randomIntFromInterval(100, 500);
	}

	setLocalStorageBattle(battle);

	return battle;
}

function getLogId(logs: BattleLog[]) {
	return logs.length + 1;
}

function randomIntFromInterval(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateLog(type: LogType, data: GenerateLogData) {
	const messages: Record<LogType, string> = {
		roundStart: `Round ${data.round} started`,
		roundEnd: `Round ${data.round} finished!`,
		defeat: `${data?.loser?.name} lost the round!`,
		start: `Battle started!`,
		end: `${data?.winner?.name} won the battle!`,
		attack: `${data?.attacker?.name} attacked ${data?.defenser?.name} and give ${data.damage} damage`,
	};

	// @ts-ignore
	const log: BattleLog = {
		...data,
		message: messages[type],
		type,
	};

	return log;
}

function calculateDamage(attack: number, defense: number) {
	const damage = attack - defense;

	if (damage < 1) return 1;

	return damage;
}

function getFirstMonsterToAttack(monsters: Monster[]): Monster {
	return monsters.reduce<Monster>((monster, crr) => {
		if (crr.speed > monster.speed) return crr;
		if (crr.speed === monster.speed && crr.attack > monster.attack) return crr;

		return monster;
	}, monsters[0]);
}

export {
	createBattle,
	setLocalStorageBattle,
	getLocalStorageBattles,
	getBattleById,
};
