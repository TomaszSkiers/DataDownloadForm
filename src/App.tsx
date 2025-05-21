import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./components/Home"; // <--- dodaj ten import
import { CssBaseline } from "@mui/material";

const App: React.FC = () => (
  <>
  <CssBaseline />
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} /> {/* <-- Strona domowa */}
        {/* Tu możesz dodać kolejne podstrony */}
      </Route>
    </Routes>
  </BrowserRouter>
  </>
);

export default App;
