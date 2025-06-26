import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Routes } from "react-router";
import { Route } from "react-router";

import "./index.css";
import Menu from "./pages/Menu";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Menu />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
