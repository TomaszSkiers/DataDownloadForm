import { Controller } from "react-hook-form";
import { Box, TextField, Typography, useMediaQuery,useTheme } from "@mui/material";
import type { Props } from "./interfaceProps.types";
import { personLabelSx, personSectionSx } from "../Home2.styles";


export function PersonSection({ control, errors }: Props) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <Box sx={personSectionSx}>
      <Typography component="span" sx={personLabelSx}>
        {isMobile ? "Właściciel / osoba reprezentująca" : "Imię i nazwisko właściciela / osoby reprezentującej"}
      </Typography>

      {/* Imię */}
      <Controller
        name="fullName"
        control={control}
        rules={{
          required: "To pole jest wymagane",
          maxLength: {
            value: 75,
            message: "Maksymalnie 75 znaków",
          },
        }}
        render={({ field }) => (
          <TextField
            label="Imię i nazwisko"
            {...field}
            error={!!errors.fullName}
            helperText={
              errors.fullName?.message ??
              `${field.value?.length || 0}/75 znaków`
            }
            fullWidth
            inputProps={{ maxLength: 75 }}
          />
        )}
      />
    </Box>
  );
}
