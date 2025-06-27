import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Routes } from "react-router";
import { Route } from "react-router";

import "./index.css";
import Menu from "./pages/menu";
import MonsterSelection from "./pages/monster-selection";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route index element={<Menu />} />
				<Route path="/characters" element={<MonsterSelection />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
