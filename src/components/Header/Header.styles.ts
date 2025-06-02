import type { SxProps, Theme } from "@mui/material/styles";

export const logoText: SxProps<Theme> = {
  flex: 1,
  textAlign: "center",
  fontSize: "1.3rem", 
  fontWeight: 500, 
  color: (theme) => theme.palette.common.white,
  
};


export const toolbarSx: SxProps<Theme> = {
    maxWidth: (theme) => theme.breakpoints.values.md,
    width: "100%",
    margin: "0 auto",
}