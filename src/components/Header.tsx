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
          fontSize: "1.3rem", // tutaj możesz ustawić dowolny rozmiar
          fontWeight: 500, // opcjonalnie: pogrubienie
        }}
      >
        Formularz pobrania danych z tachografu cyfrowego.
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;


