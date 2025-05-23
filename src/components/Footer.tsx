import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Footer: React.FC = () => (
  <Box component="footer" sx={{ p: 2, textAlign: "center", bgcolor: "#f5f5f5" }}>
    <Typography variant="body2" color="textSecondary">
      &copy; {new Date().getFullYear()} TACHO-TECH Bartosz Skierś 05-120 Skrzeszew ul. Nowodworska 1a
    </Typography>
  </Box>
);

export default Footer;
