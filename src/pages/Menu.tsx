import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";

function Menu() {
  const [mode, setMode] = useState("start");

  return (
    <div className="flex items-center justify-center flex-col gap-4 h-full">
      <h1 className="font-black text-7xl text-center">Monster Fight</h1>

      <Tabs defaultValue={mode} value={mode} onValueChange={(v) => setMode(v)}>
        <TabsContent value="start">
          <Button size="lg" onClick={() => setMode("mode-selector")}>
            Start
          </Button>
        </TabsContent>
        <TabsContent
          value="mode-selector"
          className="flex flex-col items-center justify-center gap-2"
        >
          <Button size="lg">Tournament</Button>
          <Button size="lg">Free Mode</Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Menu;
