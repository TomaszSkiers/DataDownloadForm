import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home2 from "./components/home2/Home2";
import { CssBaseline } from "@mui/material";
import Info from "./components/Info/Info";
import { Settings3 } from "./components/Settings/Settings3";

const App: React.FC = () => (
  <>
    <CssBaseline />
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home2 />} />
          <Route path="info" element={<Info />} />
          <Route path="settings" element={<Settings3 />} />
        </Route>
      </Routes>
    </HashRouter>
  </>
);

export default App;
