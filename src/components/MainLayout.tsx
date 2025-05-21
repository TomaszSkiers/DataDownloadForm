import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

const MainLayout: React.FC = () => (
  <Box maxWidth='md' sx={{margin: '0 auto', minHeight: "100vh", display: "flex", flexDirection: "column" }}>
    <Header />
    <Box sx={{ flex: 1, display: "flex", justifyContent: "center", py: 3 }}>
      <Container
        sx={{
          maxWidth: "900px !important",
          width: "100%",
          px: 2,
        }}
      >
        <Outlet />
      </Container>
    </Box>
    <Footer />
  </Box>
);

export default MainLayout;
