import { BattleLogPanel, type BattleLog } from "@/components/battle-log-panel";
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
    <div className="flex items-center gap-4 flex-col h-full">
      <div className="text-5xl font-bold">Winner</div>
      <div className="flex items-center flex-col w-full">
        <img
          className="max-h-[calc(100vh-600px)]"
          src={battle.winner?.image_url || "/images/monsters/humanoid.png"}
        />
        <div className="w-full">
          <div className="text-xl font-bold">
            {battle.winner?.name || "?????"}
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
        <Button asChild>
          <NavLink to="/">Menu</NavLink>
        </Button>
        <Button asChild>
          <NavLink to="/characters">Next</NavLink>
        </Button>
      </div>
    </div>
  );
}

export default Result;
