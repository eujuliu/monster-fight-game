import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { NavLink } from "react-router";

function Menu() {
  const [tab, setTab] = useState("start");

  return (
    <div className="flex items-center justify-center flex-col gap-4 h-full">
      <h1 className="font-black text-7xl text-center">Monster Fight</h1>

      <Tabs defaultValue={tab} value={tab} onValueChange={(v) => setTab(v)}>
        <TabsContent value="start">
          {/* onClick={() => setTab("mode-selector")} */}
          <Button size="lg">
            <NavLink to="/characters">Start</NavLink>
          </Button>
        </TabsContent>
        <TabsContent
          value="mode-selector"
          className="flex flex-col items-center justify-center gap-2"
        >
          <Button size="lg">Tournament</Button>
          <Button size="lg" asChild>
            <NavLink to="/characters">Free Mode</NavLink>
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Menu;
