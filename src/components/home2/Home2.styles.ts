import type { SxProps, Theme } from "@mui/material";

export const formBoxSx: SxProps<Theme> = {
  maxWidth: 600,
  mx: "auto",
  mt: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
};
export const tachoSectionSx: SxProps<Theme> = {
  border: "1px solid",
  borderColor: "grey.400",
  borderRadius: 2,
  p: 2,
  mt: 2,
  mb: 2,
  position: "relative",
};
export const tachoLabelSx: SxProps<Theme> = {
  position: "absolute",
  top: -18,
  left: 16,
  bgcolor: "background.paper",
  px: 1,
  fontSize: "1rem",
  color: "text.secondary",
  fontWeight: "bold",
};
export const vehicleSectionSx: SxProps<Theme> = {
  border: "1px solid",
  borderColor: "grey.400",
  borderRadius: 2,
  p: 2,
  mt: 2,
  mb: 2,
  position: "relative",
};
export const vehicleLabelSx: SxProps<Theme> = {
  position: "absolute",
  top: -18,
  left: 16,
  bgcolor: "background.paper",
  px: 1,
  fontSize: "1rem",
  color: "text.secondary",
  fontWeight: "bold",
};
