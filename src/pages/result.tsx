import { BattleLogPanel } from "@/components/battle-log-panel";
import { Information } from "@/components/information";
import { Button } from "@/components/ui/button";
import { getBattleById } from "@/utils/battles";
import { NavLink, useNavigate, useParams } from "react-router";

function Result() {
  const { battleId } = useParams();
  const battle = getBattleById(Number(battleId));
  const navigate = useNavigate();

  if (!battle) {
    navigate("/");
    return <div>Battle Not Found</div>;
  }

  return (
    <div className="bg-[url(/images/backgrounds/tavern.png)] h-full bg-cover bg-center">
      <div className="flex items-center justify-center gap-4 flex-col h-full backdrop-blur-sm ">
        <div className="flex items-center flex-col gap-4 p-2 max-w-[1200px]">
          <div className="text-5xl font-bold flex gap-2 text-neutral-50">
            Winner
          </div>
          <div className="flex items-center flex-col w-full">
            <img
              className="max-h-[calc(100vh-600px)]"
              src={battle.winner?.image_url || "/images/monsters/humanoid.png"}
            />
            <div className="w-full">
              <div className="text-2xl font-bold text-neutral-50">
                {battle.winner?.name || "????????"}
              </div>
              <Information
                name="hp"
                label="HP"
                value={battle.winner?.hp as number}
              />
            </div>
          </div>

          <BattleLogPanel logs={battle.logs} className="mt-auto" />

          <div className="flex justify-end gap-2 w-full">
            <Button
              asChild
              className="bg-white hover:bg-neutral-300 text-neutral-800"
            >
              <NavLink to="/">Menu</NavLink>
            </Button>
            <Button
              asChild
              className="bg-white hover:bg-neutral-300 text-neutral-800"
            >
              <NavLink to="/characters">Next</NavLink>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;
