import type { SxProps, Theme } from "@mui/material";

export const settingsBoxSx: SxProps<Theme> = {
  maxWidth: theme => theme.breakpoints.values.md,
  width: "100%",
  mx: "auto",
  mt: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
  position: "relative",
  p: 2,
  border: "1px solid",
  borderColor: "grey.400",
  borderRadius: 2,
};
export const settingsLabelSx: SxProps<Theme> = {
  position: "absolute",
  top: -18,
  left: 16,
  bgcolor: "background.paper",
  px: 1,
  fontSize: "1rem",
  color: "text.secondary",
  fontWeight: "bold",
};
export const settingsListSx: SxProps<Theme> = {
    width: '100%',
    bgcolor: 'background.paper',
    border: '1px solid',
    borderColor: 'grey.400',
    borderRadius: 2,
};
export const settingsDropdownSx: SxProps<Theme> = {
    border: '1px solid',
    borderColor: 'grey.400',
    borderRadius: 2,
    p: 2,
    mt: 2,
    mb: 2,
    position: 'relative',
};
export const settingsTechniciansSx: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    p: 2,
    border: '1px solid',
    borderColor: 'grey.400',
    borderRadius: 2,
    position: 'relative',
}