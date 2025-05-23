import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

const HEADER_HEIGHT = 64; // lub inna wysokość Twojego headera w px
const FOOTER_HEIGHT = 56; // lub inna wysokość Twojego footera w px

const MainLayout: React.FC = () => (
  <Box
    sx={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    }}
  >
    {/* HEADER */}
    <Box
      sx={{
        height: HEADER_HEIGHT,
        position: "sticky",
        top: 0,
        zIndex: 1201,
        bgcolor: "background.paper",
        flexShrink: 0,
      }}
    >
      <Header />
    </Box>

    {/* MAIN CONTENT (scrollable) */}
    <Box
      sx={{
        flex: 1,
        minHeight: 0,
        overflow: "auto",
        display: "flex",
        justifyContent: "center",
        py: 3,
      }}
    >
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

    {/* FOOTER */}
    <Box
      sx={{
        height: FOOTER_HEIGHT,
        position: "sticky",
        bottom: 0,
        zIndex: 1201,
        bgcolor: "background.paper",
        flexShrink: 0,
      }}
    >
      <Footer />
    </Box>
  </Box>
);

export default MainLayout;

