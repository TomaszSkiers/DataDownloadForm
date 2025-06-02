
// import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { AppBar, Button, Toolbar} from "@mui/material";

import { NavLink } from "react-router-dom";
import { toolbarSx } from "./Header.styles";




const Header = () => (
  <AppBar position="static" color="default" sx={{ mb: 2 }}>
    <Toolbar sx={toolbarSx}>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "primary.main" }}>
        Formularz pobrania danych z tachografu
      </Typography>
      
      {/* Link do Strony Głównej */}
      <Button
        component={NavLink}
        to="/"
        variant="outlined"
        color="primary"
        sx={{ mx: 1 }}
      >
        Formularz
      </Button>

      {/* Link do Info */}
      {/* <Button
        component={NavLink}
        to="/info"
        color="inherit"
        sx={{ mx: 1 }}
      >
        Info
      </Button> */}

      {/* Link do Ustawień */}
      <Button
        component={NavLink}
        to="/settings"
        variant="outlined"
        color="secondary"
        sx={{ mx: 1 }}
      >
        Ustawienia
      </Button>
    </Toolbar>
  </AppBar>
);


export default Header;


