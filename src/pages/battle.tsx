import type { BattleLog } from "@/components/battle-log-panel";
import { LifeBar } from "@/components/life-bar";
import { RoundTimer } from "@/components/round-timer";
import { useInterval } from "@/hooks/use-interval";
import { createBattle, type Battle } from "@/utils/battles";
import { getMonster } from "@/utils/monsters";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

function Battle() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [battle, setBattle] = useState<Battle>();
  const [log, setLog] = useState<BattleLog>();
  const [isRunning, setRunning] = useState(false);
  const [delay] = useState(1000);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [lifes, setLifes] = useState({ left: 100, right: 100 });

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
        if (log.type === "attack") attack(log.hp || 0, log.side);
        if (log.type === "roundStart")
          setLifes({ left: log.leftMonster.hp, right: log.rightMonster.hp });
        if (log.type === "end") {
          navigate(`/result/${battle.id}`);
        }
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

  return (
    <div>
      <header>
        <LifeBar
          totalHp={battle.leftMonster.hp}
          partialHp={lifes.left}
          name={battle.leftMonster.name}
          direction="right"
          image_url={battle.leftMonster.image_url}
        />
        <RoundTimer />
        <LifeBar
          totalHp={battle.rightMonster.hp}
          partialHp={lifes.right}
          name={battle.rightMonster.name}
          direction="left"
          image_url={battle.rightMonster.image_url}
        />
      </header>

      <div className="flex flex-col justify-between">
        <img className="max-w-3/4" src={battle.leftMonster.image_url} />
        <img
          className="max-w-3/4 self-end"
          src={battle.rightMonster.image_url}
        />
      </div>
    </div>
  );
}

export default Battle;
