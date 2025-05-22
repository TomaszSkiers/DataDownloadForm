import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home2 from "./components/home2/Home2";
import { CssBaseline } from "@mui/material";


const App: React.FC = () => (
  <>
  <CssBaseline />
  <HashRouter>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home2 />} /> {/* <-- Strona domowa */}
        {/* Tu możesz dodać kolejne podstrony */}
      </Route>
    </Routes>
  </HashRouter>
  </>
);

export default App;
