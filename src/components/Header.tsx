import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Header: React.FC = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography
        component="div"
        sx={{
          flex: 1,
          textAlign: "center",
          fontSize: "1.2rem", // tutaj możesz ustawić dowolny rozmiar
          fontWeight: 500, // opcjonalnie: pogrubienie
        }}
      >
        Formularze dla serwisu warsztatu tachografów cyfrowych.
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;


