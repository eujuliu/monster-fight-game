import { useState } from "react";
import { NavLink } from "react-router";
import { BattleLogsDialog } from "@/components/battles-logs-dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
//@ts-ignore
import Logo from "../assets/logo.svg?react";

type TabType = "start" | "mode-selector";

function Menu() {
  const [tab, setTab] = useState<TabType>("start");

  return (
    <div className="bg-[url(/images/backgrounds/guillaume-lucbert-sewers.jpg)] h-full bg-cover bg-center">
      <div className="flex items-center justify-center w-full h-full p-4 backdrop-blur-lg">
        <div className="flex items-center justify-center flex-col gap-4 w-full">
          <Logo className="max-w-[700px]" />

          <Tabs
            defaultValue={tab}
            value={tab}
            onValueChange={(v) => setTab(v as TabType)}
          >
            <TabsContent value="start">
              <Button
                size="lg"
                className="text-xl font-bold"
                onClick={() => setTab("mode-selector")}
              >
                Start
              </Button>
            </TabsContent>

            <TabsContent
              value="mode-selector"
              className="flex flex-col items-center justify-center gap-2"
            >
              <Button size="lg" className="w-full" asChild>
                <NavLink to="/characters">Battle</NavLink>
              </Button>

              <BattleLogsDialog />

              <Button
                size="lg"
                className="w-full"
                onClick={() => setTab("start")}
              >
                Home
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Menu;
