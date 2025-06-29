import type { BattleLog } from "@/components/battle-log-panel";
import { LifeBar } from "@/components/life-bar";
import { MonsterCard } from "@/components/monster-card";
import { RoundTimer } from "@/components/round-timer";
import { useInterval } from "@/hooks/use-interval";
import { createBattle, type Battle } from "@/utils/battles";
import { getMonster, type Monster } from "@/utils/monsters";
import { useEffect, useReducer, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

type RoundsState = Record<string, boolean>;
type RoundsAction = { winner: string };

const initalRoundsState: RoundsState = {
  "left-1": false,
  "left-2": false,
  "right-2": false,
  "right-1": false,
};

function roundsReducer(state: RoundsState, action: RoundsAction): RoundsState {
  if (action.winner in state) {
    return { ...state, [action.winner]: true };
  }
  return state;
}

function Battle() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [roundsWinners, setRoundWinner] = useReducer(
    roundsReducer,
    initalRoundsState,
  );

  const [battle, setBattle] = useState<Battle>();
  const [log, setLog] = useState<BattleLog>();
  const [isRunning, setRunning] = useState(false);
  const [delay] = useState(1000);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [lifes, setLifes] = useState({ left: 100, right: 100 });
  const [timer, setTimer] = useState(59);
  const [attacker, setAttacker] = useState<Monster | null>(null);

  useEffect(() => {
    const leftMonster = getMonster(Number(searchParams.get("left")));
    const rightMonster = getMonster(Number(searchParams.get("right")));

    if (!leftMonster || !rightMonster) {
      navigate("/characters");
      return;
    }

    setBattle(createBattle(leftMonster, rightMonster));
    setRunning(true);
    setLifes({ left: leftMonster.hp, right: rightMonster.hp });
  }, [searchParams, navigate]);

  useInterval(
    () => {
      if (!battle || currentLogIndex == battle.logs.length + 1) {
        setRunning(false);
        return;
      }

      setLog(battle.logs[currentLogIndex]);
      setCurrentLogIndex(currentLogIndex + 1);

      if (log) {
        setTimer(timer - 1);
        if (log.type === "attack") {
          attack(log.hp, log.side);
          setAttacker(log.attacker);
        }
        if (log.type === "roundStart") {
          setTimer(59);
          setLifes({ left: log.leftMonster.hp, right: log.rightMonster.hp });
        }
        if (log.type === "defeat") {
          setRoundWinner({ winner: `${log.side}-${log.winnerVictories}` });
        }

        // if (log.type === "end") {
        //   navigate(`/result/${battle.id}`);
        // }
      }
    },
    isRunning ? delay : null,
  );

  if (!battle) {
    return <div>Is not possible to initialize this battle</div>;
  }

  function attack(hp: number, side: "left" | "right") {
    if (!battle) return;

    setLifes({ ...lifes, [side]: hp });
  }

  function setCardHightLight(id: number, side: "left" | "right") {
    const shadow = {
      left: "shadow-[0px_0px_35px_0px_#4299e1] border-3 border-blue-500",
      right: "shadow-[0px_0px_35px_0px_#f56565] border-3 border-red-500",
    };

    if (attacker?.id === id && side) return shadow[side] + " border-2 z-10";

    return "";
  }

  return (
    <div className="bg-[url(/images/backgrounds/battle-field.jpg)] h-full bg-cover bg-center">
      <div className="flex justify-center w-full h-full p-4 backdrop-blur-lg">
        <div className="w-full max-w-[1200px]">
          <div className="flex flex-col gap-2 w-full md:flex-row md:item-center md:justify-between md:gap-8">
            <LifeBar
              totalHp={battle.leftMonster.hp}
              partialHp={lifes.left}
              name={battle.leftMonster.name}
              direction="right"
              image_url={battle.leftMonster.image_url}
            />
            <RoundTimer count={timer} rounds={roundsWinners} />
            <LifeBar
              totalHp={battle.rightMonster.hp}
              partialHp={lifes.right}
              name={battle.rightMonster.name}
              direction="left"
              image_url={battle.rightMonster.image_url}
            />
          </div>

          <div className="relative h-full w-full flex justify-around items-center md:gap-4">
            <MonsterCard
              monster={battle.leftMonster}
              className={`absolute top-5 -left-10 scale-75 md:static md:scale-100 ${setCardHightLight(battle.leftMonster.id, "left")}`}
            />
            <MonsterCard
              monster={battle.rightMonster}
              className={`absolute -top-5 -right-10 scale-75 md:static md:scale-100 ${setCardHightLight(battle.rightMonster.id, "right")}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Battle;
