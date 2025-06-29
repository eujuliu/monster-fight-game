import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import "./index.css";
import Battle from "./pages/battle";
import Menu from "./pages/menu";
import MonsterSelector from "./pages/monster-selector";
import Result from "./pages/result";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Menu />} />
        <Route path="/characters" element={<MonsterSelector />} />
        <Route path="/battle" element={<Battle />} />
        <Route path="/result/:battleId" element={<Result />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
