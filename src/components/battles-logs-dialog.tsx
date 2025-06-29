import { useState } from "react";
import { type Battle, getLocalStorageBattles } from "@/utils/battles";
import { formatTimestampToDate } from "@/utils/date";
import { BattleInfo } from "./battle-info";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";
import { Tabs, TabsContent } from "./ui/tabs";

type Tabs = "battles" | "info";

function BattleLogsDialog() {
	const [tab, setTab] = useState<Tabs>("battles");
	const [currentBattle, setCurrentBattle] = useState<Battle | null>();
	const battles = getLocalStorageBattles();
	const [open, setOpen] = useState(false);

	function handleBattle(battle: Battle) {
		setCurrentBattle(battle);
		setTab("info");
	}

	function handleFooterButton() {
		if (tab === "battles") {
			setOpen(false);
			return;
		}

		setTab("battles");
	}

	function getFooterButtonText() {
		if (tab === "battles") return "Close";

		return "Back";
	}

	return (
		<Dialog open={open} onOpenChange={(v) => setOpen(v)}>
			<DialogTrigger asChild className="w-full">
				<Button>Logs</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-fit">
				<DialogHeader>
					<DialogTitle>Battle Logs</DialogTitle>
					<DialogDescription>
						Here you can see the last battles logs
					</DialogDescription>
				</DialogHeader>
				<div className="flex items-center gap-2">
					<Tabs
						defaultValue={tab}
						value={tab}
						onValueChange={(v) => setTab(v as Tabs)}
					>
						<TabsContent value="battles">
							<div className="border-1 max-h-[500px] max-w-[calc(100vw-80px)] overflow-auto">
								<Table className="min-h-[300px] min-w-[400px]">
									<TableHeader>
										<TableRow>
											<TableHead className="font-bold">ID</TableHead>
											<TableHead className="font-bold">Winner</TableHead>
											<TableHead className="font-bold">Start</TableHead>
											<TableHead className="font-bold">End</TableHead>
											<TableHead className="font-bold">Left</TableHead>
											<TableHead className="font-bold">Right</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{battles.map((battle) => (
											<TableRow
												key={battle.id}
												className="cursor-pointer"
												onClick={() => handleBattle(battle)}
											>
												<TableCell className="font-bold">{battle.id}</TableCell>
												<TableCell className="text-amber-500 font-bold">
													{battle.winner?.name}
												</TableCell>
												<TableCell>
													{formatTimestampToDate(battle.start)}
												</TableCell>
												<TableCell>
													{formatTimestampToDate(battle.end)}
												</TableCell>
												<TableCell className="text-blue-500 font-bold">
													{battle.leftMonster.name}
												</TableCell>
												<TableCell className="text-red-500 font-bold">
													{battle.rightMonster.name}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
									<TableFooter>
										<TableRow>
											<TableCell colSpan={5}>Total</TableCell>
											<TableCell className="text-right">
												{battles.length}
											</TableCell>
										</TableRow>
									</TableFooter>
								</Table>
							</div>
						</TabsContent>

						<TabsContent value="info">
							{currentBattle ? (
								<BattleInfo battle={currentBattle} />
							) : (
								"No battle selected"
							)}
						</TabsContent>
					</Tabs>
				</div>
				<DialogFooter className="justify-end">
					<Button type="button" onClick={handleFooterButton}>
						{getFooterButtonText()}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export { BattleLogsDialog };
